import { useRouter } from 'next/router';
import { createProduct } from '@/lib/api/ProductService';
import ProductForm from '@/components/Items/ProductForm';

export default function RegisterProductPage() {
  const router = useRouter();

  // 폼 제출 시 호출되는 함수
  const handleCreateProduct = async (productData) => {
    try {
      // 상품 생성 API 호출
      const createdProduct = await createProduct(productData);

      // 상품 등록 후, 생성된 상품의 상세 페이지로 이동
      router.push(`/items/${createdProduct.id}`);
    } catch (error) {
      console.error(error);
      alert('상품 등록에 실패했습니다.');
    }
  };

  return (
    <ProductForm onSubmit={handleCreateProduct} />
  );
}
