import useRoomStore from "@/stores/useRoomStore"
import useSessionStore from "@/stores/useSessionStore"
import { ChatStatus } from "@/types/chat"
import { Send } from "@mui/icons-material"
import { Box, IconButton, Stack } from "@mui/material"
import { useRef } from "react"


declare module '@mui/material/IconButton' {
	interface IconButtonPropsColorOverrides {
		onPrimary: true
	}
}

const RoomAction = () => {
	const messsageRef = useRef<HTMLDivElement>(null)
	const [sendChatToRoom] = useRoomStore(state => [state.sendChatToRoom])
	const [decoded] = useSessionStore(state => [state.decoded])

	const handleSend = () => {
		const message = messsageRef.current?.textContent
		if(!message) return 
		console.log(message)
		sendChatToRoom({
			content: message,
			receiverId: 'rv-2',
			senderId: decoded!.userId,
			status: ChatStatus.PENDING
		})
	}

	return (
		<Stack direction='row' gap='12px' alignItems='end'>
			<Box 
				ref={messsageRef}
				contentEditable={true}
				sx={{
					width: '100%',
					padding: '14px 16px',
					border: '1px solid',
					borderColor: 'primaryContainer.main',
					borderRadius: '24px',
					maxHeight: 150,
					overflowY: 'auto',
					'&:focus': {
						outline: 'none'
					},
					bgcolor: 'primaryContainer.main',
					color: 'onPrimaryContainer.main'
				}}
			/>
			<IconButton
				sx={{
					backgroundColor: 'primary.main',
					color: 'onPrimary.main',
					'&:hover': {
						backgroundColor: 'primary.main',
						color: 'onPrimary.main',
					},
					padding: '12px'
				}}
				onClick={handleSend}
			>
				<Send fontSize="medium"/>
			</IconButton>

		</Stack>
	)
}

export default RoomAction