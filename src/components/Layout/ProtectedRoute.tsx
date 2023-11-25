import { Navigate } from "react-router";
import { useAuthContext } from "../../contexts";
type ProtectedRouteProps = {
  children: JSX.Element,
  redirect?: string
}
function ProtectedRoute ({children, redirect="logowanie"}:ProtectedRouteProps){
  const {userInfo} = useAuthContext();
    if (!userInfo.userId) {
      return <Navigate to={'/' + redirect} replace />;
    }
    return children;
  };
  

  export default ProtectedRoute