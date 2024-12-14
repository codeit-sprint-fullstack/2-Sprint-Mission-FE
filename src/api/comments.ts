import axios from "./axios";

interface Content {
  
}


export async function patchComment(commentId: number, { content }: ) {
  const response = await axios.patch(`/comments/${commentId}`, { content });
  const comment = response.data;
  return comment;
}

export async function deleteComment(commentId) {
  await axios.delete(`/comments/${commentId}`);
}
