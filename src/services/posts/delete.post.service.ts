import api from "../../boot/api";

export function deletePost(id: number) {
  return api.delete(`/posts/${id}`);
}
