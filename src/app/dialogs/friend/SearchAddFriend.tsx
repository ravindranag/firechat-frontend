import useAppStore from "@/stores/useAppStore"
import { Close, Search, SentimentDissatisfied } from "@mui/icons-material"
import { CircularProgress, Dialog, IconButton, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import PersonAction from "./PersonAction"
import useSearchStore from "@/stores/useSearchStore"
import { useRef, useState } from "react"

const EmptySearchResult = () => {
	return (
		<Stack alignItems='center' gap='12px'>
			<SentimentDissatisfied fontSize="large" />
			<Typography>No user found</Typography>
		</Stack>
	)
}

const SearchAddFriend = () => {
	const [showSearchDialog, setShowSearchDialog, fetchDataForDashboard] = useAppStore(state => [state.showSearchDialog, state.setShowSearchDialog, state.fetchDataForDashboard])
	const theme = useTheme()
	const [loading, results, search, sendFriendRequestToUser] = useSearchStore(state => [state.loading, state.results, state.search, state.sendFriendRequestToUser])
	const searchBoxRef = useRef<HTMLInputElement>(null)
	const [hasSearchedOnce, setHasSearchedOnce] = useState<boolean>(false)
	const [friendListNeedsToUpdate, setFriendListNeedsToUpdate] = useState<boolean>(false)

	const handleClose = () => {
		if(friendListNeedsToUpdate) fetchDataForDashboard()
		setShowSearchDialog(false)
	}

	return (
		<Dialog 
			open={showSearchDialog} 
			onClose={handleClose}
			PaperProps={{
				sx: (theme) => ({
					width: '100%',
					maxWidth: useMediaQuery(theme.breakpoints.down('md')) ? '100%' : 600,
					margin: 0,
					borderRadius: useMediaQuery(theme.breakpoints.down('md')) ? 0 : '16px',
					bgcolor: 'background.default',
					height: useMediaQuery(theme.breakpoints.down('md')) ? '100%' : 'calc(100vh - 32px)',
				})
			}}
			fullScreen={useMediaQuery(theme.breakpoints.down('md'))}
			sx={{
				'& .MuiDialog-container': {
					backdropFilter: 'blur(2px)'
				}
			}}
		>
			<Stack height='100%'>
				<Stack padding='16px'>
					<IconButton onClick={handleClose} sx={{alignSelf: 'end'}}>
						<Close />
					</IconButton>
				</Stack>
				<Stack padding={{xs: '0 16px', md: '0 32px'}} direction='row' alignItems='center' gap='8px'>
					<TextField
						inputRef={searchBoxRef}
						variant='outlined'
						placeholder="Search"
						sx={{
							flexGrow: 1,
						}}
						InputProps={{
							sx: {
								'& .MuiOutlinedInput-input': {
									padding: '14px'
								}
							}
						}}
					/>
					<IconButton 
						sx={{
							bgcolor: 'primary.main',
							color: 'onPrimary.main',
							'&:hover': {
								bgcolor: 'primary.main',
								color: 'onPrimary.main',
							}
						}}
						onClick={() => {
							const query = searchBoxRef.current?.value
							console.log(query)
							if(query) {
								search(query)
								setHasSearchedOnce(true)
							}
						}}
					>
						{loading ? <CircularProgress color="onPrimary" size={24} /> : <Search />}
					</IconButton>
				</Stack>
				<Stack height='100%' sx={{overflowY: 'auto'}} padding={{xs: '16px', md: '32px'}}>
					{!loading && hasSearchedOnce && results.length === 0 && <EmptySearchResult />}
					{ 
						results.length > 0 && results.map(user => (
							<PersonAction 
								key={`search-result-${user.id}`}
								variant="search"
								user={user}
								onClick={() => {
									sendFriendRequestToUser(user.id!)
									setFriendListNeedsToUpdate(true)
								}}
							/>
						))
					}
				</Stack>
			</Stack>
		</Dialog>
	)
}

export default SearchAddFriend