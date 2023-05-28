import useRoomStore from "@/stores/useRoomStore"
import { Box, IconButton, Stack } from "@mui/material"
import { useEffect, useRef } from "react"
import RoomMessage from "./RoomMessage"
import useRoomScrollableViewStore from "@/stores/useRoomScrollableViewStore"
import { ArrowDownward } from "@mui/icons-material"

const SHOULD_SCROLL_ON_NEW_MESSAGE_THRESHOLD = 300

const RoomChatScrollView = () => {
	const scrollViewRef = useRef<HTMLDivElement>(null)
	const chatBottomRef = useRef<HTMLDivElement>(null)
	const [
		chats, 
		fetchRecentChats, 
		senderId
	] = useRoomStore(state => [
		state.chats, 
		state.fetchRecentChats, 
		state.senderId
	])
	const [
		setScrollableViewRef, 
		scrollToLastChat,
		setShouldScrollOnNewMessage,
		shouldScrollOnNewMessage
	] = useRoomScrollableViewStore(state => [
		state.setScrollableViewRef, 
		state.scrollToLastChat,
		state.setShouldScrollOnNewMessage,
		state.shouldScrollOnNewMessage
	])

	const cb: MutationCallback = () => {
		// console.log(mutationList)
		scrollToLastChat()
	}

	useEffect(() => {
		setScrollableViewRef(scrollViewRef)
		fetchRecentChats()

		const observer = new MutationObserver(cb)
		observer.observe(scrollViewRef.current!, {
			childList: true
		})

		scrollViewRef.current?.addEventListener('scroll', () => {
			const container = scrollViewRef.current
			if(container) {
				const SCROLL_POSITION_FROM_BOTTOM = container.scrollHeight - container.scrollTop - container.getBoundingClientRect().height
				if(SCROLL_POSITION_FROM_BOTTOM > SHOULD_SCROLL_ON_NEW_MESSAGE_THRESHOLD) {
					setShouldScrollOnNewMessage(false)
				}
				else {
					setShouldScrollOnNewMessage(true)
				}
			}
		})

	}, [])

	return (
		<Stack 
			height='100%' 
			sx={{
				overflowY: 'auto',
				'&> *': {
					overflowAnchor: 'none'
				}
			}} 
			padding='16px' 
			gap='16px' 
			bgcolor='background.paper' 
			borderRadius='16px' 
			position='relative'
			ref={scrollViewRef}
		>
			{
				chats.map((c, idx) => (
					<RoomMessage key={`chat-${idx}`} isSent={c.senderId === senderId} chat={c}/>
				))
			}
			<Box 
				ref={chatBottomRef}
				sx={{
					height: '1px',
					overflowAnchor: 'auto'
				}}
			/>
			{!shouldScrollOnNewMessage && <IconButton
				sx={{
					position: 'fixed',
					right: 26,
					bottom: 110,
					zIndex: 1000,
					bgcolor: 'secondaryContainer.main',
					'&:hover': {
						bgcolor: 'secondaryContainer.main'
					}
				}}
				size="small"
				onClick={() => scrollToLastChat(true)}
			>
				<ArrowDownward fontSize="small" />
			</IconButton>}
		</Stack>
	)
}

export default RoomChatScrollView