import { Chat, ChatStatus } from "@/types/chat";
import { AccessTime, Check } from "@mui/icons-material";
import { Stack, Theme, Typography, useMediaQuery } from "@mui/material";

type RoomMessageProps = {
	isSent: boolean
	chat: Chat
}

const RoomMessage = ({ isSent, chat }: RoomMessageProps) => {
	const isMobileDevice = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
	return (
		<Stack alignItems={isSent ? 'end' : 'start'} width='100%'>
			<Stack direction='row' alignItems='end' gap='8px' maxWidth={isMobileDevice ? 250 : 350} width='fit-content' padding='8px' borderRadius='8px' bgcolor={isSent ? 'tertiaryContainer.main' : 'secondaryContainer.main'}>
				<Typography
					component='pre'
					color={isSent ? 'onTertiaryContainer.main' : 'onSecondaryContainer.main'}
				>
					{chat.message.toString()}
				</Typography>
				{ isSent && 
					(chat.status === ChatStatus.PENDING 
						? <AccessTime color={isSent ? 'onTertiaryContainer' : 'onSecondaryContainer'} fontSize="small" /> 
						: <Check color={isSent ? 'onTertiaryContainer' : 'onSecondaryContainer'} fontSize="small" /> )
				}
			</Stack>
		</Stack>
	)
}

export default RoomMessage
