import { Button, Dialog } from '@mui/material'
import React from 'react'
import styles from './popupModifyPlaylist.module.scss'
import SpotifyApi from 'spotify-web-api-node'
import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import usePopupModifyPlaylist from './usePopupModifyPlaylist'

type PopupDeletePlaylistProps = {
    open: boolean
    handleClose: () => void
    playlist: SinglePlaylistResponse
}

const PopupModifyPlaylist: React.FC<PopupDeletePlaylistProps> = ({
    open,
    handleClose,
    playlist,
}) => {
    const {
        playlistName,
        setPlaylistName,
        playlistDescription,
        setPlaylistDescription,
        updatePlaylist,
    } = usePopupModifyPlaylist({ playlist })

    return (
        <Dialog open={open} onClose={handleClose}>
            <div className={styles.playlist}>
                {playlist?.images[0] ? (
                    <img
                        src={playlist?.images[0].url}
                        className={styles.playlistImage}
                    />
                ) : (
                    <div className={styles.playlistImage}>
                        <MusicNoteIcon className={styles.songIcon} />
                    </div>
                )}
                <div className={styles.playlistData}>
                    <input
                        className={styles.playlistName}
                        placeholder={'Enter title'}
                        required
                        value={playlistName}
                        onChange={(event) =>
                            setPlaylistName(event.target.value)
                        }
                    />
                    <textarea
                        className={styles.playlistDescription}
                        placeholder={'Enter description (optional)'}
                        value={playlistDescription ?? ''}
                        onChange={(event) =>
                            setPlaylistDescription(event.target.value)
                        }
                    />
                </div>
            </div>
            <Button onClick={() => updatePlaylist()}>Save</Button>
        </Dialog>
    )
}
export default PopupModifyPlaylist
