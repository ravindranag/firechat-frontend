import { PaletteOptions } from "@mui/material";
import { grey } from "@mui/material/colors";

const darkPalette: PaletteOptions = {
	mode: 'dark',
	primary: {
		main: grey[50]
	},
	background: {
		default: grey[900],
		paper: grey[900]
	},
	text: {
		primary: grey[50],
		secondary: grey[200],
		disabled: grey[500]
	}
}

export default darkPalette