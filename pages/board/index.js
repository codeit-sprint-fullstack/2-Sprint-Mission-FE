import BestPost from "../../components/BestPost/BestPost";
import Dropbox from "../../components/Dropbox/Dropbox";
import SearchForm from "../../components/SearchForm/SearchForm";
import styles from "./styles/board.module.css";
import Image from "next/image";

import laptop from "../../images/board/laptop_img.svg";
import heart from "../../images/board/heart_img.svg";
import user from "../../images/board/profile_img.svg";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchApi } from "@/utils/fetchApi";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPosts = async () => {
    try {
      const data = await fetchApi("/articles");
      const sortedData = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedData);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = (word) => {
    setSearch(word);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

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
        <SearchForm onSearch={handleSearch} />
        <Dropbox />
      </div>
      {filteredPosts.map((post) => (
        <div key={post.id} className={styles.post_content}>
          <Link href={`/board/${post.id}`} className={styles.post_link}>
            <div className={styles.post_title}>
              <h3>{post.title}</h3>
              <Image src={laptop} alt="디폴트 이미지" />
            </div>
          </Link>
          <div className={styles.user_wrapper}>
            <div className={styles.user_stats}>
              <Image src={user} alt="유저 이미지" />
              <p>총명한판다</p>
              <div>{new Date(post.createdAt).toLocaleDateString()}</div>
            </div>
            <div className={styles.like}>
              <Image src={heart} alt="좋아요" />
              <p>9999+</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
