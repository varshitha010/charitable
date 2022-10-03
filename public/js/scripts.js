const submitForm = () => {
  let formData = {};
  let error = false;
  formData.userName = $("#userName").val();
  formData.email = $("#email").val();
  formData.password = $("#password").val();
  if (!formData.userName) {
    document.getElementById("userName").classList.remove("valid");
    document.getElementById("userName").classList.add("invalid");
    error = true;
  }
  if (!formData.email) {
    document.getElementById("email").classList.remove("valid");
    document.getElementById("email").classList.add("invalid");
    error = true;
  }
  if (!formData.password) {
    document.getElementById("password").classList.remove("valid");
    document.getElementById("password").classList.add("invalid");
    error = true;
  }
  if (!error) {
    const button = document.getElementById("signInFormSubmit");
    button.innerHTML = "Creating user, please wait ....";
    button.setAttribute("disabled", "");
    $.post("/api/user/signup", formData, (response) => {
      if (response.message !== "Successful") {
        button.removeAttribute("disabled");
        button.innerHTML = "SingUp";
        alert(response.message);
      } else {
        button.removeAttribute("disabled");
        button.innerHTML = "SingUp";
        window.location.href = "/about-us.html";
        $("#userName").val("");
        $("#email").val("");
        $("#password").val("");
      }
    });
  }
};

const logInSubmitForm = () => {
  let formData = {};
  let error = false;
  formData.email = $("#emailId").val();
  formData.password = $("#pass").val();

  if (!formData.email) {
    document.getElementById("emailId").classList.remove("valid");
    document.getElementById("emailId").classList.add("invalid");
    error = true;
  }
  if (!formData.password) {
    document.getElementById("pass").classList.remove("valid");
    document.getElementById("pass").classList.add("invalid");
    error = true;
  }
  if (!error) {
    const button = document.getElementById("logInFormSubmit");
    button.setAttribute("disabled", "");
    button.innerHTML = "Logging you in, please wait ....";
    $.post("/api/user/login", formData, (response) => {
      if (response.message !== "Successful") {
        button.removeAttribute("disabled");
        button.innerHTML = "LogIn";
        alert(response.message);
      } else {
        button.removeAttribute("disabled");
        button.innerHTML = "LogIn";
        window.location.href = "/about-us.html";
        $("#emailId").val("");
        $("#pass").val("");
      }
    });
  }
};

$(document).ready(function () {
  $(".materialboxed").materialbox();
  $(".tooltipped").tooltip();
  $("#signInFormSubmit").click(() => {
    submitForm();
  });
  $("#logInFormSubmit").click(() => {
    logInSubmitForm();
  });
  $("select[required]").css({
    display: "inline",
    height: 0,
    padding: 0,
    width: 0,
  });
  $(".message a").click(function () {
    $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
  });
  $(".dropdown-trigger").dropdown();
  $("#logout").click(() => {
    window.location.href = "/";
  });
});
