import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { LoadingButton } from '@mui/lab'
import { Product } from "../../app/modules/product"
import { Link } from "react-router-dom"
import { currencyFormat } from "../../app/util/util"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { addBasketItemAsync } from "../basket/basketSlice"

interface Props {
  product: Product
}

function ProductCard({ product }: Props) {

  const {status} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch()


  return (
    <Card>
      <CardHeader 
        avatar={
          <Avatar sx={{bgcolor: 'secondary.main'}}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: {
            fontWeight: 'bold',
            color: 'primary.main'
          }
        }}
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography color="secondary" gutterBottom variant="h5" component="div">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={status === ('pendingAdd'+product.id)} onClick={() => dispatch(addBasketItemAsync({productId: product.id}))} size="small">Add to cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard