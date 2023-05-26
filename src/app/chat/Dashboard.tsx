import { Stack } from "@mui/material"
import ChatArea from "./chat-area/ChatArea"
import Sidebar from "./sidebar/Sidebar"
import { useEffect } from "react"
import roomSocket from "@/socket/room"

const Dashboard = () => {
	useEffect(() => {
		roomSocket.connect()
	}, [])

	return (
		<Stack width='100%' height='100%' direction='row'>
			<Sidebar />
			<ChatArea />
		</Stack>
	)
}

export default Dashboard