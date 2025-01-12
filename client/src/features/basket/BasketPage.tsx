import { Box, Button, Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab'
import BasketSummary from './BasketSummary';
import { currencyFormat } from '../../app/util/util';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync, removeBasketItemAsync } from './basketSlice';

function BasketPage() {

  const { basket, status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();


  if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">SubTotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component={'th'} scope='row'>
                  <Box display='flex' alignItems='center'>
                    <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(item.price)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton 
                    loading={status === ('pendingRemove' + item.productId)} color='error' 
                    onClick={() => dispatch(removeBasketItemAsync({productId: item.productId}))}
                  >
                      <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton 
                    loading={status === ('pendingAdd' + item.productId)} 
                    color='secondary' onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))}>
                      <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
                <TableCell align="right">
                  <LoadingButton color='error' 
                    loading={status === ('pendingRemove' + item.productId + item.quantity)}
                    onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: item.quantity}))}>
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid2 container>
            <Grid2 size={6}/>
            <Grid2 size={6}>
              <BasketSummary items={basket.items}/>
              <Button component={Link} to='/checkout' size='large' fullWidth variant='contained'>
                Checkout
              </Button>
            </Grid2>
      </Grid2>
    </>
  )
}

export default BasketPage