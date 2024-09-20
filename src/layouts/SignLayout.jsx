import "./css/SignLayout.css";
import { Outlet } from "react-router-dom";

function SignLayout() {
  return (
    <div id="SignLayout">
      <Outlet />
    </div>
  );
}

export default SignLayout;
