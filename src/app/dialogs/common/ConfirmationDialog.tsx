import useConfirmationStore from "@/stores/useConfirmationStore"
import { Button, Dialog, Stack, useMediaQuery } from "@mui/material"

const ConfirmationDialog = () => {
	const [title, onConfirm, hideConfirmationDialog] = useConfirmationStore(state => [state.title, state.onConfirm, state.hideConfirmationDialog])
	const shouldShowDialog = title !== null && onConfirm !== null

	return (
		<Dialog
			open={shouldShowDialog}
			onClose={hideConfirmationDialog}
			PaperProps={{
				sx: (theme) => ({
					width: '100%',
					maxWidth: useMediaQuery(theme.breakpoints.down('md')) ? '100%' : 600,
					margin: '16px',
					borderRadius: '16px',
					bgcolor: 'background.default'
				})
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