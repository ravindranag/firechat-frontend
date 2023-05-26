import { TypographyOptions } from "@mui/material/styles/createTypography"
import '@fontsource-variable/rubik'
import { ThemeMode } from "@/types/theme"
import darkPalette from "./palette.dark"
import lightPalette from "./palette.light"


const typographyOptions = (mode: ThemeMode): TypographyOptions => ({
	fontFamily: ['Rubik', 'sans-serif'].join(','),
	allVariants: {
		color: mode === ThemeMode.DARK ? darkPalette.onBackground?.default : lightPalette.onBackground?.default
	}
})

export default typographyOptions