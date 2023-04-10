import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const initialState = {
	isLoggedIn: false,
	track: '',
	isUserTyping: false,
}

export const user = createSlice({
	name: 'clientResponse',
	initialState,
	reducers: {
		getClientResponse: (
			state,
			action: PayloadAction<{ isLogged: boolean }>
		) => {
			state.isLoggedIn = action.payload.isLogged
		},
		setTrack: (state, action: PayloadAction<{ track: string }>) => {
			state.track = action.payload.track
		},
		setIsUserTyping: (
			state,
			action: PayloadAction<{ isUserTyping: boolean }>
		) => {
			state.isUserTyping = action.payload.isUserTyping
		},
	},
})

export const { getClientResponse, setTrack, setIsUserTyping } = user.actions
