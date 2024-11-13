import Login from '@/components/Signin/Login';

export default function login() {
  return <Login />;
}

login.getLayout = function getLayout(page) {
  return page;
};
