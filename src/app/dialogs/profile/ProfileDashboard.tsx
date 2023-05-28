import useAppStore from "@/stores/useAppStore"
import useSessionStore from "@/stores/useSessionStore"
import { Close } from "@mui/icons-material"
import { Avatar, Button, Dialog, IconButton, Stack, TextField, Theme, Typography, useMediaQuery } from "@mui/material"

const ProfileDashboard = () => {
	const [showProfileDashboard, setShowProfileDashboard] = useAppStore(state => [state.showProfileDashboard, state.setShowProfileDashboard])
	const [decoded] = useSessionStore(state => [state.decoded])

	const handleClose = () => setShowProfileDashboard(false)
	const isMobileDevice = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	if(decoded === null) return <></>

	return (
		<Dialog
			open={showProfileDashboard}
			onClose={handleClose}
			keepMounted={true}
			PaperProps={{
				sx: {
					width: '100%',
					maxWidth: isMobileDevice ? '100%' : 600,
					margin: 0,
					borderRadius: isMobileDevice ? 0 : '16px',
					bgcolor: 'background.default',
					height: isMobileDevice ? '100%' : 'calc(100vh - 32px)',
				}
			}}
			fullScreen={isMobileDevice}
			sx={{
				'& .MuiDialog-container': {
					backdropFilter: 'blur(2px)'
				}
			}}
		>
			<Stack height='100%'>
				<Stack direction='row' justifyContent='end' padding='16px'>
					<IconButton onClick={() => setShowProfileDashboard(false)}>
						<Close />
					</IconButton>
				</Stack>
				<Stack direction='row'>
					<Stack gap='12px' flexGrow={1} padding={{xs: '16px', md: '32px'}}>
						<Avatar src={decoded.avatar || 'broken'} alt={decoded.name} sx={{bgcolor: 'primary.main', width: '100px', height: '100px'}} />
						<Stack>
							<Typography variant="body1">{decoded.name}</Typography>
							<Typography variant='caption'>{'@' + decoded.username}</Typography>
						</Stack>
					</Stack>
				</Stack>
				<Stack sx={{ height: '100%', overflowY: 'auto', padding: {xs: '16px', md: '16px 32px'} }} gap='16px'>
					<TextField 
						label='Avatar URL'
						helperText={
							<Typography variant="caption">
								Provide a publicly accessible link to your profile picture. Ex: Your GitHub avatar URL or a image hosted on imgur
							</Typography>
						}
					/>
					<Stack direction='row' gap='16px' justifyContent='end'>
						{/* <Button onClick={handleClose}>Cancel</Button> */}
						<Button variant='contained'>Save</Button>
					</Stack>
				</Stack>
				<Stack padding={{xs: '16px', md: '32px'}} alignItems='center'>
					<Typography variant="caption">FireChat v1.0.0</Typography>
					<Typography variant="caption">Made with 💖 by <a href="https://ravindranag.in" target="_blank">Ravindra Nag</a></Typography>
				</Stack>
			</Stack>
		</Dialog>
	)
}

export default ProfileDashboard