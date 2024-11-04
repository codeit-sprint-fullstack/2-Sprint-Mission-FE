import BackButton from "@/components/Common/BackButton";
import ProductInfo from "@/components/ItemDetail/ProductInfo";
import { getProduct } from "@/lib/api/ProductService";
import { useRouter } from "next/router"
import styles from "@/styles/ItemDetailPage.module.css";

export async function getServerSideProps(context) {
  const id = context.query['itemId'];
  const product = await getProduct(id);
  //console.log('product', product);
  return {
    props: {
      product: product || {}, // 제품 데이터가 없을 경우 빈 객체 전달
      id, 
    }
  }
}
export default function ItemDetailPage( {id, product }) {
  const router = useRouter();
  const { itemId } = router.query;

  return (
    <div className={styles.container}>
      <ProductInfo product={product} />                 {/* 상품 주요 정보 */}
      {/* <CommentForm productId={id} />                    댓글 작성 및 등록 */}
      {/* <CommentList comments={product.productComments} />댓글 리스트 */}
      <BackButton onClick={() => router.push('/items')} />
    </div>
  )
}