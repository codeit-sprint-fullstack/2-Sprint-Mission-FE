import Image from "next/image";
import styles from "../styles/bestPost.module.css";

export default function BestPost({ topThreePosts }) {
  if (!topThreePosts || topThreePosts.length === 0) {
    return <div className={styles.notBestPost}>베스트 게시글이 없습니다.</div>;
  }

  return (
    <div className={styles.bestPostMap}>
      {topThreePosts.map((bestPost) => (
        <div key={bestPost.id} className={styles.bestPostCard}>
          <div className={styles.bestPostCardTop}>
            <Image
              src={"/bestImg.png"}
              alt={"bestImg"}
              width={102}
              height={30}
            />
          </div>
          <div className={styles.bestPostCardMiddle}>
            <div className={styles.bestPostTitle}>{bestPost.title}</div>
            <Image
              className={styles.defaultImg}
              src={"/defaultImg.png"}
              alt={"defaultImg"}
              width={72}
              height={72}
            />
          </div>
          <div className={styles.bestPostCardBottom}>
            <div className={styles.bestPostCardBottomLeft}>
              <div>총명한 판다</div>
              <div>
                <Image
                  src="/smallHeart.png"
                  alt="smallHeart"
                  width={16}
                  height={16}
                />
              </div>
              <div>9999+</div>
            </div>
            <div className={styles.bestPostCardCreatedAt}>
              {new Date(bestPost.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
