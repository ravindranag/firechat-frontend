import { User } from "@/types/user"
import { Check, Close } from "@mui/icons-material"
import { Avatar, Button, IconButton, Stack, Typography } from "@mui/material"
import { MouseEventHandler } from "react"

type PersonActionPropsVariant = 'search' | 'request'

type PersonActionProps = {
	variant: PersonActionPropsVariant
	onClick?: MouseEventHandler
	onClose?: MouseEventHandler
	user: User
}

const PersonAction = ({variant, onClick, onClose, user}: PersonActionProps) => {
	return (
		<Stack direction='row' gap='12px' alignItems='center' borderBottom='1px solid' borderColor='divider' paddingY='16px'>
			<Avatar src='broken' alt={user.name}/>
			<Stack flexGrow={1}>
				<Typography>{user.name}</Typography>
				<Typography variant='caption'>{'@'+user.username}</Typography>
			</Stack>
			{
				variant === 'search'
				? (
					<Button onClick={onClick}>Add Friend</Button>
				)
				: (
					<Stack direction='row' gap='8px'>
						<IconButton color="error" onClick={onClose}><Close /></IconButton>
						<IconButton color='primary' onClick={onClick}><Check /></IconButton>
					</Stack>
				)
			}
		</Stack>
	)
}

export default PersonAction