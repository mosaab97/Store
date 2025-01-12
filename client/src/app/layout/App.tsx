import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getCookie } from "../util/util";
import server from "../server/server";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#eaeaea'
      }
    },
  })

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if(buyerId) {
      server.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [dispatch])

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  }

  if(loading) return <LoadingComponent message="Initializing App ..." />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Outlet />
      </Container>
      
    </ThemeProvider>
  )
}

export default App
