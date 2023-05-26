import IconWrapper from "@/components/icons/IconWrapper"
import { DarkMode, Fireplace, LightMode } from "@mui/icons-material"
import { Drawer, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useEffect } from "react"
import UserProfile from "./UserProfile"
import ChatList from "./ChatList"
import useAppThemeStore from "@/theme/useAppTheme"
import { ThemeMode } from "@/types/theme"
import useRoomStore from "@/stores/useRoomStore"

const DRAWER_WIDTH = 300

const Sidebar = () => {
	const [themeMode, toggleThemeMode] = useAppThemeStore(state => [state.themeMode, state.toggleThemeMode])
	const theme = useTheme()
	const isMobileDevice = useMediaQuery(theme.breakpoints.down('md'))
	const [room] = useRoomStore(state => [state.room])

	useEffect(() => {
		// fetch room list
		console.log('isMobileDevice', isMobileDevice)
	}, [isMobileDevice])

	return (
		<Drawer
			open={isMobileDevice ? room === null ? true : false : true}
			variant={isMobileDevice ? 'temporary' : 'persistent'}
			sx={{
				width: isMobileDevice ? '100%' : DRAWER_WIDTH,
				'& .MuiPaper-root': {
					width: isMobileDevice ? '100%' : DRAWER_WIDTH,
					border: 'none',
					bgcolor: isMobileDevice ? 'background.default' : 'transparent'
				},
			}}
		>
			<Stack height='100%'>
				<Stack direction='row' gap='8px' padding='32px' alignItems='center'>
					<Stack direction='row' gap='8px' flexGrow={1}>
						<IconWrapper><Fireplace /></IconWrapper>
						<Typography>Chat</Typography>
					</Stack>
					<IconButton onClick={() => toggleThemeMode()}>
						{ themeMode === ThemeMode.LIGHT ? <DarkMode /> : <LightMode /> }
					</IconButton>
				</Stack>
				<ChatList />
				<UserProfile />
			</Stack>
		</Drawer>
	)
}

export default Sidebar