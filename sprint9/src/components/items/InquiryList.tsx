"use client";

import Image from "next/image";
import style from "@/src/styles/items/InquiryList.module.css";
import profileImg from "@/public/assets/img_profile.png";
import DropBox from "../DropBox";
import DropBoxWrapper from "./DropBoxWrapper";
import EditInquiry from "./EditInquiry";
import { useState } from "react";
import formatDate from "@/src/utils/formatDate";
import { patchComment, deleteComment } from "@/src/api/commentServices";

interface Comment {
  id: string;
  content: string;
  writer: object;
  createdAt: string;
  nickname: string;
}

interface InquiryListProps {
  comments: { list: Comment[] };
  currentUserId: string;
  onDeleteComment: () => void;
  onUpdateComment: () => void;
}

export default function InquiryList({
  comments,
  currentUserId
}: InquiryListProps) {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const handleDeleteComment = async (commentId: string) => {
    await deleteComment(commentId);
  };

  const handleEditComment = (commentId: string, newComment: string) => {
    setEditingCommentId(commentId);
    patchComment(commentId, { content: newComment });
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  return (
    <>
      {comments.list?.length ? (
        comments.list.map((item) => (
          <div key={item.id} className={style.container}>
            {editingCommentId === item.id ? (
              <EditInquiry
                comment={item.content}
                onCancelClick={handleCancelEdit}
                onEditClick={(newComment) =>
                  handleEditComment(item.id, newComment)
                }
              />
            ) : (
              <div className={style.titleAndKebab}>
                <h1 className={style.title}>{item.content}</h1>
                {item.writer.id === currentUserId && (
                  <DropBoxWrapper
                    editOnClick={() => setEditingCommentId(item.id)}
                    deleteOnClick={() => handleDeleteComment(item.id)}
                  />
                )}
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
        <p className={style.noComment}>아직 문의가 없습니다.</p>
      )}
    </>
  );
}
