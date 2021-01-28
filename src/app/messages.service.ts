import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMessage } from '../assets/classes/IMessage'
import { IChatPreview } from 'src/assets/classes/IChatPreview';
import { Observable } from 'rxjs'
import socket from 'socket.io-client';
import { UserService } from './user.service';

const SOCKET_SERVER_URL = "http://localhost:3010"

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private clientSocket;
  private user;

  MessagesCache: IMessage[]
  Messages: IMessage[] = [{
    _id: "0",
    senderId: '0',
    receiverId: '0',
    messageText: 'none',
    messageTime: new Date()
  }]
  ChatList: IChatPreview[] = []
  MessagesBucket = {};


  private _apiURL = "http://localhost:3000/chat-api/messages/";

  constructor(private http: HttpClient, private userService: UserService) {
  }

  initSocket() {
    this.clientSocket = socket(SOCKET_SERVER_URL)
    this.clientSocket.emit("setClientId", this.userService.userId);//setClientId

    let connectionObservalble = new Observable<any>(obs => {
      this.clientSocket.on('ClientConnected', (msg) => {
        console.log(msg);
        obs.next(msg);
      });
      return (error) => {
        this.clientSocket.disconnect()
        console.log("socket Error:", error)
      }
    }).subscribe(data => { console.log("Connection success") });
    this.socketGetMessage().subscribe(msg => {
      this.addMsgToBucket(msg)
    })
  }

  getMessages(id: string): Observable<IMessage[]> {
    console.log("getting messages")
    return this.http.get<IMessage[]>(this._apiURL + "getall/" + id);
  }

  sendMessage(msg: IMessage) {
    let ackObservable
    if (this.clientSocket != null) {
      this.socketSendMessage(msg)
      ackObservable = new Observable<IMessage>(obs => {
        this.clientSocket.on('MsgReceivedAck', (msg) => {
          console.log(msg);
          obs.next(msg);
          // msg as IMessage
        });
        return (error) => {
          this.http.post(this._apiURL, msg)////////////////
          this.clientSocket.disconnect()
          console.log("socket Error:", error)
          console.log("sending using api")
        }
      })
    } else {
      ackObservable = this.http.post(this._apiURL, msg)
    }

    ackObservable.subscribe(ackMsg => {
      if (ackMsg["messages"] != null) {
        //success
        //console.log(ackMsg["messages"]);
        this.addMsgToBucket(ackMsg["messages"]);
      }
      else {
        //message failed to send
        console.log("failed to send message");
      }
    })
  }

  socketSendMessage(msg: IMessage) {
    this.clientSocket.emit("MsgClientToServer", msg)
  }

  socketGetMessage() {
    let messageObservalble = new Observable<IMessage>(obs => {
      this.clientSocket.on('MsgServerToClient', (msg) => {
        console.log("received", msg);
        obs.next(msg);
        // msg as IMessage
      });
      return (error) => {
        this.clientSocket.disconnect()
        console.log("socket Error:", error)
      }
    })
    return messageObservalble;
  }

  setUser(user) {
    this.user = user;
  }

  arrangeMessages() {
    this.MessagesCache.forEach((msg) => {
      this.userService.AllFriends.forEach((friend) => {
        if ((msg.receiverId == this.userService.userId && msg.senderId == friend.email) || (msg.senderId == this.userService.userId && msg.receiverId == friend.email))
          if (this.MessagesBucket[friend.email] == null) {
            this.MessagesBucket[friend.email] = [msg]
          }
          else {
            this.MessagesBucket[friend.email].push(msg)
          }
      })
    });
    //console.log(this.MessagesBucket)
  }
  addMsgToBucket(msg) {
    if (this.MessagesBucket["receiverId"] != null) {
      console.log(msg, this.MessagesBucket)
      if (this.MessagesBucket[msg.receiverId]) {
        this.MessagesBucket[msg.receiverId].push(msg)
      } else if (msg.receiverId) {
        this.MessagesBucket[msg.receiverId] = [msg]
      }

      this.Messages.push(msg)
    }
    else {
      this.MessagesBucket["receiverId"] = [msg]
    }
  }

}
