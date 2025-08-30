import api from "../../boot/api";
import type { Post } from "../../common/interfaces/posts/post.interface";

export function updatePost(id: number, post: Pick<Post, 'title'>) {
  return api.put(`/posts/${id}`, post);
}
