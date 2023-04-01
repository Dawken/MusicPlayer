export type Track = {
	album: {
		name: string
		images: {
			url: string
			width: number
		}[]
	}
	artists: {
		name: string
	}[]
	name: string
	id: string
	uri: string
}
