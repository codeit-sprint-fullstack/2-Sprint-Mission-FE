"use client";

import { useParams } from "next/navigation";

export default function UsedGoodsMarketDetail() {
  const { productId } = useParams();
  return (
    <div>
      <div>
        <h1>{productId}</h1>
      </div>
    </div>
  );
}
