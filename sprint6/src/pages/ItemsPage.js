import { Link } from "react-router-dom";

export default function ItemsPage() {
  return (
    <div>
      <h1>중고마켓</h1>
      <Link to="registration">
        <button>상품 등록하기</button>
      </Link>
      {/* 중고마켓 관련 내용 */}
    </div>
  );
}
