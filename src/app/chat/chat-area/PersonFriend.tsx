import { Friend } from "@/types/user"
import { ChatBubble, PersonRemove } from "@mui/icons-material"
import { Stack, Avatar, Typography, IconButton, Button } from "@mui/material"
import { MouseEventHandler } from "react"

type PersonFriendProps = {
	user: Friend
	onClick?: MouseEventHandler
	onRemove?: MouseEventHandler
}

const PersonFriend = ({user, onClick, onRemove}: PersonFriendProps) => {
	return (
		<Stack direction='row' gap='12px' borderBottom='1px solid' borderColor='divider' padding='8px 0'>
			<Avatar src={user.friend.avatar || 'broken'} alt={user.friend.name} />
			<Stack flexGrow={1}>
				<Typography>{user.friend.name}</Typography>
				<Typography variant='caption'>{'@'+user.friend.username}</Typography>
			</Stack>
			{
				user.status === 'CONFIRMED' 
				? (
					<Stack direction='row' gap='12px' alignItems='center'>
						<IconButton size="small" onClick={onClick}><ChatBubble fontSize="inherit" /></IconButton>
						<IconButton color='error' size="small" onClick={onRemove}><PersonRemove fontSize="inherit" /></IconButton>
					</Stack>
				)
				: (
					<Stack>
						<Button onClick={onRemove}>Pending</Button>
					</Stack>
				)
			}
		</Stack>
	)
}

export default PersonFriend