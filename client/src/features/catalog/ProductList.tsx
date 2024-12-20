import { Grid2 } from "@mui/material"
import { Product } from "../../app/modules/product"
import ProductCard from "./ProductCard"


interface Props {
    products: Product[]
}

function ProductList({products}: Props) {
  return (
    <Grid2 container spacing={4}>
        {products.map((product)=> (
            <Grid2 size={3}>
                
          <ProductCard product={product} key={product.id}/>
          </Grid2>
        ))}
      </Grid2>
  )
}

export default ProductList