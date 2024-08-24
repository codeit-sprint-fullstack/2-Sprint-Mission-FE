const response = await fetch('https://learn.codeit.kr/api/menus');
const menus = await response.json();
console.log(menus);