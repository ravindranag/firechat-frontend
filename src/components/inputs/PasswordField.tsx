import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton, TextField, TextFieldProps } from "@mui/material"
import { useState } from "react"

const PasswordField = ({
	name,
	label,
	value,
	onChange,
	onBlur,
	error,
	helperText
}: TextFieldProps) => {
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const toggleShowPassword = () => {
		setShowPassword(v => !v) 
	}

	return (
		<TextField 
			type={showPassword ? 'text' : 'password'}
			name={name}
			label={label}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			error={error}
			helperText={helperText}
			InputProps={{
				endAdornment: (
					<IconButton onClick={() => toggleShowPassword()}>
						{showPassword ? <VisibilityOff /> : <Visibility />}
					</IconButton>
				)
			}}
		/>
	)
}

export default PasswordField