import { Avatar, Button, Stack, Typography } from "@mui/material"

const UserProfile = () => {
	return (
		<Stack padding='32px 16px'>
			<Button sx={{padding: '0 16px'}}>
				<Stack direction='row' gap='12px' alignItems='center' width='100%'>
					<Avatar src="broken" alt='Ravindra' sx={{ bgcolor: 'primary.main' }} />
					<Typography>Your Profile</Typography>
				</Stack>
			</Button>
		</Stack>
	)
}

export default UserProfile