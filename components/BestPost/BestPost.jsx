import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import badge from "@/public/img_badge.svg";
import defaultImg from "@/public/img_default.svg";
import heart from "@/public/ic_heart.svg";
import styles from "./BestPost.module.css";

export default function BestPost() {
  const [recentPost, setRecentPost] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");

  async function getBestPosts({ orderBy, page, pageSize, keyword }) {
    try {
      const res = await axios.get("/articles", {
        params: { orderBy, page, pageSize, keyword },
      });
      const articles = res.data;
      setRecentPost(articles.slice(0, 3));
    } catch (error) {
      console.error(
        "API 요청 오류:",
        error.response ? error.response.data : error.message
      );
    }
  }

  useEffect(() => {
    getBestPosts({ orderBy, page, pageSize, keyword });
  }, [orderBy, page, pageSize, keyword]);

  return (
    <>
      <div className={styles.best_container}>
        {recentPost.map((article) => (
          <div key={article.id} className={styles.best_wrapper}>
            <Image src={badge} alt="배지" />
            <div className={styles.title_img}>
              <p>{article.title}</p>
              <Image src={defaultImg} alt="노트북 이미지" />
            </div>
            <div className={styles.user_wrapper}>
              <div className={styles.user_status}>
                <p className={styles.panda}>총명한판다</p>
                <Image src={heart} alt="하트" />
                <p>9999+</p>
              </div>
              <div className={styles.create_at}>
                <p>2024.04.16</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
