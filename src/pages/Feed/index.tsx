import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { HttpStatusCode } from '../../common/enums/http.status.code.enum';
import type { Pagination } from '../../common/interfaces/pagination/pagination.interface';
import type { Post } from '../../common/interfaces/posts/post.interface';
import { showErrorToast } from '../../components/@Toasts/ErrorToast';
import { showSuccessToast } from '../../components/@Toasts/SuccessToast';
import EmptyFeed from '../../components/EmptyFeed';
import LoadingPosts from '../../components/LoadingPosts';
import PostCard from '../../components/PostCard';
import { getUser } from '../../services/auth/user.session.service';
import { createPost } from '../../services/posts/create.post.service';
import { getPaginatedPosts } from '../../services/posts/get.paginated.posts.service';

const POSTS_PER_PAGE = 10;

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .required('O título é obrigatório')
    .min(3, 'O título deve ter no mínimo 3 caracteres')
    .max(100, 'O título deve ter no máximo 100 caracteres'),
});

export default function FeedPage() {
  const authUser = useMemo(() => getUser(), []);

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFetchPaginatedPosts = useCallback(async (page = 1, isLoadingMore = false) => {
    try {
      if (isLoadingMore) setLoadingMore(true);
      else setLoading(true);

      const res = await getPaginatedPosts(page, POSTS_PER_PAGE);

      if (res.status !== HttpStatusCode.OK) {
        throw new Error();
      }

      const { data, pagination } = res.data as any;

      setPosts((prev: any) => isLoadingMore ? [...prev, ...data] : data);
      setPagination(pagination);
      setCurrentPage(page);
    } catch (error) {
      showErrorToast('Erro exibir posts...');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (!pagination?.hasNext || loadingMore) return;
    await handleFetchPaginatedPosts(currentPage + 1, true);
  }, [currentPage, pagination, loadingMore, handleFetchPaginatedPosts]);

  useEffect(() => {
    handleFetchPaginatedPosts(1);
  }, [handleFetchPaginatedPosts]);

  const postCards = useMemo(() => posts.map(post => (
    <MemoizedPostCard key={post.id} post={post} authUser={authUser} />
  )), [posts, authUser]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white min-h-screen">
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Feed</h1>
            <p>Olá, {authUser?.name}!</p>
          </div>
        </div>

        <div className="p-4 border-b border-gray-100">
          <button
            onClick={() => setShowCreatePost(!showCreatePost)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Novo post
          </button>
        </div>

        {showCreatePost && (
          <div className="p-4 border-b border-gray-100">
            <Formik
              initialValues={{ title: '' }}
              validationSchema={PostSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  const res = await createPost({ title: values.title });
                  if (res.status !== HttpStatusCode.Created) throw new Error();

                  showSuccessToast('Post publicado com sucesso.');
                  await handleFetchPaginatedPosts();
                  resetForm();
                  setShowCreatePost(false);
                } catch (error) {
                  showErrorToast('Erro criar novo post...');
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-2">
                  <Field
                    name="title"
                    as="textarea"
                    placeholder="Digite o título do post"
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <div className="flex gap-2 mt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      {isSubmitting ? 'Publicando...' : 'Publicar'}
                    </button>
                    <button
                      onClick={() => {
                        setShowCreatePost(false);
                      }}
                      className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                      Cancelar
                    </button>
                  </div>

                </Form>
              )}
            </Formik>
          </div>
        )}

        <div className="pb-4">
          {loading && posts.length === 0 && <LoadingPosts />}
          {!loading && posts.length === 0 && <EmptyFeed />}
          {postCards}
          {pagination?.hasNext && (
            <div className="flex justify-center p-4">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="flex items-center gap-2 py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {loadingMore ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Carregando...
                  </>
                ) : 'Carregar mais posts'}
              </button>
            </div>
          )}
          {posts.length > 0 && pagination && (
            <div className="text-center p-4 text-gray-500 text-sm">
              Mostrando {posts.length} de {pagination.total} posts
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const MemoizedPostCard = React.memo(PostCard);
