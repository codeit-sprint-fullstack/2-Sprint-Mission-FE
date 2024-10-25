import Image from "next/image";
import style from "./styles/BestCard.module.css";
import img_default from '@/public/img_default.png';
import img_badge from '@/public/img_badge.png';

export default function BestArticles({ articles }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}. ${month}. ${day}`;
  };
  
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
