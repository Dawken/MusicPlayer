import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const initialState = {
	isLoggedIn: false,
	track: '',
	songNumber: 0,
	isUserTyping: false,
	photoColor: '#1f19d9',
	playingSongColor: '#1f19d9',
	isPlaying: false,
	playingSongId: '',
	playingSongPhoto: '',
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
		setSongNumber: (
			state,
			action: PayloadAction<{ songNumber: number }>
		) => {
			state.songNumber = action.payload.songNumber
		},
		setIsUserTyping: (
			state,
			action: PayloadAction<{ isUserTyping: boolean }>
		) => {
			state.isUserTyping = action.payload.isUserTyping
		},
		setPhotoColor: (
			state,
			action: PayloadAction<{ photoColor: string }>
		) => {
			state.photoColor = action.payload.photoColor
		},
		setPlayingSongColor: (
			state,
			action: PayloadAction<{ playingSongColor: string }>
		) => {
			state.playingSongColor = action.payload.playingSongColor
		},
		setIsPlaying: (
			state,
			action: PayloadAction<{ isPlaying: boolean }>
		) => {
			state.isPlaying = action.payload.isPlaying
		},
		setPlayingSongId: (
			state,
			action: PayloadAction<{ playingSongId: string }>
		) => {
			state.playingSongId = action.payload.playingSongId
		},
		setPlayingSongPhoto: (
			state,
			action: PayloadAction<{ playingSongPhoto: string }>
		) => {
			state.playingSongPhoto = action.payload.playingSongPhoto
		},
	},
})

export const {
	getClientResponse,
	setTrack,
	setSongNumber,
	setIsUserTyping,
	setPhotoColor,
	setPlayingSongColor,
	setIsPlaying,
	setPlayingSongId,
	setPlayingSongPhoto,
} = user.actions
