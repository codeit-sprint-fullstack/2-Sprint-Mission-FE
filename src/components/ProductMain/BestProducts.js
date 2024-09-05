import { useEffect, useState } from "react";
import { getProductList } from "../../api/ProductService";
import ProductGrid from "./ProductGrid";

function BestProducts() {
  const [bestProducts, setBestProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBestProducts = async() => {
      try {
        const productList = await getProductList(1, 4, 'favorite');
        setBestProducts(productList.list); 
        console.log(productList.list); 
      } catch(e) {
        setError('베스트 상품을 불러오는 데 실패하였습니다.');
      }
    };
    fetchBestProducts();
  }, []);

  if(error) return (
    <div>{error}</div>
  );

  return (
    <div className="best-products">
      <h3 class="best-title">베스트 상품</h3>
      <ProductGrid products={bestProducts} />
    </div>
  )
}

export default BestProducts;