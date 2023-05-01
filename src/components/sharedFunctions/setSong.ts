import { store } from '../../redux/store'
import { setSongNumber, setTrack } from '../../redux/user'
import spotifyApi from '../../shared/spotifyApi'

const setSong = (item: string, index: number, trackId: string) => {
	store.dispatch(setTrack({ track: item }))
	store.dispatch(setSongNumber({ songNumber: index }))
	if (item === trackId) {
		spotifyApi.play()
	} else {
		spotifyApi.play({
			context_uri: item,
			offset: { position: index },
		})
	}
}
export default setSong
