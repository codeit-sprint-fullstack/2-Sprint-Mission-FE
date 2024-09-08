import test from "./test.js";
const index = {
  page: 1,
  pageSize: 4,
};
// const {list, totalCount} = await test(index);
// console.log(list);
// for (let i = 0; i < 5; i++) {
//     const { list, totalCount } = await test(index);
//     console.log(list);
//     console.log(`totalCount=: ${totalCount}`);
//     index.page += 1;
// }
const { list, totalCount } = await test(index);
console.log(list);
