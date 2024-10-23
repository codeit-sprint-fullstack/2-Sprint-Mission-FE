import styles from "./board.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EditDeleteModal from "@/components/EditDeleteModal/EditDeleteModal";

import select from "../../images/board/select_img.svg";
import user from "../../images/board/profile_img.svg";
import like_button from "../../images/board/heart_btn.svg";
import back from "../../images/board/back_icon.svg";
import empty from "../../images/board/reply_empty.svg";

/** TODO
 * 1. 전체적인 이미지에 alt 넣기
 * 2. 삭제하기는 피그마에 없어서 추후 업데이트 예정
 */

export default function Board() {
  const [comment, setComment] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleEditClick = () => {
    setIsModalOpen(false);
    Router.push("/board/:id");
  };

  return (
    <>
      <div className={styles.detail_content_container}>
        <div className={styles.detail_title}>
          <h3>맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?</h3>
          <Image src={select} onClick={toggleModal} />
        </div>
        <div className={styles.detail_user_stats}>
          <Image src={user} className={styles.user_img} />
          <h4 className={styles.nickname}>총명한판다</h4>
          <h4 className={styles.create_at}>2024. 01. 02</h4>
          <div className={styles.line}></div>
          <Image src={like_button} />
        </div>
        <div className={styles.post_content}>
          <p>맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?</p>
        </div>
      </div>
      <div className={styles.comment_register_container}>
        <h4>댓글달기</h4>
        <textarea
          placeholder="댓글을 입력해주세요."
          className={styles.comment_textarea}
        ></textarea>
        <div className={styles.buttion_container}>
          <button className={styles.register_buttion}>등록</button>
        </div>
      </div>

      <div className={styles.comment_container}>
        {/* {comment.length === 0 ? ( */}
        {/* // <> */}
        {/* <Image src={empty} /> */}
        {/* <p>아직 댓글이 없어요</p> */}
        {/* </> */}
        {/* // ) : ( */}
        <>
          <div className={styles.comment_title}>
            <p>혹시 사용기간이 어떻게 되실까요?</p>
            <Image src={select} onClick={toggleModal} />
          </div>
          <div className={styles.detail_user_stats}>
            <Image src={user} className={styles.user_img} />
            <div className={styles.comment_user_stats_content}>
              <h5 className={styles.nickname}>총명한판다</h5>
              <h5 className={styles.create_at}>1시간 전</h5>
            </div>
          </div>
        </>
        {/* )} */}
      </div>
      <div className={styles.return_button_container}>
        <Link href={"/board"} className={styles.link_button}>
          <button className={styles.return_list}>
            목록으로 돌아가기
            <Image src={back} />
          </button>
        </Link>
      </div>
      {isModalOpen && <EditDeleteModal onEdit={handleEditClick} />}
    </>
  );
}
