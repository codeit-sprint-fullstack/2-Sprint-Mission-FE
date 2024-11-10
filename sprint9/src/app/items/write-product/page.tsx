import { getProducts } from "@/src/api/productServices";
import Header from "@/src/components/Header";
import WriteProductForm from "@/src/components/items/WriteProductForm";

export default async function WriteProductPage() {
  const data = await getProducts();

  return (
    <div>
      <WriteProductForm />
    </div>
  );
}
