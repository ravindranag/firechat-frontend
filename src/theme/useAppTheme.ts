import { Theme, createTheme } from "@mui/material"
import typographyOptions from "./typography"
import lightPalette from "./palette.light"
import darkPalette from "./palette.dark"
import { ThemeMode } from "@/types/theme"
import { create } from "zustand"

interface AppThemeStore {
	getAppTheme: () => Theme,
	themeMode: ThemeMode,
	toggleThemeMode: () => void
	setThemeMode: (t: ThemeMode) => void
}

const useAppThemeStore = create<AppThemeStore>((set, get) => ({
	themeMode: ThemeMode.LIGHT,
	toggleThemeMode: () => {
		set({
			themeMode: get().themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT
		})
		localStorage.setItem('themeMode', get().themeMode.toString())
	},
	getAppTheme: () => createTheme({
		typography: typographyOptions(get().themeMode),	
		palette: get().themeMode === ThemeMode.LIGHT ? lightPalette : darkPalette
	}),
	setThemeMode: (t) => {
		set({
			themeMode: t
		})
	}
}))

export default useAppThemeStore