import Image from "next/image";
import styles from "./BestPost.module.css";
import badge from "../../images/board/best_badge.svg";
import laptop from "../../images/board/laptop_img.svg";
import heart from "../../images/board/heart_img.svg";
import { fetchApi } from "@/utils/fetchApi";
import { useEffect, useState } from "react";

async function fetchBestPosts() {
  try {
    const data = await fetchApi("/articles");
    return data
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default function BestPost() {
  const [recentPost, setRecentPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sortedPosts = await fetchBestPosts();
      setRecentPost(sortedPosts);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.best_container}>
        {recentPost.map((post) => (
          <div key={post.id} className={styles.best_wrapper}>
            <Image src={badge} alt="뱃지" />
            <div className={styles.title_img}>
              <h3>{post.title}</h3>
              <Image src={laptop} alt="디폴트이미지" />
            </div>
            <div className={styles.user_wrapper}>
              <div className={styles.user_stats}>
                <p>총명한판다</p>
                <Image src={heart} alt="좋아요버튼" />
                <p>9999+</p>
              </div>
              <div className={styles.create_at}>
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
