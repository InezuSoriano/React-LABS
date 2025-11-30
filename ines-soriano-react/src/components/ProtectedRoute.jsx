import {
  Navigate,
  Outlet,
  useLocation,
  useOutletContext,
} from "react-router-dom";

function ProtectedRoute() {
  const parentContext = useOutletContext();
  const location = useLocation();

  if (!parentContext?.user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet context={parentContext} />;
}

export default ProtectedRoute;