import styles from './FileInput.module.css';
import Image from 'next/image';
import x from '@/public/images/ic_X.png';
import addFile from '@/public/images/ic_plus@2x-1.png';

export default function FileInput({ onChange, imagePreviews, removeImage }) {
  return (
    <div className={styles.group}>
      <label htmlFor="images">상품 이미지</label>
      <input
        type="file"
        id="images"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={onChange}
      />
      <div className={styles[`image-container`]}>
        <div className={styles[`add-file`]}>
          <Image
            src={addFile}
            width={48}
            height={48}
            onClick={() => document.getElementById('images').click()}
            alt="파일 추가"
          />
          <p>이미지 등록</p>
        </div>
        <div className={styles[`image-previews`]}>
          {imagePreviews.map((preview, index) => (
            <div key={index} className={styles[`preview-container`]}>
              <div className={styles[`img-wrap`]}>
                <Image src={preview} alt={`상품 이미지 ${index + 1}`} fill />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className={styles[`remove-image`]}
                >
                  <Image src={x} width={20} height={20} alt="x 아이콘" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
