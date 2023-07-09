import { Navigate } from "react-router";
import { useAuthContext } from "../contexts";
function ProtectedRoute ({children, redirect}){
  const {userInfo} = useAuthContext();
    if (!userInfo) {
      return <Navigate to={'/' + redirect} replace />;
    }
    return children;
  };
  

  export default ProtectedRoute