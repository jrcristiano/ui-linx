import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function DefaultLayout() {
  return (
    <div className="flex h-screen bg-white">
      <main className="flex-1 overflow-y-auto mt-4 px-4">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
}
