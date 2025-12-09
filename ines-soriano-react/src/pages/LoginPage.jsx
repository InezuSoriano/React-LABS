import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import UserForm from "../components/UserForm/UserForm.jsx";

function LoginPage() {
  const { user, onLogin, onLogout } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (formUser) => {
    onLogin(formUser);
    navigate(from, { replace: true });
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate("/", { replace: true });
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <UserForm
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogoutClick}
      />
    </div>
  );
}

export default LoginPage;