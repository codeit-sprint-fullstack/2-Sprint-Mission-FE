import Image from "next/image";
import styles from "./BestPost.module.css";
import badge from "../../images/board/best_badge.svg";
import laptop from "../../images/board/laptop_img.svg";
import heart from "../../images/board/heart_img.svg";
import { fetchApi } from "@/utils/fetchApi";
import { useEffect, useState } from "react";

export default function BestPost() {
  const [post, setPost] = useState([]);
  const [recentPost, setRecentPost] = useState([]);

  const fetchBestPosts = async () => {
    try {
      const data = await fetchApi("/articles");
      setPost(data);

      const sortedPosts = data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
      setRecentPost(sortedPosts);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchBestPosts();
  }, []);

  return (
    <>
      <div className={styles.best_container}>
        {recentPost.map((post) => (
          <div key={post.id} className={styles.best_wrapper}>
            <Image src={badge} />
            <div className={styles.title_img}>
              <h3>{post.title}</h3>
              <Image src={laptop} />
            </div>
            <div className={styles.user_wrapper}>
              <div className={styles.user_stats}>
                <p>총명한판다</p>
                <Image src={heart} />
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
