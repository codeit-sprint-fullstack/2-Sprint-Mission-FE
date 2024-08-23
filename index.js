function updateLogo() {
    const logoLink = document.querySelector('.logo');

    // 미디어 쿼리 조건 
    if (window.matchMedia("(min-width: 375px) and (max-width: 743px)").matches) {
        // 미디어 쿼리가 적용되었을 때
        logoLink.src = "assets_panda/Property 1=Typo.png";
    } else {
        // 미디어 쿼리가 적용되지 않았을 때
        logoLink.src = "assets_panda/gnb/Group 19.png";
    }
  }

  function updateKVText() {
    const kvHeading = document.querySelector('#kv-head');

    if (window.matchMedia("(min-width: 744px) and (max-width: 1199px)").matches) {
        kvHeading.innerHTML = "일상의 모든 물건을 거래해 보세요";
    } else {
        kvHeading.innerHTML = "일상의 모든 물건을<br>거래해 보세요";
    }
  }

  // 페이지 로드 시와 창 크기 변경 시 미디어 쿼리 적용
  window.addEventListener('resize', updateLogo);
  window.addEventListener('load', updateLogo);
  window.addEventListener('resize', updateKVText);
  window.addEventListener('load', updateKVText);