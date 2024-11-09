import { getProducts } from "@/src/api/productServices";

export default function ProductPage() {
  const data = await getProducts();

  return (
    <div className={style.headerAndButton}>
      <Header> 게시글 </Header>
      <PostList data={articles} />
    </div>
  );
}
