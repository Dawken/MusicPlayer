import { store } from '../../redux/store'
import { setSongNumber, setTrack } from '../../redux/user'
import spotifyApi from '../../shared/spotifyApi'

const setSong = (item: string, index: number, trackId: string) => {
	if (item !== trackId) {
		store.dispatch(setTrack({ track: item }))
		store.dispatch(setSongNumber({ songNumber: index }))
	} else {
		spotifyApi.play()
	}
}
export default setSong
