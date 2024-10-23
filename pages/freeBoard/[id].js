import styles from "@/styles/Article.module.css";
import Image from "next/image";
import kebabIcon from "@/public/ic_kebab.png";
import profileIcon from "@/public/ic_profile.png";
import heartIcon from "@/public/ic_heart.png";
import backIcon from "@/public/ic_back.svg";
import Link from "next/link";

export default function Article() {
  return (
    <div className={styles.layout}>
      <div className={styles.contentContainer}>
        <div className={styles.articleContainer}>
          <div className={styles.title}>
            <p>맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?</p>
            <Image width="24" height="24" src={kebabIcon} alt="kebabIcon" />
          </div>
          <div className={styles.articleInfo}>
            <div className={styles.userInfo}>
              <Image
                className={styles.userImg}
                width="40"
                height="40"
                src={profileIcon}
                alt="profileIcon"
              />
              <p className={styles.nickname}>총명한판다</p>
              <p className={styles.createAt}>2024. 01. 02</p>
            </div>
            <div className={styles.line}></div>
            <button className={styles.likeBtn}>
              <div className={styles.heartIcon}>
                <Image fill src={heartIcon} alt="heartIcon" />
              </div>
              <p>123</p>
            </button>
          </div>
          <div className={styles.content}>
            <p>맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?</p>
          </div>
        </div>

        <div className={styles.commentContainer}>
          <div className={styles.commentRegisterContainer}>
            <p>댓글달기</p>
            <textarea
              placeholder="댓글을 입력해주세요."
              className={styles.commentTextarea}
            ></textarea>
            <div className={styles.btnContainer}>
              <button className={styles.registerBtn}>등록</button>
            </div>
          </div>

          <div className={styles.commentListContainer}>
            <div className={styles.commentTitle}>
              <p>혹시 사용기간이 어떻게 되실까요?</p>
              <Image width="24" height="24" src={kebabIcon} alt="kebabIcon" />
            </div>
            <div className={styles.commentUserInfo}>
              <Image
                className={styles.commentUserImg}
                width="32"
                height="32"
                src={profileIcon}
                alt="profileIcon"
              />
              <div className={styles.commentUserInfoText}>
                <p className={styles.commentUserNickname}>총명한판다</p>
                <p className={styles.commentCreateAt}>1시간 전</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.returnBtnContainer}>
        <Link href={"/freeBoard"} className={styles.linkBtn}>
          목록으로 돌아가기
          <Image width="24" height="24" src={backIcon} alt="backIcon" />
        </Link>
      </div>
    </div>
  );
}
