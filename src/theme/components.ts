import { Components } from "@mui/material";

const componentOverrides: Components = {
	MuiButtonBase: {
		defaultProps: {
			disableRipple: true,
		}
	},
	MuiButton: {
		defaultProps: {
			disableElevation: true
		},
		styleOverrides: {
			root: {
				borderRadius: '8px',
				textTransform: 'none'
			}
		}
	},
	MuiOutlinedInput: {
		styleOverrides: {
			root: {
				borderRadius: '8px'
			}
		}
	},
	MuiPaper: {
		defaultProps: {
			elevation: 0
		}
	}
}

declare module "@mui/material/Button" {
	interface ButtonPropsColorOverrides {
		secondaryContainer: true
	}
}

export default componentOverrides