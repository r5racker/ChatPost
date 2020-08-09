(function () {
  "use strict";
  document.getElementById("bt-send").addEventListener("click", sendMessage);

  document
    .getElementById("send-message")
    .addEventListener("keypress", (event) => {
      if (event.keyCode == 13) {
        sendMessage();
      }
    });

  document
    .getElementById("search-box")
    .addEventListener("input", filterChatList);

  function sendMessage(event) {
    console.log("send");
    var message = document.getElementById("send-message");

    var new_mesage_row = document.createElement("div");
    new_mesage_row.className = "message-row you-message";
    var message_content = document.createElement("div");
    message_content.className = "message-content";
    console.log(message_content.className + " " + message.className);
    var message_text = document.createElement("div");
    message_text.className = "message-text";
    message_text.innerHTML = message.value;
    var message_time = document.createElement("div");
    message_time.className = "message-time";

    message_content.appendChild(message_text);
    message_content.appendChild(message_time);
    new_mesage_row.appendChild(message_content);
    var d = new Date();

    message_time.innerHTML =
      d.toLocaleString("default", { month: "long" }) + " " + d.getDate();
    var block = document.getElementById("chat-message-list");
    block.appendChild(new_mesage_row);
    message.value = "";
    block.scrollTop = block.scrollHeight;
  }
  function filterChatList(event) {
    var searchBox = document.getElementById("search-box");
    var chatList = document.querySelectorAll(".title-text");
    var convList = document.querySelectorAll(".conversation");
    for (var i = 0; i < chatList.length; ++i) {
      console.log(chatList[i].innerHTML.indexOf(searchBox.value));
      if (
        chatList[i].innerHTML
          .toLowerCase()
          .indexOf(searchBox.value.toLowerCase()) < 0
      ) {
        convList[i].style.display = "none";
      } else {
        convList[i].style.display = "grid";
      }
    }
  }
})();
