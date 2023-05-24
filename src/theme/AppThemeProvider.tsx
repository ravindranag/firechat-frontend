import { PropsWithChildren, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import useAppThemeStore from "./useAppTheme";


const AppThemeProvider = ({children}: PropsWithChildren) => {
const [getAppTheme, themeMode, setThemeMode] = useAppThemeStore(state => [state.getAppTheme, state.themeMode, state.setThemeMode])

	useEffect(() => {
		const localThemeMode = localStorage.getItem('themeMode')
		if(!localThemeMode) {
			localStorage.setItem('themeMode', themeMode.toString())
		}
		else {
			setThemeMode(parseInt(localThemeMode))
		}
	}, [])

	return (
		<ThemeProvider theme={getAppTheme()}>
			{children}
		</ThemeProvider>
	)
}

export default AppThemeProvider