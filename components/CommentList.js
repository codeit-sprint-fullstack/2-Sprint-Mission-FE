import { deleteComment } from "@/pages/api/CommentService";
import { useRouter } from "next/router";
import style from "./styles/CommentList.module.css";
import Image from "next/image";
import profile from "@/public/ic_profile.png";
import KebabMenu from "./KebabMenu";
import defaultImg from "@/public/no_comment.png";
import inquiry from "@/public/inquiry.png";

export default function CommentList({ comments, onEdit, setComments }) {
const router = useRouter();
const isProductPage = router.pathname === "/products/[id]";

  const handleDeleteComment = async (id) => {
    try {
      await deleteComment(id);
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={style.commentContainer}>
      {comments.length === 0 && (
        <div className={style.noComment}>
          <Image className={style.img} src={isProductPage ? inquiry : defaultImg} alt="no comment" />
        </div>
      )}
      {comments.map((comment) => (
        <div key={comment.id} className={style.comment}>
          <div className={style.commentHeader}>
            <div className={style.commentContent}>{comment.content}</div>
            <KebabMenu
              onEdit={() => onEdit(comment)}
              onDelete={() => handleDeleteComment(comment.id)}
            />
          </div>
          <div className={style.commentProfile}>
            <Image
              className={style.commentProfileImg}
              src={profile}
              alt="profile"
            />
            <p className={style.commentUserName}>총명한 판다</p>
          </div>
        </div>
      ))}
      <button className={style.backBtn} onClick={() => router.push('/articles')}>목록으로 돌아가기</button>
    </div>
  );
}
