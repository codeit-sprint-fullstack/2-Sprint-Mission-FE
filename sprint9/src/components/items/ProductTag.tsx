import style from "@/src/styles/items/ProductTag.module.css";

interface ProductTagProps {
  data: string[];
}

export default function ProductTag({ data }: ProductTagProps) {
  return data.map((item: string) => (
    <div className={style.tag} key={item}>{`#${item}`}</div>
  ));
}
