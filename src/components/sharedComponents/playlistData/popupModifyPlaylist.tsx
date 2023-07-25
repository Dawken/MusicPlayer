import { Button, Dialog } from '@mui/material'
import React, { useState } from 'react'
import styles from './popupModifyPlaylist.module.scss'
import SpotifyApi from 'spotify-web-api-node'
import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse
import spotifyApi from '../../../shared/spotifyApi'
import { toast } from 'react-toastify'
import MusicNoteIcon from '@mui/icons-material/MusicNote'

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
    const [playlistName, setPlaylistName] = useState(playlist.name)

    const [playlistDescription, setPlaylistDescription] = useState(
        playlist.description
    )
    const updatePlaylist = () => {
        spotifyApi
            .changePlaylistDetails(playlist.id, {
                name: playlistName,
                description: playlistDescription || undefined,
            })
            .then(() => {
                toast.success('Playlist data has been updated')
            })
            .catch(() => {
                toast.error('Error, try again later')
            })
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    backgroundColor: '#1f1f1f',
                    color: 'white',
                },
            }}
        >
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
