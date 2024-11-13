import ProductDetail from '@/components/ProductDetail/ProductDetail';
import { getComments, getProduct } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query';

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  const { id } = context.params || {};

  if (!id) {
    return {
      notFound: true
    };
  }

  await queryClient.prefetchQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id)
  });

  await queryClient.prefetchQuery({
    queryKey: ['productComments', id],
    queryFn: () => getComments(id)
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id
    }
  };
}

export default function ProductDetailPage({ dehydratedState, id }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductDetail id={id} />
    </HydrationBoundary>
  );
}
