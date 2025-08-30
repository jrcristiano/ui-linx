import api from "../../boot/api";
import type { Post } from "../../common/interfaces/posts/post.interface";

export function createPost(post: Pick<Post, 'title'>) {
  return api.post('/posts', post);
}
