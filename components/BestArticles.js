import Image from "next/image";
import style from "./styles/BestCard.module.css";
import img_default from '@/public/img_default.png';
import img_badge from '@/public/img_badge.png';
import { formatDate } from "@/utils/formatDate";

export default function BestArticles({ articles }) {
  return (
    <div className={style.card}>
      {articles.map((article) => (
        <div key={article.id} className={style.cardSection}>
          <Image className={style.bestIcon} src={img_badge} alt="best_icon" />
          <div className={style.titleImgGroup}>
            <p className={style.title}>{article.title}</p>
            <Image 
              className={style.img}
              src={article.images.length > 0 ? article.images[0] : img_default} 
              alt={article.title} />
          </div>
          <div className={style.favDateGroup}>
            <p className={style.favoriteCnt}>♡ {article.favoriteCnt}</p>
            <p className={style.date}>{formatDate(article.createdAt)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
