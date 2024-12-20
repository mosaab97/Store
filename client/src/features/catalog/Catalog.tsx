import { Product } from "../../app/modules/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";


function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
    .then(res => res.json())
    .then(data => setProducts(data))
  }, [])

  return (
    <>
      <ProductList products={products}/>
    </>
  )
}

export default Catalog