import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab'
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectores } from "./catalogSlice";

function ProductDetails() {
  const { basket, status } = useAppSelector(state => state.basket);
  const { id } = useParams<{id: string}>();

  const product = useAppSelector(state => productSelectores.selectById(state, id));
  const {status: productStatus} = useAppSelector(state => state.catalog);

  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find(i => i.productId === product?.id);

  useEffect(() => {
    if(item) setQuantity(item.quantity);
    if(!product && id) dispatch(fetchProductAsync(parseInt(id)))
  }, [dispatch, id, item, product])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(parseInt(e.currentTarget.value) >= 0) {
      setQuantity(parseInt(e.currentTarget.value))
    }
  }

  const handleUpdateCart = () => {
    if(!product) return;
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(addBasketItemAsync({productId: product?.id, quantity: updatedQuantity}))
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(removeBasketItemAsync({productId: product.id, quantity: updatedQuantity}))
    }
  }

  if(productStatus.includes('pending')) return <LoadingComponent message="Loading Product..."/>

  if(!product) return <NotFound />

  return (
    <Grid2 container spacing={6}>
      <Grid2 size={6}>
        <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
      </Grid2>
      <Grid2 size={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{mb: 2}} />
        <Typography variant="h4" color="secondary">{currencyFormat(product.price)}</Typography>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
              </TableRow>
                <TableCell>{product.description}</TableCell>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity In Stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid2 spacing={2} container>
          <Grid2 size={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in cart"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <LoadingButton
              sx={{height: '55px'}}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              loading={status.includes('pending')}
              onClick={handleUpdateCart}
              disabled={item?.quantity === quantity || !item && quantity === 0}
            >
              {item ? 'Update Quantity' : "Add to cart"}
            </LoadingButton>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  )
}

export default ProductDetails