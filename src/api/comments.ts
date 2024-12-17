import axios from "./axios";

interface Content {
  content: string;
}


export async function patchComment(commentId: number, { content }: Content) {
  const response = await axios.patch(`/comments/${commentId}`, { content });
  const comment = response.data;
  return comment;
}

export async function deleteComment(commentId: number) {
  await axios.delete(`/comments/${commentId}`);
}
