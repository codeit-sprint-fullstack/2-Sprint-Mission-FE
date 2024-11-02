import Login from '@/components/Login';

export default function login() {
  return <Login />;
}

login.getLayout = function getLayout(page) {
  return page;
};
