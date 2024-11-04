import CommentForm from "@/components/Comment/CommentForm";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Market() {
  const router = useRouter();
  const { id } = router.query;

  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => setNewComment(e.target.value);

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") return;
    try {
      await fetchApi(
        `/articles/${id}/comments`,
        {
          content: newComment,
        },
        "POST"
      );
      setNewComment("");
      const updatedComments = await fetchCommentData(id);
      setComment(updatedComments);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ProductDetails productId={id} />
      {/* <CommentForm */}
      {/* // newComment={newComment} */}
      {/* // onCommentChange={handleCommentChange} */}
      {/* // onCommentSubmit={handleCommentSubmit} */}
      {/* // /> */}
    </>
  );
}
