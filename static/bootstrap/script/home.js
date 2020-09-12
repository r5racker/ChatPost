function StartChat(id) {
  document.getElementById("chatPanel").removeAttribute("style");
  document.getElementById("startPanel").setAttribute("style", "display:none");
  document.getElementById("chatList").classList.add("d-none", "d-md-block");
}

function showChatList() {
  document.getElementById("chatList").classList.remove("d-none", "d-md-block");
  document.getElementById("startPanel").classList.add("d-none");
}

function hideChatList() {
  document.getElementById("chatList").classList.add("d-none", "d-md-block");
  document.getElementById("startPanel").classList.remove("d-none");
}