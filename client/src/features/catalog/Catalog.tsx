import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/modules/product";
import server from "../../app/server/server";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";


function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    server.Catalog.list().then(products => setProducts(products))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [])

  if(loading) return <LoadingComponent />
  return (
    <>
      <ProductList products={products}/>
    </>
  )
}

export default Catalog