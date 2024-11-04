import Signup from '@/components/Signup';

export default function signup() {
  return <Signup />;
}

signup.getLayout = function getLayout(page) {
  return page;
};
