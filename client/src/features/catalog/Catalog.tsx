import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectores } from "./catalogSlice";
import ProductList from "./ProductList";
import { useEffect } from "react";


function Catalog() {
  const products = useAppSelector(productSelectores.selectAll)
  const {productsLoaded, status} = useAppSelector(state => state.catalog)
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if(!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch])

  if(status === 'pendingProducts') return <LoadingComponent />
  return (
    <>
      <ProductList products={products}/>
    </>
  )
}

export default Catalog