import heart_on from "@/public/ic_heart.png";
import heart_off from "@/public/ic_heart_off.png";
import Image from "next/image";
import style from "./styles/LikeButton.module.css";
import { createFavorite, deleteFavorite } from "@/pages/api/ProductService";
import { createLike, deleteLike } from "@/pages/api/ArticleService";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";

export default function LikeButton({ isItem, cnt, id, liked }) {
  const { user } = useAuth(true);
  const [isLike, setIsLike] = useState(liked);
  const [count, setCount] = useState(cnt);

  useEffect(() => {
    setIsLike(liked);
    setCount(cnt);
  }, [liked, cnt]);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!user) {
        alert("로그인이 필요한 서비스입니다.");
        return;
    }
    
    try {
      if (isLike) {
        if (isItem) {
          await deleteFavorite(id);
        } else {
          await deleteLike(id);
        }
        setCount((prev) => prev - 1);
      } else {
        if (isItem) {
          await createFavorite(id);
        } else {
          console.log('create like');
          await createLike(id);
        }
        setCount((prev) => prev + 1);
      }
      setIsLike(!isLike);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <button className={style.likeBtn} onClick={handleClick}>
      <Image className={style.heart} alt="like icon" src={isLike ? heart_on : heart_off} />
      <p className={style.likeCnt}>{count}</p>
    </button>
  );
}
