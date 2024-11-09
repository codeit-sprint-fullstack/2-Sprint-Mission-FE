import { useRouter } from "next/router";
import BackButton from "@/components/Common/BackButton";
import ProductInfo from "@/components/ItemDetail/ProductInfo";
import styles from "@/styles/ItemDetailPage.module.css";
import ProductCommentList from "@/components/ItemDetail/ProductCommentList";
import ProductCommentForm from "@/components/ItemDetail/ProductCommentForm";

export default function ItemDetailPage() {
  const router = useRouter();
  const { itemId: id } = router.query;

  if (!router.isReady) return <p>상품 정보를 불러오는 중입니다....</p>;

  if (!id) return <p>유효한 상품 ID가 없습니다.</p>;

  return (
    <div className={styles.container}>
      <ProductInfo productId={id} />
      <ProductCommentForm productId={id} />
      <ProductCommentList productId={id} />
      <BackButton onClick={() => router.push("/items")} />
    </div>
  );
}

/*  상품 정보를 SSR 로 하면 localStorage의 accessToken 문제로 
 *  Authorization header 를 보낼 수 없음 
*/
/*
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
      <ProductInfo product={product} />              
      <ProductCommentForm productId={id} />          
      <ProductCommentList productId={id} />           
      <BackButton onClick={() => router.push('/items')} />
    </div>
  )
}
*/