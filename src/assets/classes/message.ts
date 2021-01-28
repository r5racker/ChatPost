/*
          div class="row">
                <div class="col-2 col-sm-2 col-md-1">
                  <img class="chat-pic" src="assets/images/user1_icon.png"/>
                </div>
                <div class="col-6 col-sm-7 col-md-7">
                  <p class="receive">
                    this is Message received 
                    <br>
                    <span class="chat-time float-right">Oct 12 12:00 pm</span>
                  </p>
                </div>
              </div>

              <div class="row justify-content-end">
                
                <div class="col-6 col-sm-7 col-md-7">
                  <p class="sent float-right">
                    this is Message received 
                    <br>
                    <span class="chat-time float-right">Oct 12 12:00 pm</span>
                  </p>
                </div>
                <div class="col-2 col-sm-2 col-md-1">
                  <img class="chat-pic" src="assets/images/user1_icon.png"/>
                </div>
              </div>
  
  */


export class message {
    messageText: string
    messageTime: string
    messagePicUrl: string
    messageSent: boolean
    constructor(messageText: string, messageTime: string, messagePicUrl: string, messageSent: boolean) {
        this.messageText = messageText
        this.messageTime = messageTime
        this.messageSent = messageSent
        this.messagePicUrl = messagePicUrl
    }

    getHtml(): string {
        if (this.messageSent) {
            var msgHtml = `
            <div class="row justify-content-end">
            <div class="col-6 col-sm-7 col-md-7"><p class="sent float-right">
                `+ this.messageText + ` 
                <br>
                <span class="chat-time float-right">`+ this.messageTime + `</span>
              </p>
            </div>
            <div class="col-2 col-sm-2 col-md-1">
              <img class="chat-pic" src="`+ this.messagePicUrl + `"/>
            </div>
          </div>
            `

        } else {
            var msgHtml = `
            div class="row">
            <div class="col-2 col-sm-2 col-md-1">
              <img class="chat-pic" src="`+ this.messagePicUrl + `"/>
            </div>
            <div class="col-6 col-sm-7 col-md-7">
              <p class="receive">
                `+ this.messageText + `
                <br>
                <span class="chat-time float-right">`+ this.messageTime + `</span>
              </p>
            </div>
          </div>
            `
        }
        return msgHtml
    }
}