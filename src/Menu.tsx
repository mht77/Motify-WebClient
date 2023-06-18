import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Toolbar from "@mui/material/Toolbar";
import icon from "./icon.png";
import {
    Badge,
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText, DialogTitle,
    Popover,
    TextField
} from "@mui/material";
import {useEffect} from "react";
import {createPlaylist, getNotifications, search} from "./APIs";
import {Song, Notification} from "./types";
import {pageProps} from "./App";

const drawerWidth = 100/6 + '%';

export interface menuProps extends pageProps {
    songs: Song[];
    setSongs: (songs: Song[]) => void;
    playlistName?: string;
}

export const Menu = (props: menuProps) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [keyword, setKeyword] = React.useState('');

    const [query, setQuery] = React.useState('');

    const [notifications, setNotification] = React.useState<Notification[]>([]);

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const [playlistName, setPlaylistName] = React.useState<string>('');

    const [modalOpen, setModalOpen] = React.useState(false);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'popover' : undefined;

    useEffect(() => {
        const timeOutId = setTimeout(() => setKeyword(query), 1500);
        return () => clearTimeout(timeOutId);
    }, [query]);

    useEffect(() => {
        if (keyword !== ''){
            search(keyword).then((res) => props.setSongs!(res));
        }
    }, [keyword, props.setSongs]);

    useEffect(() => {
        getNotifications().then((res) => setNotification(res)).catch((err) => console.log(err));
    },[]);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const openSearch = () => {
        props.setPage('Search');
        handleDrawerToggle();
    }

    const showPlaylists = () => {
        props.setPage('Playlists');
        handleDrawerToggle();
    }

    const openHome = () => {
        props.setPage('Home');
        handleDrawerToggle();
    }

    const handleOnCreate = async () => {
        if (playlistName !== ''){
            await createPlaylist(playlistName);
            props.setPage('Playlists');
            setModalOpen(false);
        }
    }

    const handleModalClose = () => setModalOpen(false);

    const drawer = (
        <div>
            <Toolbar>
                <Badge badgeContent={notifications.length.toString()} color='secondary'>
                    <img onClick={handleClick} src={icon} alt='icon' width='35rem' height='35rem'/>
                </Badge>
                <b className='hidden'>&nbsp;&nbsp;&nbsp;Motify</b>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <List>
                        {notifications.map((notification) => (
                                <ListItem key={Math.random()}>
                                    <ListItemText>
                                        {notification.msg}
                                    </ListItemText>
                                </ListItem>
                            )
                        )}
                        {notifications.length === 0 && <ListItem> <ListItemText> No notifications </ListItemText> </ListItem>}
                    </List>
                </Popover>
            </Toolbar>
            <Divider />
            <List>
                <ListItem key="Home" disablePadding onClick={()=>openHome()}>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="Search" disablePadding onClick={()=>openSearch()}>
                    <ListItemButton>
                        <ListItemIcon>
                            <SearchIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Search"/>
                    </ListItemButton>
                </ListItem>
                <ListItem key="Library" disablePadding onClick={()=> showPlaylists()}>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Library"/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key="Create Playlist" disablePadding onClick={()=>setModalOpen(true)}>
                    <ListItemButton>
                        <ListItemIcon>
                            <CreateIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create Playlist" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="Liked Songs" disablePadding onClick={()=>props.setPage('Liked Songs')}>
                    <ListItemButton>
                        <ListItemIcon>
                            <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Liked Songs"/>
                    </ListItemButton>
                </ListItem>
                <ListItem key="Logout" disablePadding onClick={()=>{
                    localStorage.removeItem('token');
                    localStorage.removeItem('playerToken');
                    localStorage.removeItem('deviceId')
                    window.location.reload();
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Dialog open={modalOpen} onClose={handleModalClose}>
                <DialogTitle>Create Playlist</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Choose a name for your playlist
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setPlaylistName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose}>Cancel</Button>
                    <Button onClick={handleOnCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

    const container =
        window !== undefined ? () => window.document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="absolute"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth})` },
                    ml: { sm: `${drawerWidth}` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" }}}
                    >
                        <MenuIcon />
                    </IconButton>
                    {
                        props.page === 'Playlist' && props.playlistName !== null && props.playlistName !== undefined ?
                            (<h2 style={{float: 'left'}}>
                                {props.playlistName}
                            </h2>) :
                            (<h2 style={{float: 'left'}}>
                                {props.page}
                            </h2>)
                    }
                    {props.page === 'Search' &&
                        <div style={{width: '85%', marginLeft: '2rem'}}>
                            <TextField fullWidth size='small'
                                       onChange={(e)=>setQuery(e.target.value)}/>
                        </div>
                    }
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        }
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        }
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 4, width: { sm: `calc(100% - ${drawerWidth})` },}}>
            </Box>
        </Box>
    );
}
