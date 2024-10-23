import Image from "next/image";
import styles from "../styles/postList.module.css";

export default function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return <div className={styles.notPosts}>게시글이 없습니다.</div>;
  }

  return (
    <div className={styles.postsMap}>
      {posts.map((post) => (
        <div key={post.id} className={styles.postCard}>
          <div className={styles.PostCardLeft}>
            <div className={styles.postTitle}>{post.title}</div>
            <div className={styles.PostCardLeftBottom}>
              <Image
                src="/userIcon.png"
                alt="userIcon"
                width={24}
                height={24}
              />
              <div className={styles.userName}>총명한 판다</div>
              <div className={styles.postCardCreatedAt}>
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className={styles.postCardRight}>
            <div>
              <Image
                className={styles.defaultImg}
                src={"/defaultImg.png"}
                alt={"defaultImg"}
                width={72}
                height={72}
              />
            </div>
            <div className={styles.postCardRightBottom}>
              <div>
                <Image
                  src="/smallHeart.png"
                  alt="smallHeart"
                  width={16}
                  height={16}
                />
              </div>
              <div className={styles.favoriteCount}>9999+</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
