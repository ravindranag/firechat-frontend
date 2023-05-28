import useRoomStore from "@/stores/useRoomStore"
import { Send } from "@mui/icons-material"
import { Box, IconButton, Stack } from "@mui/material"
import { useEffect, useRef } from "react"


declare module '@mui/material/IconButton' {
	interface IconButtonPropsColorOverrides {
		onPrimary: true
	}
}

const RoomAction = () => {
	const messageRef = useRef<HTMLDivElement>(null)
	const [sendChatToRoom] = useRoomStore(state => [state.sendChatToRoom])

	useEffect(() => {
		messageRef.current?.focus()
	}, [])

	const handleSend = () => {
		if(messageRef.current) {
			const message = messageRef.current.textContent!.toString()
			if(message.length > 0) {
				sendChatToRoom(message)
				messageRef.current.textContent = ''
				messageRef.current.focus()
			}
		}
	}

	return (
		<Stack direction='row' gap='12px' alignItems='end'>
			<Box 
				ref={messageRef}
				contentEditable={true}
				placeholder='Message'
				sx={{
					position: 'relative',
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
					color: 'onPrimaryContainer.main',
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