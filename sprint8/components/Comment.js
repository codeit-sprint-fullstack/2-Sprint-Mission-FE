import Image from 'next/image';
import profileImg from '@/public/assets/img_profile.png';

export default function Comment() {
  return (
    <div>
      <div>
        <h1>혹시 사용기간이 어떻게 되실까요?</h1>
      </div>
      <div>
        <Image src={profileImg} alt="a white panda with grey background" />
        <div>
          <p>똑똑한 판다</p>
          <p>1시간 전</p>
        </div>
      </div>
    </div>
  );
}
