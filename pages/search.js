import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "../lib/axios";
import BestPost from "../components/BestPost";
import SearchBar from "@/components/SearchBar";
import PostList from "@/components/PostList";
import styles from "../styles/community.module.css";

export async function getServerSideProps(context) {
  const { q } = context.query;

  try {
    const articlesRes = await axios.get("/articles");
    const posts = articlesRes.data;
    const topThreePosts = posts.slice(0, 3);

    const searchRes = await axios.get(`/search?q=${q}`);
    const searchPosts = searchRes.data ?? [];

    return {
      props: {
        topThreePosts,
        posts,
        searchPosts,
      },
    };
  } catch (e) {
    console.error(e.message);
    throw new Error(`ErrorMessage: ${e.message}`);
  }
}

export default function Search({ topThreePosts, searchPosts }) {
  const [dividePosts, setDividePosts] = useState([]);

  // 크기에 따른 bestPost
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 1200) {
        setDividePosts(topThreePosts.slice(0, 3));
      } else if (windowWidth >= 744) {
        setDividePosts(topThreePosts.slice(0, 2));
      } else {
        setDividePosts(topThreePosts.slice(0, 1));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [topThreePosts]);

  return (
    <>
      <div className={styles.bestTitle}>베스트 게시글</div>
      <BestPost topThreePosts={dividePosts} />
      <div className={styles.postBar}>
        <div className={styles.postBarTitle}>게시글</div>
        <button className={styles.createPostButton}>
          <Link href="/createPost">글쓰기</Link>
        </button>
      </div>
      <SearchBar />
      <PostList posts={searchPosts} />
    </>
  );
}
