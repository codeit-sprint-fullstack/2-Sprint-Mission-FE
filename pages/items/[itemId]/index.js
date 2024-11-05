import BackButton from "@/components/Common/BackButton";
import ProductInfo from "@/components/ItemDetail/ProductInfo";
import { getProduct } from "@/lib/api/ProductService";
import { useRouter } from "next/router"
import styles from "@/styles/ItemDetailPage.module.css";
import ProductCommentList from "@/components/ItemDetail/ProductCommentList";
import ProductCommentForm from "@/components/ItemDetail/ProductCommentForm";

export async function getServerSideProps(context) {
  const id = context.query['itemId'];
  const product = await getProduct(id);
  
  return {
    props: {
      product: product || {}, // 제품 데이터가 없을 경우 빈 객체 전달
      id, 
    }
  }
}
export default function ItemDetailPage( {id, product }) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <ProductInfo product={product} />               {/* 상품 주요 정보 */}
      <ProductCommentForm productId={id} />           {/* 문의하기 작성 */}
      <ProductCommentList productId={id} />           {/* 문의하기 리스트 */}
      <BackButton onClick={() => router.push('/items')} />
    </div>
  )
}