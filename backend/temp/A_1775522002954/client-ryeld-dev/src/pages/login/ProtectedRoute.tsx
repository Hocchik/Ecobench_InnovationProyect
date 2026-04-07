import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: string;
}

const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user || !user.userId) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to={user.roleRoute} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;