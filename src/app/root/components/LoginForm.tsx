import PasswordField from "@/components/inputs/PasswordField"
import useSessionStore from "@/stores/useSessionStore"
import { Alert, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material"
import baseAPI from "@/api/base"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { AuthFormProps } from "./AuthScreen"
import { useState } from "react"

const validationSchema = Yup.object({
	email: Yup.string().email().required(),
	password: Yup.string().required().min(6)
})

const LoginForm = ({toggleAuthType}: AuthFormProps) => {
	const [setDecoded] = useSessionStore(state => [state.setDecoded])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: async (values) => {
			setIsLoading(true)
			try {
				const token = (await baseAPI.user.login(values)).data
				await localStorage.setItem('token', token)
				const decoded = (await baseAPI.user.verify()).data
				console.log(decoded)
				setDecoded(decoded)
			}
			catch(err: any) {
				console.log(err.response.data)
				setError(err.response.data)
			}
			finally {
				setIsLoading(false)
			}
		},
		validationSchema: validationSchema
	})

	return (
		<Stack padding='32px 16px' gap='32px'>
			<Typography>Login to continue</Typography>
			<Stack gap='16px'>
				<TextField 
					name='email'
					label='Email'
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={(formik.touched.email && formik.errors.email) ? true : false}
					helperText={formik.errors.email}
				/>
				<PasswordField 
					name='password'
					label='Password'
					value={formik.values.password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={(formik.touched.password && formik.errors.password) ? true : false}
					helperText={formik.errors.password}
				/>
				{ error && (
					<Alert severity="error">{error}</Alert>
				) }
			</Stack>
			<Stack gap='8px'>
				<Button onClick={() => toggleAuthType()}>
					Create an Account
				</Button>
				<Button variant='contained' onClick={() => formik.handleSubmit()} disabled={isLoading}>
					{isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}	
				</Button>
			</Stack>
		</Stack>
	)
}

export default LoginForm