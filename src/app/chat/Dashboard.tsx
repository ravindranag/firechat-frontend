import { Stack } from "@mui/material"
import ChatArea from "./chat-area/ChatArea"
import Sidebar from "./sidebar/Sidebar"
import { useEffect } from "react"
import roomSocket from "@/socket/room"
import ProfileDashboard from "../dialogs/profile/ProfileDashboard"
import useAppStore from "@/stores/useAppStore"

const Dashboard = () => {
	const [fetchDataForDashboard] = useAppStore(state => [state.fetchDataForDashboard])

	useEffect(() => {
		roomSocket.connect()
		fetchDataForDashboard()
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