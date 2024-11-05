import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProductForm from '@/components/Items/ProductForm'; //
import { getProduct, updateProduct } from '@/lib/api/ProductService';

export default function ProductEditPage() {
  const router = useRouter();
  const { id } = router.query; // URL의 id 파라미터로부터 상품 ID를 가져옴
  const [initialData, setInitialData] = useState(null); // 초기 상품 데이터를 저장
  const [loading, setLoading] = useState(true);

  // 기존 상품 데이터를 불러오는 함수
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const product = await getProduct(id);
          console.log('product', product)
          setInitialData(product); // 초기 데이터 설정
        } catch (error) {
          console.error(error);
          alert('상품 정보를 불러오는데 실패했습니다.');
          //router.push('/items');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, router]);

  // 상품 수정 처리 함수
  const handleUpdateProduct = async (productData) => {
    const payload = {
      images: productData.images.length ? productData.images : [],
      tags: productData.tags.length ? productData.tags : [],
      price: productData.price,
      description: productData.description,
      name: productData.name,
    };
  
    try {
      await updateProduct(id, payload);
      router.push(`/items/${id}`);
    } catch (error) {
      console.error('상품 수정 실패:', error);
      alert('상품 수정에 실패했습니다.');
    }
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <ProductForm
      initialData={initialData}
      onSubmit={handleUpdateProduct}
      isEdit={true}
    />
  );
}
