import Image from "next/image";
import Link from "next/link";
import profileImg from "@/public/assets/img_profile.png";
import style from "@/src/styles/items/ProductList.module.css";
import formatDate from "@/src/utils/formatDate.js";
import defaultImg from "@/public/assets/img_default.png";

interface Comment {
  id: string;
  name: string;
  writer: object;
  createdAt: string;
  nickname: string;
  favoriteCount: string;
}

interface ProductListProps {
  data: { list: Comment[] };
}

export default function ProductList({ data }: ProductListProps) {
  return (
    <div>
      {data.list.map((item) => (
        <Link key={item.id} href={`/items/${item.id}`}>
          <div className={style.container}>
            <div className={style.titleAndImage}>
              <h1 className={style.title}>{item.name}</h1>
              <Image
                src={defaultImg}
                alt={item.name}
                className={style.postImage}
              />
            </div>
            <div className={style.bottom}>
              <div className={style.bottomSection}>
                <p className={style.likes}>{item.favoriteCount}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
