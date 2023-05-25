import PasswordField from "@/components/inputs/PasswordField"
import { Stack, Typography, TextField, Button, CircularProgress, Alert } from "@mui/material"
import baseAPI from "@/api/base"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { AuthFormProps } from "./AuthScreen"
import { useState } from "react"


const validationSchema = Yup.object({
	name: Yup.string().required(),
	email: Yup.string().email().required(),
	password: Yup.string().required().min(6)
})

const SignUpForm = ({toggleAuthType}: AuthFormProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: ''
		},
		onSubmit: async (values) => {
			setIsLoading(true)
			try {
				await baseAPI.user.signup(values)
				toggleAuthType()
			}
			catch(err: any) {
				console.log('User creation failed', err.response.data)
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
			<Typography>Welcome to Chat</Typography>
			<Stack gap='16px'>
				<TextField 
					name='name'
					label='Name'
					value={formik.values.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={(formik.touched.name && formik.errors.name) ? true : false}
					helperText={formik.errors.name}
				/>
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
					ALready have an account? Login
				</Button>
				<Button variant='contained' onClick={() => formik.handleSubmit()} disabled={isLoading}>
					{isLoading ? <CircularProgress color='inherit' size={24} /> : 'Sign up'}
				</Button>
			</Stack>
		</Stack>
	)
}

export default SignUpForm