import Image from "next/image";
import style from "./styles/ArticleList.module.css";
import img_default from '@/public/img_default.png';
import { formatDate } from "@/utils/formatDate";
import Link from 'next/link';

export default function ArticleList({ articles }) {  
  return (
    <div className={style.card}>
      {articles.map((article) => (
        <div key={article.id} className={style.cardSection}>
          <Link className={style.link} href={`/articles/${article.id}`}>
          <div className={style.titleImgGroup}>
            <p className={style.title}>{article.title}</p>
            <Image 
              className={style.img}
              src={(article.images && article.images.length > 0) ? article.images[0] : img_default}
              alt={article.title} />
          </div>
          <div className={style.favDateGroup}>
            <p className={style.date}>{formatDate(article.createdAt)}</p>
            <p className={style.favoriteCnt}>♡ {article.likeCount}</p>
          </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
