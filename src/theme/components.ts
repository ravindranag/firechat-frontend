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
		},
		styleOverrides: {
			root: {
				backgroundImage: 'none'
			}
		}
	}
}

declare module "@mui/material/Button" {
	interface ButtonPropsColorOverrides {
		secondaryContainer: true
	}
}

declare module "@mui/material/CircularProgress" {
	interface CircularProgressPropsColorOverrides {
		onPrimary: true
	}
}

declare module "@mui/material/SvgIcon" {
	interface SvgIconPropsColorOverrides {
		onTertiaryContainer: true
		onSecondaryContainer: true
	}
}

export default componentOverrides