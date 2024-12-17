import axios from "./axios";

export interface Comment {
  id: number;
  content: string;
  writer: {
    id: number;
    nickname: string;
    image?: string;
  };
  updatedAt: string;
}

export async function patchComment(commentId: number, { content }: { content: string }) {
  const response = await axios.patch(`/comments/${commentId}`, { content });
  const comment = response.data;
  return comment;
}

export async function deleteComment(commentId: number) {
  await axios.delete(`/comments/${commentId}`);
}
