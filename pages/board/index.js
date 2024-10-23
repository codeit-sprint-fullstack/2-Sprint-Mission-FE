import BestPost from "../../components/BestPost/BestPost";
import Dropbox from "../../components/Dropbox/Dropbox";
import SearchForm from "../../components/SearchForm/SearchForm";
import styles from "./board.module.css";
import Image from "next/image";

import laptop from "../../images/board/laptop_img.svg";
import heart from "../../images/board/heart_img.svg";
import user from "../../images/board/profile_img.svg";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchApi } from "@/utils/fetchApi";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const data = await fetchApi("/articles");
      setPosts(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <h2>베스트 게시글</h2>
      <BestPost />
      <div className={styles.post_wrapper}>
        <h2>게시글</h2>
        <Link href="/board/register">
          <button className={styles.post_button}>글쓰기</button>
        </Link>
      </div>
      <div className={styles.option_form}>
        <SearchForm />
        <Dropbox />
      </div>
      {posts.map((post) => (
        <div key={post.id} className={styles.post_content}>
          <Link href={`/board/${post.id}`} className={styles.post_link}>
            <div className={styles.post_title}>
              <h3>{post.title}</h3>
              <Image src={laptop} />
            </div>
          </Link>
          <div className={styles.user_wrapper}>
            <div className={styles.user_stats}>
              <Image src={user} />
              <p>총명한판다</p>
              <div>2024. 04. 16</div>
            </div>
            <div className={styles.like}>
              <Image src={heart} />
              <p>9999+</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
