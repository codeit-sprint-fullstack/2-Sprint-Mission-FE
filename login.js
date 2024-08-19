function availability_id() {
  let error;
  try {
    if (id_input.value === "") {
      id_input.classList.add("fail");
      error = new TypeError("이메일을 입력해주세요.");
      throw error;
    } else if (!id_input.checkValidity()) {
      id_input.classList.add("fail");
      error = new TypeError("잘못된 이메일 형식입니다.");
      throw error;
    } else {
      id_guide.value = "";
      id_input.classList.remove("fail");
      id_input.classList.add("pass");
    }
  } catch {
    id_input.classList.remove("pass");
    id_guide.value = error.message;
    id_input.classList.add("fail");
  } finally {
    availability_button();
  }
}
function availability_pw() {
  let error;
  try {
    if (pw_input.value === "") {
      pw_input.classList.add("fail");
      error = new TypeError("비밀번호를 입력해주세요.");
      throw error;
    } else if (pw_input.value.length < 8) {
      pw_input.classList.add("fail");
      error = new TypeError("비밀번호 8자 이상 입력해주세요.");
      throw error;
    } else {
      pw_guide.value = "";
      pw_input.classList.remove("fail");
      pw_input.classList.add("pass");
    }
  } catch {
    pw_input.classList.remove("pass");
    pw_guide.value = error.message;
    pw_input.classList.add("fail");
  } finally {
    availability_button();
  }
}
function availability_button() {
  if (
    id_input.classList.contains("pass") &&
    pw_input.classList.contains("pass")
  ) {
    login_button.classList.remove("deactivate");
  } else {
    login_button.classList.add("deactivate");
  }
}
function click_button() {
  const input_data = {
    //입력한 로그인 정보
    id: id_input.value,
    password: pw_input.value,
  };
  const match_data = user_data.find((user) => user.id === input_data.id); //id 일치하는 데이터 확인
  if (match_data) {
    if (match_data.password === input_data.password) {
      alert("로그인 성공");
      window.location.href = "/items.html";
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  } else {
    alert("등록된 정보가 없습니다.");
  }
}
const id_input = document.querySelector("#username");
const id_guide = document.querySelector("#id-guide");
const pw_toggle = document.getElementById("watch-toggle");
const pw_input = document.getElementById("password");
const pw_guide = document.querySelector("#pw-guide");
const login_button = document.querySelector("#login-button");
pw_toggle.addEventListener("click", function () {
  if (pw_input.getAttribute("type") === "password") {
    pw_input.setAttribute("type", "text");
    pw_toggle.setAttribute("src", "image/btn_visibility_on_24px.svg");
  } else {
    pw_input.setAttribute("type", "password");
    pw_toggle.setAttribute("src", "image/btn_visibility_off_24px.svg");
  }
  this.classList.toggle("show-password");
});
const user_data = [
  {
    id: "gggm0117@naver.com",
    nick_name: "햇살",
    password: "1q2w3e4r!",
  },
];
id_input.addEventListener("focusout", availability_id);
pw_input.addEventListener("focusout", availability_pw);
login_button.addEventListener("click", click_button);
