import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Product } from "../../app/modules/product";
import { Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab'
import server from "../../app/server/server";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { currencyFormat } from "../../app/util/util";
import { useStoreContext } from "../../app/context/StoreContext";

function ProductDetails() {
  const { basket, setBasket, removeItem } = useStoreContext()
  const { id } = useParams<{id: string}>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find(i => i.productId === product?.id);

  useEffect(() => {
    if(item) setQuantity(item.quantity);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    id && server.Catalog.details(parseInt(id))
      .then(product => setProduct(product))
      .catch(err => console.log(err))
      .finally(()=> setLoading(false))
  }, [id, item])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(parseInt(e.currentTarget.value) >= 0) {
      setQuantity(parseInt(e.currentTarget.value))
    }
  }

  const handleUpdateCart = () => {
    if(!product) return;
    setSubmitting(true);
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      server.Basket.addItem(product.id, updatedQuantity)
        .then(basket => setBasket(basket))
        .catch(err => console.log(err))
        .finally(() => setSubmitting(false))
    } else {
      const updatedQuantity = item.quantity - quantity;
      server.Basket.removeItem(product.id, updatedQuantity)
        .then(() => removeItem(product.id, updatedQuantity))
        .catch(err => console.log(err))
        .finally(() => setSubmitting(false))
    }
  }

  if(loading) return <LoadingComponent message="Loading Product..."/>

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
                <TableCell>{product.description}</TableCell>
              </TableRow>
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
              loading={submitting}
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