import { Fireplace } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import IconWrapper from '@/components/icons/IconWrapper'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import { useState } from 'react'

enum AuthType {
	LOGIN,
	SIGNUP
}

export type AuthFormProps = {
	toggleAuthType: () => void
}

const AuthHeader = () => {
	return (
		<Stack direction='row' gap='8px' padding={{xs: '32px 16px', sm: '32px'}}>
			<IconWrapper>
				<Fireplace />
			</IconWrapper>
			<Typography>Chat</Typography>
		</Stack>
	)
}

const AuthScreen = () => {
	const [type, setType] = useState<AuthType>(AuthType.LOGIN)

	const toggleAuthType = () => setType(v => v === AuthType.LOGIN ? AuthType.SIGNUP : AuthType.LOGIN)

	return (
		<Stack width='100%' height='100%'>
			<AuthHeader />
			<Stack alignItems='center'>
				<Stack
					width='100%'
					maxWidth={500}
				>
					{type === AuthType.LOGIN ? <LoginForm toggleAuthType={toggleAuthType}/> : <SignUpForm toggleAuthType={toggleAuthType}/>}
				</Stack>
			</Stack>
		</Stack>
	)
} 

export default AuthScreen