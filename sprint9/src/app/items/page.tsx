import { getProducts } from "@/src/api/productServices";
import Header from "@/src/components/Header";
import ProductList from "@/src/components/items/ProductList";
import Link from "next/link";
import Button from "@/src/components/Button";

export default async function ProductPage() {
  const data = await getProducts();

  return (
    <div>
      <Header> 마이그레이션 하지 않은 중고 마켓 </Header>
      <Link href="/items/write-product">
        <Button status={true}> 상품 등록하기 </Button>
      </Link>
      <ProductList data={data} />
    </div>
  );
}
