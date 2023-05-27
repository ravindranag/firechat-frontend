import useAppStore from "@/stores/useAppStore"
import { Avatar, Button, Stack, Typography } from "@mui/material"

const UserProfile = () => {
	const [setShowProfileDashboard] = useAppStore(state => [state.setShowProfileDashboard])

	return (
		<Stack padding='32px 16px'>
			<Button sx={{padding: '16px'}} onClick={() => setShowProfileDashboard(true)}>
				<Stack direction='row' gap='12px' alignItems='center' width='100%'>
					<Avatar src="broken" alt='Ravindra' sx={{ bgcolor: 'primary.main' }} />
					<Typography>Your Profile</Typography>
				</Stack>
			</Button>
		</Stack>
	)
}

export default UserProfile