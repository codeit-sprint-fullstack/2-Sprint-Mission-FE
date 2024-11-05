"use client";

import Image from "next/image";
import style from "@/src/styles/items/InquiryList.module.css";
import profileImg from "@/public/assets/img_profile.png";
import DropBox from "../DropBox";
import EditInquiry from "./EditInquiry";
import { useState } from "react";

//TODO: need to fix after api applyin
interface InquiryListProps {
  comments: string;
  onDeleteComment: () => void;
  onUpdateComment: () => void;
}

export default function InquiryList({
  comments,
  onDeleteComment,
  onUpdateComment
}: InquiryListProps) {
  const [editingCommentId, setEditingCommentId] = useState(null);
  return (
    <>
      {comments.length > 0 ? (
        comments.map((item) => (
          <div key={item.id} className={style.container}>
            {editingCommentId === item.id ? (
              <EditInquiry />
            ) : (
              <div className={style.titleAndKebab}>
                <h1 className={style.title}>{item.content}</h1>
                <DropBox />
              </div>
            )}
            <div className={style.profile}>
              <Image
                src={profileImg}
                alt="a white panda with grey background"
              />
              <div className={style.texts}>
                <p className={style.nickname}>똑똑한 판다</p>
                <p className={style.date}>1시간 전</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className={style.noComment}>아직 댓글이 없습니다.</p>
      )}
    </>
  );
}
