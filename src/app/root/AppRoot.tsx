import useSessionStore from "@/stores/useSessionStore"
import { CircularProgress, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import AuthScreen from "./components/AuthScreen"
import Dashboard from "../chat/Dashboard"
import baseAPI from "@/api/base"
import ConfirmationDialog from "../dialogs/common/ConfirmationDialog"

const AppLoading = () => {
	return (
		<Stack width='100%' height='100%' justifyContent='center' alignItems='center'>
			<Typography>
				<CircularProgress color='inherit' />
			</Typography>
		</Stack>
	)
}

const AppRoot = () => {
	const [decoded, setDecoded] = useSessionStore(state => [state.decoded, state.setDecoded])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if(!token) {
			setLoading(false)
			return 
		} 
		(async () => {
			setLoading(true)
			try {
				const data = (await baseAPI.user.verify()).data
				setDecoded(data)
			}
			catch(err) {
				console.log('Invalid token')
			}
			finally {
				setLoading(false)
			}
		})()
	}, [])

	return (
		<Stack
			width='100vw'
			height='100vh'
			bgcolor='background.default'
		>
			{ loading 
			? <AppLoading /> 
			: decoded === null 
				? <AuthScreen />
				: <Dashboard />
			}
			<ConfirmationDialog />
		</Stack>
	)
}

export default AppRoot