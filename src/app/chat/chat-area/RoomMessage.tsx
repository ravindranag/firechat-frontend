import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { RoomMessageProps } from "./RoomChatScrollView";

const RoomMessage = ({ isSent }: RoomMessageProps) => {
	const theme = useTheme();
	const isMobileDevice = useMediaQuery(theme.breakpoints.down('md'));
	return (
		<Stack alignItems={isSent ? 'end' : 'start'} width='100%'>
			<Stack maxWidth={isMobileDevice ? 250 : 350} width='100%' padding='8px' borderRadius='8px' bgcolor={isSent ? 'tertiaryContainer.main' : 'secondaryContainer.main'}>
				<Typography
					component='pre'
					color={isSent ? 'onTertiaryContainer.main' : 'onSecondaryContainer.main'}
				>
					{'asd\njhsadjh\njahd'}
				</Typography>
			</Stack>
		</Stack>
	)
}

export default RoomMessage
