const topH1 = document.getElementById('topBannerTitle');
const logo = document.getElementById('pandaLogo');

if (window.innerWidth < 1200 && window.innerWidth > 743) {
  topH1.innerHTML = `
            일상의 모든 물건을 거래해 보세요
          `;
}

if (window.innerWidth < 744) {
  logo.src = 'src/Image/small_logo.png';
}

window.addEventListener('resize', (e) => {
  if (window.innerWidth < 1200 && window.innerWidth > 743) {
    topH1.innerHTML = `
        일상의 모든 물건을 거래해 보세요
      `;
  } else {
    topH1.innerHTML = `
            일상의 모든 물건을<br>
            거래해 보세요
          `;
  }

  if (window.innerWidth < 744) {
    logo.src = 'src/Image/small_logo.png';
  } else {
    logo.src = 'src/Image/logo.png';
  }
});
