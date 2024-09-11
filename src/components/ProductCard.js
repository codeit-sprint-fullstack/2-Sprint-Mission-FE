import React from 'react';
import './ProductCard.css';
import heartImg from './img/ic_heart.svg';
import defaultImg from './img/img_default.svg';

const ProductCard = ({ product }) => {
  const imageUrl = product.images && Array.isArray(product.images) && product.images.length > 0 
    ? product.images[0] 
    : defaultImg;

  const formattedPrice = product.price.toLocaleString('ko-KR');
  const formattedFavorite = product.favoriteCount.toLocaleString('ko-KR');

  // 이미지 파일의 확장자를 확인하여 이미지가 유효한지 검사
  const isValidImage = (url) => {
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
    const urlExtension = url.split('.').pop().toLowerCase();
    return validExtensions.includes(urlExtension);
  };

  return (
    <div className="product-card">
      <img className='product-card-img'
        src={isValidImage(imageUrl) ? imageUrl : defaultImg} 
        alt={product.name} 
        onError={(e) => e.target.src = defaultImg}  // 이미지 로드 실패 시 기본 이미지로 변경
      />
      <div className="product-card-text">
        <h3>{product.name}</h3>
        <h2>{formattedPrice}원</h2>
        <div className="heart">
          <img className="heart-img" src={heartImg} alt="heart" />
          <p>{formattedFavorite}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
