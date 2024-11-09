import { getProducts } from "@/src/api/productServices";
import Header from "@/src/components/Header";
import ProductList from "@/src/components/product/ProductList";

export default async function ProductPage() {
  const data = await getProducts();

  return (
    <div>
      <Header> 마이그레이션 하지 않은 중고 마켓 </Header>
      <ProductList data={data} />
    </div>
  );
}
