"use client";

import Image from "next/image";
import style from "@/src/styles/items/InquiryList.module.css";
import profileImg from "@/public/assets/img_profile.png";
import DropBoxWrapper from "./DropBoxWrapper";
import EditInquiry from "./EditInquiry";
import formatDate from "@/src/utils/formatDate";
import noInquiry from "@/public/assets/img_inquiry_empty.png";
import { patchComment, deleteComment } from "@/src/api/commentServices";
import { useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";

interface Comment {
  id: string;
  content: string;
  writer: object;
  createdAt: string;
  nickname: string;
}

interface InquiryListProps {
  comments: { list: Comment[] };
}

export default function InquiryList({ comments }: InquiryListProps) {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const { user } = useAuth();
  const currentUserId = user?.id;

  const handleDeleteComment = async (commentId: string) => {
    await deleteComment(commentId);
  };

  const handleEditComment = (commentId: string, newComment: string) => {
    setEditingCommentId(commentId);
    patchComment(commentId, { content: newComment });
  };

  const handleEditClick = (commentId: string) => {
    setEditingCommentId(commentId);
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
                    editOnClick={() => handleEditClick(item.id)}
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
        <Image src={noInquiry} alt="no inqury image" />
      )}
    </>
  );
}
