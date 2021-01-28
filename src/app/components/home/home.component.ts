import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js'
import { MessagesService } from 'src/app/messages.service';
import { UserService } from 'src/app/user.service';
import { IMessage } from 'src/assets/classes/IMessage';
import { IUser } from 'src/assets/classes/IUser';

import { AuthenticationService } from './../../authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  MessageTextBox: string = ""; //input
  constructor(
    public messagesService: MessagesService,
    public userService: UserService,
    private authService: AuthenticationService) {

  }

  ngOnInit(): void {

    this.userService.userId = JSON.parse(localStorage.getItem("user")).email;
    this.userService.getFriends(this.userService.userId).subscribe(data => {
      this.userService.AllFriends = data;

      //console.log(data);
      this.userService.AllFriends.forEach((friend) => {
        if (friend.email == this.userService.userId) {
          this.userService.currentUserInfo = friend
        }
        else {
          this.messagesService.ChatList.push({ id: friend.email, name: friend.FName, lastMessage: "", imgUrl: friend.imageUrl, newArrival: false })
        }
      })
    });
    this.messagesService.getMessages(this.userService.userId)
      .subscribe(data => {
        //console.log(data)
        this.messagesService.MessagesCache = data;
        this.messagesService.arrangeMessages();
      });
    this.messagesService.initSocket();
  }

  loadChat(id: string) {
    /*Remaining */
    this.messagesService.Messages = []
    this.messagesService.MessagesCache.forEach((msg) => {
      if ((msg.receiverId == this.userService.userId && msg.senderId == this.userService.DestinationId) || (msg.senderId == this.userService.userId && msg.receiverId == this.userService.DestinationId)) {
        this.messagesService.Messages.push(msg)
        //console.log(msg)
      }
    })
    this.userService.AllFriends.forEach((usr) => {
      if (usr.email == this.userService.DestinationId) {
        this.userService.DestinationInfo = usr
        console.log("chatting with", usr)
      }
    })
  }

  StartChat(id) {
    if (this.userService.DestinationId == '0') {
      document.getElementById("chatPanel").removeAttribute("style");
      document.getElementById("startPanel").setAttribute("style", "display:none");
      document.getElementById("chatList").classList.add("d-none", "d-md-block");
    }
    if (id != this.userService.DestinationId) {
      this.userService.DestinationId = id
      this.loadChat(id)
    }
  }

  showChatList() {
    document.getElementById("chatList").classList.remove("d-none", "d-md-block");
    document.getElementById("startPanel").classList.add("d-none");
  }

  hideChatList() {
    document.getElementById("chatList").classList.add("d-none", "d-md-block");
    document.getElementById("startPanel").classList.remove("d-none");
  }


  sendMessage(event) {
    var msg = { senderId: this.userService.userId, receiverId: this.userService.DestinationId, messageText: this.MessageTextBox, messageTime: new Date() };
    console.log("sending", msg);
    this.messagesService.sendMessage(msg as IMessage);
    this.MessageTextBox = ""
    var block = $("#chat-message-list")
    block.scrollTop = block.scrollHeight;
  }
  filterChatList() {
    var searchBox = $("#search-box");
    var chatList = $(".contact-name");
    var convList = $(".conversation");
    for (var i = 0; i < convList.length; ++i) {
      console.log(chatList[i].innerHTML.indexOf(searchBox.val()));
      if (
        chatList[i].innerHTML
          .toLowerCase()
          .indexOf(searchBox.val().toLowerCase()) < 0
      ) {
        convList[i].style.display = "none";

      } else {
        convList[i].style.display = "grid";
      }
    }
  }
  logout() {
    this.authService.logout();
  }
}
