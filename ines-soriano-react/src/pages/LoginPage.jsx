import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import UserForm from "../components/UserForm/UserForm.jsx";

function LoginPage() {
  const outlet = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const user = outlet?.user ?? null;
  const onLogin = typeof outlet?.onLogin === "function" ? outlet.onLogin : null;
  const onLogout = typeof outlet?.onLogout === "function" ? outlet.onLogout : null;

  const handleLogin = (formUser) => {
    if (!onLogin) {
      console.error("onLogin NO está llegando por OutletContext. Revisa App.jsx -> <Outlet context={...} />");
      return;
    }
    onLogin(formUser);
    navigate(from, { replace: true });
  };

  const handleLogoutClick = () => {
    if (!onLogout) {
      console.error("onLogout NO está llegando por OutletContext. Revisa App.jsx -> <Outlet context={...} />");
      return;
    }
    onLogout();
    navigate("/", { replace: true });
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <UserForm user={user} onLogin={handleLogin} onLogout={handleLogoutClick} />
    </div>
  );
}

export default LoginPage;