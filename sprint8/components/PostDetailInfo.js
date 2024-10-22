export default function PostDetail() {
  return (
    <div>
      <div className={style.container}>
        <div className={style.titleAndImage}>
          <h1 className={style.title}>
            맥북 16인치 16기가 11테라 정도 사양이면 어쩌고
          </h1>
          <Image className={style.postImage} />
        </div>
        <div className={style.bottom}>
          <div className={style.bottomSection}>
            <Image src={profileImg} alt="a white panda with grey background" />
            <div>
              <p className={style.nickname}>총명한 판다</p>
              <p className={style.date}>2024. 04. 16</p>
            </div>
          </div>
          <div className={style.bottomSection}>
            <Image src={heartIcon} alt="heart icon" />
            <p className={style.likes}>9999+</p>
          </div>
        </div>
      </div>
    </div>
  );
}
