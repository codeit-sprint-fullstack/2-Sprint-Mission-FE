import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function AddItemsSection() {
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        tag: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        try {
            const response = await fetch('/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            const result = await response.json();

            if (response.ok) {
                const newProductId = result._id;
                navigate(`/products/${newProductId}`);
            } else {
                console.error('상품 등록 실패:', result);
            }
        } catch (error) {
            console.error('네트워크 오류로 인해 상품 등록에 실패했습니다.', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>상품 등록하기</p>
            <button type="submit">상품 등록</button>
            <p>상품명</p>
            <input
                type="text"
                placeholder="상품명을 입력해주세요"
                value={productData.name}
                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
            />
            <p>상품 소개</p>
            <textarea
                placeholder="상품 소개를 입력해주세요"
                value={productData.description}
                onChange={(e) => setProductData({ ...productData, description: e.target.value })} 
            />
            <p>판매 가격</p>
            <input
                type="number"
                placeholder="판매 가격을 입력해주세요"
                value={productData.price}
                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
            />
            <p>태그</p>
            <input
                type="text"
                placeholder="판매 가격을 입력해주세요"
                value={productData.tag}
                onChange={(e) => setProductData({ ...productData, tag: e.target.value })}
            />

        </form>
    );
}

export default AddItemsSection;