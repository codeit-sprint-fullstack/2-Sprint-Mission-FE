import axios from "./axios";

export async function patchComment(commentId: number, { content }: { content: string }) {
  const response = await axios.patch(`/comments/${commentId}`, { content });
  const comment = response.data;
  return comment;
}

export async function deleteComment(commentId: number) {
  await axios.delete(`/comments/${commentId}`);
}
