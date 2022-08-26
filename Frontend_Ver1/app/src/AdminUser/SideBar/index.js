import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import './sidebar.scss'
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {Outlet, useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';

import CreditCardIcon from '@mui/icons-material/CreditCard';


const drawerWidth = 200;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function SideBarUser() {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>

            <CssBaseline sx={{backgroundColor:'black',}} />
            <Drawer  variant="permanent" open={open}>
                <Toolbar>
                    <IconButton

                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 3,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <ChevronRightIcon sx={{fontSize:'2rem',color:'#ffffff'}} />
                    </IconButton>
                </Toolbar>
                <DrawerHeader
                    sx={{

                        margin:'auto',
                        position:"absolute",
                        top:8,
                        left:136,
                        display:"none",
                        ...(open && { display: 'block' }),
                    }}
                >
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon sx={{fontSize:'2rem',color:'#ffffff'}} /> : <ChevronLeftIcon  sx={{fontSize:'2rem',color:'#ffffff'}}/>}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <List sx={{fontSize:'1.3rem' }} >
                    {['Home'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block'}}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0
                                        ?
                                        <Link to='/'>
                                                <HomeIcon sx={{fontSize:'2rem',color:'#ffffff'}} />
                                        </Link>
                                        :
                                        <Link to='/admin'>
                                                <DashboardIcon sx={{fontSize:'2rem',color:'#ffffff'}} />
                                        </Link>
                                    }
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color:'#ffffff'}} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />

                <Divider />
                <List>
                    {['Top up'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0
                                        ?
                                        <Link to={'../topup/'}>
                                            <CreditCardIcon sx={{fontSize: '2rem', color: '#ffffff'}}/>
                                        </Link>
                                        :
                                        <Link to='users'>
                                            <PersonIcon sx={{fontSize: '2rem', color: '#ffffff'}}/>
                                        </Link>
                                    }
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color:'#ffffff' }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Outlet/>
        </Box>
    );
}
