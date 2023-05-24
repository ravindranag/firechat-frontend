import { PaletteOptions } from "@mui/material"
import { grey } from "@mui/material/colors"
// import grey from "@mui/material/colors/grey"

const lightPalette: PaletteOptions = {
	mode: 'light',
	primary: {
		main: grey[900]
	},
	background: {
		default: grey[50],
		paper: grey[300]
	},
	text: {
		primary: grey[900],
		secondary: grey[700],
		disabled: grey[500]
	}
}

export default lightPalette