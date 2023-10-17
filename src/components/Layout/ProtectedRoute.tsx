import { Navigate } from "react-router";
import { useAuthContext } from "../../contexts";
type ProtectedRouteProps = {
  children: JSX.Element,
  redirect: string
}
function ProtectedRoute ({children, redirect}:ProtectedRouteProps){
  const {userInfo} = useAuthContext();
    if (!userInfo) {
      return <Navigate to={'/' + redirect} replace />;
    }
    return children;
  };
  

  export default ProtectedRoute