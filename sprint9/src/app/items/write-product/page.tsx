import { getProducts } from "@/src/api/productServices";
import Link from "next/link";
import Header from "@/src/components/Header";
import ProductList from "@/src/components/items/ProductList";
import WriteProductForm from "@/src/components/items/WriteProductForm";
import Button from "@/src/components/Button";

export default async function WriteProductPage() {
  const data = await getProducts();

  return (
    <div>
      <Header> 마이그레이션 하지 않은 중고 마켓 </Header>
      <Link href="/write-product">
        <Button> 상품 등록하기 </Button>
      </Link>
      <ProductList data={data} />
      <WriteProductForm />
    </div>
  );
}
