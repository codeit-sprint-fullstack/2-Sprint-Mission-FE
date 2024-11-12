import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchApi } from "@/utils/axiosInstance";
import RegistrationProduct from "@/components/RegistrationProduct/RegistrationProduct";

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      if (id) {
        try {
          const data = await fetchApi(`/products/${id}`, {}, "GET");
          setProductData(data);
        } catch (error) {
          console.error(error);
          router.push("/items");
        }
      }
    };
    fetchProductData();
  }, [id, router]);

  const handleUpdate = async (updatedId) => {
    router.push(`/items/${updatedId}`);
  };

  return (
    <div>
      <h1>상품 수정하기</h1>
      <RegistrationProduct product={productData} onUpdate={handleUpdate} />
    </div>
  );
};

export default EditProduct;
