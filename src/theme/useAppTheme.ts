import { Theme, createTheme } from "@mui/material"
import typographyOptions from "./typography"
import lightPalette from "./palette.light"
import darkPalette from "./palette.dark"
import { ThemeMode } from "@/types/theme"
import { create } from "zustand"
import componentOverrides from "./components"

declare module '@mui/material/styles' {
	interface Palette {
		onPrimary: Palette['primary']
		primaryContainer: Palette['primary']
		onPrimaryContainer: Palette['primary']
		onSecondary: Palette['primary']
		secondaryContainer: Palette['primary']
		onSecondaryContainer: Palette['primary']
		tertiary: Palette['primary']
		onTertiary: Palette['primary']
		tertiaryContainer: Palette['primary']
		onTertiaryContainer: Palette['primary']
		onBackground: Palette['background']
	}

	interface PaletteOptions {
		onPrimary?: PaletteOptions['primary']
		primaryContainer?: PaletteOptions['primary']
		onPrimaryContainer?: PaletteOptions['primary']
		onSecondary?: PaletteOptions['primary']
		secondaryContainer?: PaletteOptions['primary']
		onSecondaryContainer?: PaletteOptions['primary']
		tertiary?: PaletteOptions['primary']
		onTertiary?: PaletteOptions['primary']
		tertiaryContainer?: PaletteOptions['primary']
		onTertiaryContainer?: PaletteOptions['primary']
		onBackground?: PaletteOptions['background']
	}
} 

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
		palette: get().themeMode === ThemeMode.LIGHT ? lightPalette : darkPalette,
		components: componentOverrides
	}),
	setThemeMode: (t) => {
		set({
			themeMode: t
		})
	}
}))

export default useAppThemeStore