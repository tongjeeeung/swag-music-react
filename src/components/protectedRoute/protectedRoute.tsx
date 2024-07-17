import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../services/store";
import { getUser } from "../../services/userSlice";

export interface IProtectedRoute {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
}

export const ProtectedRoute = ({ onlyUnAuth, children }: IProtectedRoute) => {
  const location = useLocation();
  const user = useSelector(getUser);

  if (!onlyUnAuth && !user) {
    return <Navigate to='/registration' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/home' };
    return <Navigate replace to={from} />;
  }

  return children;
};