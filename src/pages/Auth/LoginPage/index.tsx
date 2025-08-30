import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { showErrorToast } from '../../../components/@Toasts/ErrorToast';
import { login } from '../../../services/auth/login.service';
import { setToken } from '../../../services/auth/token.service';
import { setUser } from '../../../services/auth/user.session.service';

export default function LoginPage() {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('E-mail inválido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(8, 'Senha deve conter pelo menos 8 caracteres'),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const res: any = await login(values);

      setToken(res.data.access_token);
      setUser(res.data.user);

      navigate('/');
    } catch (error: any) {
      showErrorToast(error.response.data.message);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Entrar</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
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
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </Form>
        )}
      </Formik>

      <p className="text-center text-sm mt-4">
        Não tem uma conta?
        <Link to="/register" className="ms-1 text-[#002963] underline">
          Cadastre-se
        </Link>
      </p>
    </>
  );
}
