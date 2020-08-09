(function () {
  "use strict";
  document.getElementById("uid").addEventListener("input", validateUid);
  function validateUid(event) {
    let uid_value = document.getElementById("uid").value;
    console.log(uid_value);
  }

  document.getElementById("login").addEventListener("submit", validateForm);
  function validateForm(event) {
    event.preventDefault();
    console.log("submitting");
    let uid = document.getElementById("uid");
    console.log(uid.value);
    if (!isValidUid(uid.value)) {
      window.alert("Uid is Invalid");
      uid.focus();
    } else {
      let password = document.getElementById("password");
      if (!isValidPassword(password.value)) {
        window.alert("Please enter password properly");
        password.focus();
      } else {
        //Lets submit the login
        //document.forms[0].submit();
        window.location = "Home.html";
      }
    }
  }

  function isValidUid(str) {
    if (str == "") {
      return false;
    } else {
      return true;
    }
  }

  function isValidPassword(str) {
    if (str == "") {
      return false;
    } else {
      return true;
    }
  }
})();
