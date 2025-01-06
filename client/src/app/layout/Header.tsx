import { ShoppingCart } from '@mui/icons-material'
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'
import { useStoreContext } from '../context/StoreContext'

const midLinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'},
]

const rightLinks = [
    {title: 'login', path: '/login'},
    {title: 'signup', path: '/signup'},
]


interface Props {
    handleThemeChange: () => void
    darkMode: boolean
}

const navStyles = {
    textDecoration: 'none',
    color: 'inherit', 
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

function Header({ handleThemeChange,darkMode }: Props) {
    const { basket } = useStoreContext();
    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box display={'flex'} alignItems={'center'}>
                    <Typography 
                        component={NavLink} 
                        to={'/'} 
                        variant='h6'
                        sx={navStyles}
                    >
                        Store
                    </Typography>
                    <Switch onChange={handleThemeChange}
                        checked={darkMode}
                    />
                </Box>

                <List sx={{display: 'flex'}}>
                    {midLinks.map(({title, path}) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                
                <Box display={'flex'} alignItems={'center'}>
                    <IconButton component={Link} to="/basket" size='large' edge='start' color='inherit' sx={{mr: 2}}>
                        <Badge badgeContent={basket?.items.reduce((sum, item) => sum + item.quantity, 0)} color='secondary'>
                            <ShoppingCart />
                        </Badge>

                    </IconButton>
                    <List sx={{display: 'flex'}}>
                        {rightLinks.map(({title, path}) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header