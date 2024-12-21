import styles from './Avatar.module.css';
import defaultAvatarImage from '../imgFile/default-avatar.svg';

// Props 타입 정의
interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  src?: string;
  alt?: string;
}

function Avatar({ className, size = 'medium', src, alt, ...props }: AvatarProps) {
  return (
    <img
      className={`${styles.Avatar} ${styles[size]} ${className}`}
      src={src || defaultAvatarImage}
      alt={alt}
      {...props}
    />
  );
}

export default Avatar;