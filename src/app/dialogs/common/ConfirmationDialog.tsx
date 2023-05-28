import useConfirmationStore from "@/stores/useConfirmationStore"
import { Button, Dialog, Stack, Theme, useMediaQuery } from "@mui/material"

const ConfirmationDialog = () => {
	const [title, onConfirm, hideConfirmationDialog] = useConfirmationStore(state => [state.title, state.onConfirm, state.hideConfirmationDialog])
	const shouldShowDialog = title !== null && onConfirm !== null

	const isMobileDevice = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	return (
		<Dialog
			open={shouldShowDialog}
			onClose={hideConfirmationDialog}
			PaperProps={{
				sx: {
					width: '100%',
					maxWidth: isMobileDevice ? '100%' : 600,
					margin: '16px',
					borderRadius: '16px',
					bgcolor: 'background.default'
				}
			}}
			sx={{
				'& .MuiDialog-container': {
					backdropFilter: 'blur(2px)'
				}
			}}
		>
			<Stack padding='16px' gap='24px'>
				{title && title}
				<Stack direction='row' justifyContent='end' gap='16px'>
					<Button onClick={hideConfirmationDialog}>Cancel</Button>
					<Button onClick={() => {
						if(onConfirm !== undefined) onConfirm()
						hideConfirmationDialog()
					}}>Continue</Button>
				</Stack>
			</Stack>
		</Dialog>
	)
}

export default ConfirmationDialog