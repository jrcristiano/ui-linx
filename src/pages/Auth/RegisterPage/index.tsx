import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { HttpStatusCode } from '../../../common/enums/http.status.code.enum';
import { showErrorToast } from '../../../components/@Toasts/ErrorToast';
import { showSuccessToast } from '../../../components/@Toasts/SuccessToast';
import { register } from '../../../services/auth/register.service';

export default function RegisterPage() {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    lastname: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('O nome é obrigatório')
      .min(3, 'O nome deve ter pelo menos 3 caracteres'),
    lastname: Yup.string()
      .required('O sobrenome é obrigatório')
      .min(3, 'O sobrenome deve ter pelo menos 3 caracteres'),
    email: Yup.string()
      .email('E-mail inválido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(8, 'A senha deve ter pelo menos 8 caracteres'),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
       await register(values as any);
      navigate('/login');
      showSuccessToast('Usuário cadastrado com sucesso.');
    } catch (error: any) {
      if (error.response.status === HttpStatusCode.Conflict) {
        showErrorToast('O e-mail informado já está em uso.');
        return;
      }

      showErrorToast('Erro ao cadastrar usuário.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Criar conta</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <Field
                  type="text"
                  name="name"
                  placeholder="Nome"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#f09700]"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
              <div className="w-1/2">
                <Field
                  type="text"
                  name="lastname"
                  placeholder="Sobrenome"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#f09700]"
                />
                <ErrorMessage
                  name="lastname"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
            </div>

            <div>
              <Field
                type="email"
                name="email"
                placeholder="E-mail"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#f09700]"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Senha"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#f09700]"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-[#002963] text-white py-2 rounded-md hover:opacity-90"
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </Form>
        )}
      </Formik>

      <p className="text-center text-sm mt-4">
        Já tem uma conta?
        <Link
          to="/login"
          className="ms-1 text-[#002963] underline"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
