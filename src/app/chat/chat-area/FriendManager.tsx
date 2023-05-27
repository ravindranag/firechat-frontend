import baseAPI from "@/api/base";
import FriendRequestInbox from "@/app/dialogs/friend/FriendRequestInbox";
import SearchAddFriend from "@/app/dialogs/friend/SearchAddFriend";
import useAppStore from "@/stores/useAppStore";
import useConfirmationStore from "@/stores/useConfirmationStore";
import useRoomStore from "@/stores/useRoomStore";
import useSessionStore from "@/stores/useSessionStore";
import { ArrowBack, Inbox, PersonAddAlt1, Replay } from "@mui/icons-material";
import { Badge, IconButton, Stack, Theme, Tooltip, Typography, useMediaQuery } from "@mui/material";
import PersonFriend from "./PersonFriend";

const FriendManagerHeader = () => {
	const [
		setShowSearchDialog, 
		setShowFriendManagerMobile, 
		setShowFriendRequestInbox,
		friendRequests,
		fetchDataForDashboard
	] = useAppStore(state => [
		state.setShowSearchDialog, 
		state.setShowFriendManagerMobile, 
		state.setShowFriendRequestInbox,
		state.friendRequests,
		state.fetchDataForDashboard
	])
	const isMobileDevice = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	return (
		<Stack direction='row' alignItems='center' gap='8px'>
			{ isMobileDevice && (
				<IconButton onClick={() => setShowFriendManagerMobile(false)}>
					<ArrowBack />
				</IconButton>
			) }
			<Typography flexGrow={1}>Your Friends</Typography>
			<Tooltip title='Refresh'>
				<IconButton onClick={() => fetchDataForDashboard()}>
					<Replay />
				</IconButton>
			</Tooltip>
			<Tooltip title='Add friend'>
				<IconButton onClick={() => setShowSearchDialog(true)}>
					<PersonAddAlt1 />
				</IconButton>
			</Tooltip>
			<Tooltip title='Friend Requests'>
					<IconButton onClick={() => setShowFriendRequestInbox(true)}>
						<Badge badgeContent={friendRequests.length} color='primary'>
							<Inbox />
						</Badge>
					</IconButton>
			</Tooltip>
			<SearchAddFriend />
			<FriendRequestInbox />
		</Stack>
	)
}



const FriendListView = () => {
	const [
		friends, 
		getRoomByFriendId, 
		removeFriendFromList,
		removeFriendFromListOffline
	] = useAppStore(state => [
		state.friends, 
		state.getRoomByFriendId, 
		state.removeFriendFromList,
		state.removeFriendFromListOffline
	])
	const [setRoom] = useRoomStore(state => [state.setRoom])
	const [decoded] = useSessionStore(state => [state.decoded])
	const [showConfirmationDialog] = useConfirmationStore(state => [state.showConfirmationDialog])

	return (
		<Stack height='100%' sx={{overflowY: 'auto'}} padding='16px 0'>
			{
				friends.map((f, idx) => (
					<PersonFriend 
						user={f} 
						key={`friend-${f.friendId}`} 
						onClick={() => {
							const room = getRoomByFriendId(f.friendId)
							setRoom(room)
							console.log('Go to room', room)
						}}
						onRemove={() => {
							if(f.status === 'CONFIRMED') {
								showConfirmationDialog(
									(
										<Stack gap='10px'>
											<Typography>Remove {f.friend.name}?</Typography>
											<Typography variant='caption'>{'You\'ll be able to add them back later'}</Typography>
										</Stack>
									),
									() => removeFriendFromList(decoded!.userId, f.friendId)
								)	
							}
							else if(f.status === 'PENDING') {
								showConfirmationDialog(
									(
										<Stack gap='10px'>
											<Typography>Retract request for {f.friend.name}?</Typography>
											<Typography variant='caption'>{'You\'ll be able to add them back later'}</Typography>
										</Stack>
									),
									async () => {
										try {
											await baseAPI.friend.deleteFriendRequest(decoded!.userId, f.friendId)
											removeFriendFromListOffline(idx)
										}
										catch(err: any) {
											console.log('Failed to remove friend request', err)
										}
									}
								)	
							}
						}}
					/>
				))
			}
		</Stack>
	)
}


const FriendManager = () => {

	return (
		<Stack width='100%' height='100%' bgcolor='background.paper' borderRadius='16px'>
			<FriendManagerHeader />
			<FriendListView />
		</Stack>
	);
};

export default FriendManager
