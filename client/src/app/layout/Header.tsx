import { AppBar, Switch, Toolbar, Typography } from '@mui/material'

interface Props {
    handleThemeChange: () => void
    darkMode: boolean
}
function Header({ handleThemeChange,darkMode }: Props) {
    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant='h6'>Store</Typography>
                <Switch onChange={handleThemeChange}
                    checked={darkMode}
                />
            </Toolbar>
        </AppBar>
    )
}

export default Header