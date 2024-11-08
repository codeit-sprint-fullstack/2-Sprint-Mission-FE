import { useRouter } from 'next/router';
import ItemRegistration from '@components/product/ItemRegistration';

export default function ItemEditPage() {
  const router = useRouter();
  const { productId } = router.query;
  return <ItemRegistration productId={productId} />;
}
