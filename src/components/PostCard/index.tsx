import { Formik } from 'formik';
import { Edit, MoreVertical, Trash2, User, X } from 'lucide-react';
import { useState } from 'react';
import * as Yup from 'yup';
import { HttpStatusCode } from '../../common/enums/http.status.code.enum';
import type { Post } from '../../common/interfaces/posts/post.interface';
import { deletePost } from '../../services/posts/delete.post.service';
import { updatePost } from '../../services/posts/update.post.service';
import { showErrorToast } from '../@Toasts/ErrorToast';
import { showSuccessToast } from '../@Toasts/SuccessToast';
import PostActions from '../PostActions';

interface PostCardProps {
  post: Post;
  authUser: any;
  posts: Post[];
  setPosts: (posts: Post[]) => any;
}

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .required('O título é obrigatório')
    .min(3, 'O título deve ter no mínimo 3 caracteres')
    .max(100, 'O título deve ter no máximo 100 caracteres'),
});

export default function PostCard({
  post,
  authUser,
  posts,
  setPosts,
}: PostCardProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);

  const handleEdit = () => {
    setShowDropdown(false);
    setShowEditModal(true);
    setEditedTitle(post.title);
  };

  const handleDelete = async () => {
    try {
      if (!confirm('Deseja mesmo excluir este post?')) return;

      setShowDropdown(false);
      const res = await deletePost(post.id);

      if (res.status !== HttpStatusCode.NoContent) {
        throw new Error();
      }

      showSuccessToast('Post removido com sucesso.');
      setPosts(posts.filter((p: Post) => p.id !== post.id));

    } catch (error) {
      showErrorToast('Erro ao excluir post...');
    }
  };

  const handleUpdatePost = async (values: { title: string }) => {
    try {
      await PostSchema.validate(values);

      const res = await updatePost(post.id, {
        title: values.title,
      });

      if (res.status !== HttpStatusCode.OK) {
        throw new Error();
      }

      const updatedPosts = posts.map((p: Post) =>
        p.id === post.id ? { ...p, title: values.title } : p
      );

      setPosts(updatedPosts);

      showSuccessToast('Post editado com sucesso.');
      setShowEditModal(false);
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        showErrorToast(error.message);
        return;
      }

      showErrorToast('Erro ao editar post...');
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditedTitle(post.title);
  };

  const isPostOwner = post.user.id === authUser?.id;

  return (
    <>
      <div className="border-b border-gray-100">
        <div className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900">
                  {post.user.name} {post.user.lastname}
                </h4>
                {isPostOwner && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Você
                  </span>
                )}
                <span className="text-gray-500 text-sm">
                  · {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            {isPostOwner && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <MoreVertical size={16} className="text-gray-500" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
                    <button
                      onClick={handleEdit}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Edit size={14} />
                      Editar
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mb-4">
            <p className="text-gray-900 text-base leading-relaxed">{post.title}</p>
          </div>

          <PostActions />
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Editar Post</h3>
              <button
                onClick={handleCancelEdit}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <Formik
              initialValues={{ title: editedTitle }}
              validationSchema={PostSchema}
              onSubmit={handleUpdatePost}
            >
              {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <textarea
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    placeholder="O que você está pensando?"
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                    rows={3}
                  />

                  {errors.title && touched.title && (
                    <p className="text-red-500 text-sm mb-4">{errors.title}</p>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || !values.title.trim()}
                      className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      {isSubmitting ? 'Salvando...' : 'Salvar'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      disabled={isSubmitting}
                      className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 transition-colors font-medium"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {showDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </>
  );
}
