import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StatusCode = {
	isLoggedIn: boolean
}

export const initialState: StatusCode = { isLoggedIn: false }

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
	},
})

export const { getClientResponse } = user.actions
