import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StatusCode = {
	isLoggedIn: boolean
	track: string
}

export const initialState: StatusCode = { isLoggedIn: false, track: '' }

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
	},
})

export const { getClientResponse, setTrack } = user.actions
