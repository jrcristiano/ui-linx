import { Link, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-gradient-to-b from-[#F09700] to-[#9c6200] items-center justify-center text-white p-10">
        <div className="max-w-md">
          <h2 className="text-4xl font-bold mb-4">Bem-vindo de volta!</h2>
          <p className="text-lg">Acesse sua conta ou crie uma nova para continuar.</p>
        </div>
      </div>
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-6 w-full">
            <Link to="/" className="text-4xl font-bold mx-auto">
              <img 
                width={180}
                src="https://www.linx.com.br/app/themes/linx/assets/crystals/static/logo.png" 
                alt="GSW" 
              />
            </Link>
          </div>
          <Outlet />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
