import { Navigate } from "react-router";
function ProtectedRoute ({children, user, redirect}){
    if (!user) {
      return <Navigate to={'/' + redirect} replace />;
    }
    return children;
  };
  

  export default ProtectedRoute