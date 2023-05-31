import React, {useEffect, useRef, useState} from 'react';
import {Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from '@mui/icons-material/Pause';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import {darkTheme, Item} from "./App";
import {Song, State, UserPlayer} from "./types";
import {getUserPlayerToken} from "./APIs";
import useWebSocket from "react-use-websocket";

export interface playerProps {
    selectedSong: Song | null;
    setSelectedSong: (song: Song | null) => void;
}

const Player = (props: playerProps) => {

    const [userPlayer, setUserPlayer] = useState<UserPlayer>({
        current_song: undefined,
        device: undefined,
        id: "",
        state: State.PAUSED,
        user: ""
    });
    const [onThisDevice, setOnThisDevice] = useState(false);
    const audio = useRef(new Audio());
    const token = useRef(localStorage.getItem('playerToken'));
    const deviceId = useRef(localStorage.getItem('deviceId'));

    const {sendMessage, lastMessage} =
        useWebSocket(`ws://${process.env.REACT_APP_PLAYER_URL}/user_player?`+ token.current,
            {
                shouldReconnect: () => {
                    updateToken();
                    return true;
                },
            });

    setInterval(() => {
        getUserPlayerToken().then(r=>token.current = r.token).catch(e=> console.log(e));
        }, 4*60*1000);


    useEffect(() => {
        if (lastMessage === null) return;
        console.log(lastMessage);
        setUserPlayer(JSON.parse(lastMessage.data));
    }, [lastMessage]);

    useEffect(() => {
        let protocol = process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
        audio.current.src = `${protocol}${process.env.REACT_APP_PLAYER_URL}${userPlayer?.current_song?.file}`;
        if (userPlayer.device?.id.toString() === deviceId.current) {
            if (userPlayer?.state === State.PLAYING) {
                audio.current.play();
            } else {
                audio.current.pause();
            }
            setOnThisDevice(true);
        }
        else {
            audio.current.pause();
            setOnThisDevice(false);
        }
    }, [userPlayer]);

    const updateToken = () => {
        getUserPlayerToken().then(r => {
            token.current = r.token;
        }).catch(e=>
            console.log(e));
    }

    const ChangeState = () => {
        if (userPlayer?.state === State.PLAYING) {
            sendMessage(JSON.stringify({'state': State.PAUSED}));
        } else {
            sendMessage(JSON.stringify({'state': State.PLAYING}));
        }
    }

    const ChangeSong = (song: Song | null) => {
        if (song === null) return;
        sendMessage(JSON.stringify({'song': song.id}));
        props.setSelectedSong(null);
    }

    const PlayOnDevice = () => {
        sendMessage(JSON.stringify({'device': deviceId.current}));
    }

    if (userPlayer?.current_song !== props.selectedSong) {
        ChangeSong(props.selectedSong);
    }

    return (
        <div>
            <Item sx={{height: '5rem'}}>
                <Box sx={{justifyContent: 'left', textAlign: 'center', width: '20%', float: 'left', display: 'inline'}}>
                    <h4 className='songName' style={{marginBlockEnd: 0}}>
                        {userPlayer?.current_song?.name}
                    </h4>
                    <h5 style={{marginBlock: 0}}>
                        Artist:&nbsp;{userPlayer?.current_song?.artist}
                    </h5>
                </Box>
                <Box sx={{justifyContent: 'center', width: '60%', float: 'left', display: 'inline'}}>
                    { !onThisDevice &&
                    <IconButton aria-label="switch" title='Play on This Device' onClick={()=>PlayOnDevice()}>
                        <SwitchAccessShortcutIcon/>
                    </IconButton>
                    }
                    <IconButton aria-label="previous">
                        {darkTheme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    <IconButton aria-label="play/pause" onClick={()=>ChangeState()}>
                        {userPlayer?.state === State.PAUSED ? <PlayArrowIcon sx={{height: 38, width: 38}}/> :
                            <PauseIcon sx={{height: 38, width: 38}}/>}
                    </IconButton>
                    <IconButton aria-label="next">
                        {darkTheme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                    <h5 style={{marginBlock: 0}}>
                        &nbsp;&nbsp;Listening on:&nbsp;{userPlayer?.device?.name}
                    </h5>
                </Box>
                <Box sx={{justifyContent: 'right', width: '15%', float: 'left', display: 'inline', textAlign: 'right'}}>
                    <h4>
                        {userPlayer?.current_song?.album}
                    </h4>
                </Box>
            </Item>
        </div>
    );
};

export default Player;