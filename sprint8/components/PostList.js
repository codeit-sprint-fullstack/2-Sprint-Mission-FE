import Image from 'next/image';
import profileImg from '@/public/assets/img_profile.png';
import heartIcon from '@/public/assets/ic_heart.png';

export default function PostList() {
  return (
    <div>
      <div>
        <h1>맥북 16인치 16기가 11테라 정도 사양이면 어쩌고</h1>
        <Image />
      </div>
      <div>
        <div>
          <Image src={profileImg} alt="a white panda with grey background" />
          <p>총명한 판다</p>
          <p>2024. 04. 16</p>
        </div>
        <div>
          <Image src={heartIcon} alt="heart icon" />
          <p>9999+</p>
        </div>
      </div>
    </div>
  );
}
