import useAppStore from "@/stores/useAppStore"
import { Close } from "@mui/icons-material"
import { Dialog, IconButton, Stack, Theme, Typography, useMediaQuery } from "@mui/material"
import PersonAction from "./PersonAction"
import baseAPI from "@/api/base"

const FriendRequestInbox = () => {
	const [
		showFriendRequestInbox, 
		setShowFriendRequestInbox, 
		friendRequests,
		removeFriendRequestFromList,
		fetchDataForDashboard
	] = useAppStore(state => [
		state.showFriendRequestInbox, 
		state.setShowFriendRequestInbox, 
		state.friendRequests,
		state.removeFriendRequestFromList,
		state.fetchDataForDashboard
	])

	const handleClose = () => setShowFriendRequestInbox(false)

	return (
		<Dialog
			open={showFriendRequestInbox}
			onClose={handleClose}
			keepMounted={true}
			PaperProps={{
				sx: (theme) => ({
					width: '100%',
					maxWidth: useMediaQuery(theme.breakpoints.down('md')) ? '100%' : 600,
					margin: 0,
					borderRadius: useMediaQuery(theme.breakpoints.down('md')) ? 0 : '16px',
					bgcolor: 'background.default',
					height: useMediaQuery(theme.breakpoints.down('md')) ? '100%' : 'calc(100vh - 32px)',
				})
			}}
			fullScreen={useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))}
			sx={{
				'& .MuiDialog-container': {
					backdropFilter: 'blur(2px)'
				}
			}}
		>
			<Stack height='100%'>
				<Stack direction='row' padding='16px' alignItems='center'>
					<Typography flexGrow={1}>Friend Requests</Typography>
					<IconButton onClick={handleClose}>
						<Close />
					</IconButton>
				</Stack>
				<Stack height='100%' sx={{overflowY: 'auto'}} padding={{xs: '0 16px', md: '16px 32px'}}>
					{
						friendRequests.map((fr, idx) => (
							<PersonAction 
								key={`fr-${fr.userId}`}
								variant="request"
								user={fr.user}
								onClick={async () => {
									try {
										await baseAPI.friend.acceptFriendRequest(fr.userId, fr.friendId)
										removeFriendRequestFromList(idx)
										fetchDataForDashboard()
									}
									catch(err: any) {
										console.log(err.response.data)
									}
								}}
								onClose={async () => {
									try {
										await baseAPI.friend.deleteFriendRequest(fr.userId, fr.friendId)
										removeFriendRequestFromList(idx)
										fetchDataForDashboard()
									}
									catch(err: any) {
										console.log(err.response.data)
									}
								}}
							/>
						))
					}
				</Stack>
			</Stack>
		</Dialog>
	)
}

export default FriendRequestInbox