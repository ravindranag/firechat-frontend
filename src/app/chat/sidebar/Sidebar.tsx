import IconWrapper from "@/components/icons/IconWrapper"
import { DarkMode, Fireplace, Group, LightMode } from "@mui/icons-material"
import { Drawer, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import UserProfile from "./UserProfile"
import ChatList from "./ChatList"
import useAppThemeStore from "@/theme/useAppTheme"
import { ThemeMode } from "@/types/theme"
import useRoomStore from "@/stores/useRoomStore"
import useAppStore from "@/stores/useAppStore"

const DRAWER_WIDTH = 300

const Sidebar = () => {
	const [themeMode, toggleThemeMode, ] = useAppThemeStore(state => [state.themeMode, state.toggleThemeMode])
	const theme = useTheme()
	const isMobileDevice = useMediaQuery(theme.breakpoints.down('md'))
	const [room] = useRoomStore(state => [state.room])
	const [showFriendManagerMobile, setShowFriendManagerMobile] = useAppStore(state => [state.showFriendManagerMobile, state.setShowFriendManagerMobile])

	return (
		<Drawer
			open={isMobileDevice 
				? room === null 
					? showFriendManagerMobile ? false : true 
					: false 
				: true}
			variant={isMobileDevice ? 'temporary' : 'persistent'}
			sx={{
				width: isMobileDevice ? '100%' : DRAWER_WIDTH,
				'& .MuiPaper-root': {
					width: isMobileDevice ? '100%' : DRAWER_WIDTH,
					border: 'none',
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
					{isMobileDevice && (
						<IconButton onClick={() => setShowFriendManagerMobile(true)}>
							<Group />
						</IconButton>
					)}
				</Stack>
				<ChatList />
				<UserProfile />
			</Stack>
		</Drawer>
	)
}

export default Sidebar