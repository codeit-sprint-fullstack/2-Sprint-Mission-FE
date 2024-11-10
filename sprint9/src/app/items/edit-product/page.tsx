import { getProducts } from "@/src/api/productServices";
import Header from "@/src/components/Header";
import ProductList from "@/src/components/items/ProductList";
import WriteProductForm from "@/src/components/items/WriteProductForm";

export default async function EditProductPage() {
  const data = await getProducts();

  return (
    <div>
      <Header> 아티클 수정하기 </Header>
      <ProductList data={data} />
    </div>
  );
}
