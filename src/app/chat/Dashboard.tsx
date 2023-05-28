import { Stack } from "@mui/material"
import ChatArea from "./chat-area/ChatArea"
import Sidebar from "./sidebar/Sidebar"
import { useEffect } from "react"
import roomSocket from "@/socket/room"
import ProfileDashboard from "../dialogs/profile/ProfileDashboard"
import useAppStore from "@/stores/useAppStore"
import useSocketStore from "@/stores/useSocketStore"
import useSessionStore from "@/stores/useSessionStore"

const Dashboard = () => {
	const [fetchDataForDashboard] = useAppStore(state => [state.fetchDataForDashboard])
	const [decoded] = useSessionStore(state => [state.decoded])
	const [connectToRoomSocket, disconnectRoomSocket] = useSocketStore(state => [state.connectToRoomSocket, state.disconnectRoomSocket])

	useEffect(() => {
		connectToRoomSocket(decoded!.userId)
		fetchDataForDashboard()

		return () => {
			disconnectRoomSocket()
		}
	}, [])

	return (
		<Stack width='100%' height='100%' direction='row'>
			<Sidebar />
			<ChatArea />
			<ProfileDashboard />
		</Stack>
	)
}

export default Dashboard