import useAppThemeStore from "@/theme/useAppTheme"
import { AddCircle, DarkMode, Fireplace } from "@mui/icons-material"
import { Button, Card, IconButton, Stack, Typography } from "@mui/material"
import { useEffect } from "react"

const AppRoot = () => {
	const [toggleThemeMode] = useAppThemeStore(state => [state.toggleThemeMode])

	useEffect(() => {
		const token = localStorage.getItem('token')
		if(!token) return 
		console.log('Auth token present')
	}, [])

	return (
		<Stack
			width='100vw'
			minHeight='100vh'
			bgcolor='background.default'
			padding='32px'
		>
			<Stack direction='row' gap='16px'>
				
				<Fireplace />
				<AddCircle />
				<Typography>
					Chat
				</Typography>
				<IconButton
					onClick={() => toggleThemeMode()}
				>
					<DarkMode />
				</IconButton>
			</Stack>
			<Stack gap='12px'>
				<Typography variant="h1">Chat</Typography>
				<Typography variant="h2">Chat</Typography>
				<Typography variant="h3">Chat</Typography>
				<Typography variant="h4">Chat</Typography>
				<Typography variant="h5">Chat</Typography>
				<Typography variant="h6">Chat</Typography>
				<Typography variant="body1">Body 1</Typography>
				<Typography variant="body2">Body 2</Typography>
				<Typography variant="subtitle1">Subtitle 1</Typography>
				<Typography variant="subtitle2">Subtitle 2</Typography>
				<Typography variant="button">Button</Typography>
				<Typography variant="caption">Caption</Typography>
				<Typography variant="overline">Overline</Typography>
			</Stack>
			<Card
				sx={{
					padding: '32px',
					borderRadius: '8px',
					width: 'fit-content'
				}}
			>
				haha
			</Card>
			<Button variant='contained'>
				Chat
			</Button>
		</Stack>
	)
}

export default AppRoot