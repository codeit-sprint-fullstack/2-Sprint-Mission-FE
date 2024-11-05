"use client";

import style from "@/src/styles/items/WriteInquiry.module.css";
import Button from "@/src/components/Button";
import { useState, useEffect } from "react";
// import { postComment } from '../api/commentServices';

export default function WriteInquiry({}) {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [comment, setComment] = useState("");

  async function createComment() {
    const data = { content: comment };

    if (!comment?.trim().length) return;
    //TODO: API 연결 후 로직 수정 필요
    // const res = await postComment(id, data);
    // onNewComment(res);
    // setComment('');
  }

  useEffect(() => {
    // setIsButtonActive(comment?.trim().length);
  }, [comment]);

  return (
    <div className={style.container}>
      <a className={style.title}>문의하기</a>
      <div className={style.comment}>
        <textarea
          id="comment"
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          className={style.textarea}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className={style.buttonContainer}>
        <Button
          status={isButtonActive}
          onClick={() => {
            createComment();
          }}
        >
          등록
        </Button>
      </div>
    </div>
  );
}
