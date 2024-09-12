import React from "react";
import hotItem from "../assets/img_hot_item.png";
import search from "../assets/img_search.png";
import register from "../assets/img_register.png";

export default function Section() {
  const section = [
    {
      img: hotItem,
      alt: "Pandas watching products",
      blueTag: "Hot-item",
      title: "인기 상품을<br>확인해 보세요",
      description: " 가장 HOT한 중고거래 물품을<br>판다 마켓에서 확인해 보세요",
    },
    {
      img: search,
      alt: "A magnifier showing a square with a question mark",
      blueTag: "Search",
      title: "구매를 원하는<br>상품을 검색하세요",
      description: "구매하고 싶은 물품은 검색해서<br>쉽게 찾아보세요",
    },
    {
      img: register,
      alt: "Folders are at the bottom, and product icons are at the top",
      blueTag: "Register",
      title: "판매를 원하는<br>상품을 등록하세요",
      description: "어떤 물건이든 판매하고 싶은 상품을<br>쉽게 등록하세요",
    },
  ];
  return (
    <>
      {section.map((items) => (
        <section key={items.blueTag}>
          <img src={items.img} alt={items.alt} />
          <p>{items.blueTag}</p>
          <h1>
            {items.title.split("<br>").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index !== items.title.split("<br>").length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <h3>
            {items.description.split("<br>").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index !== items.description.split("<br>").length - 1 && <br />}
              </React.Fragment>
            ))}
          </h3>
        </section>
      ))}
    </>
  );
}
