
import api from "../../boot/api";

export function getPaginatedPosts(page = 1, perPage = 1) {
  return api.get('/posts', {
    params: {
      page,
      perPage
    }
  });
}
