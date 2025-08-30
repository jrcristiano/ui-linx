import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/use.auth';

interface ProtectedRouteProps {
  children: any;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticatedUser } = useAuth();
  const location = useLocation();

  if (!isAuthenticatedUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
