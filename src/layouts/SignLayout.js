import { Outlet } from 'react-router-dom';
import './css/SignLayout.css';

function SignLayout() {
  return (
    <div id="SignLayout">
      <Outlet />
    </div>
  );
}

export default SignLayout;
