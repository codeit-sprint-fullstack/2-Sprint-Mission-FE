import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;

  return <div>{id}의 상세페이지</div>;
}
