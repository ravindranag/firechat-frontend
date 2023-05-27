import useRoomStore from "@/stores/useRoomStore"
import { Box, Stack } from "@mui/material"
import { useEffect, useRef } from "react"
import RoomMessage from "./RoomMessage"

export type RoomMessageProps = {
	isSent: boolean
}

const RoomChatScrollView = () => {
	const scrollViewRef = useRef<HTMLDivElement>(null)
	const [chats, fetchRecentChats] = useRoomStore(state => [state.chats, state.fetchRecentChats])

	useEffect(() => {
		console.log('fetch recent chats')
		fetchRecentChats()
		// if(scrollViewRef.current === null) return 
		// const ubSub = useRoomStore.subscribe(state => state.chats, () => {
		// 	console.log('chats changed')
		// })

		// console.log(`Height: ${scrollViewRef.current?.offsetHeight}`)
		// console.log(scrollViewRef.current?.getBoundingClientRect())
		// scrollViewRef.current?.addEventListener('scroll', () => {
		// 	console.log(`Current scroll position: ${scrollViewRef.current?.scrollTop}`)
		// })
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
			ref={scrollViewRef}
		>
			{
				chats.map(c => (
					<RoomMessage isSent={true}/>
				))
			}
			<Box 
				sx={{
					height: '1px',
					overflowAnchor: 'auto'
				}}
			/>
		</Stack>
	)
}

export default RoomChatScrollView