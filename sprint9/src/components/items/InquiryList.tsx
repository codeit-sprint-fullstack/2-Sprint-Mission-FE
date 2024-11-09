"use client";

import Image from "next/image";
import style from "@/src/styles/items/InquiryList.module.css";
import profileImg from "@/public/assets/img_profile.png";
import DropBox from "../DropBox";
import EditInquiry from "./EditInquiry";
import { useState } from "react";
import formatDate from "@/src/utils/formatDate";

interface Comment {
  id: string;
  content: string;
  writer: object;
  createdAt: string;
  nickname: string;
}

interface InquiryListProps {
  comments: { list: Comment[] };
  onDeleteComment: () => void;
  onUpdateComment: () => void;
}

export default function InquiryList({ comments }: InquiryListProps) {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  return (
    <>
      {comments.list?.length ? (
        comments.list.map((item) => (
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
                <p className={style.nickname}>{item.writer.nickname}</p>
                <p className={style.date}>{formatDate(item.createdAt)}</p>
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
