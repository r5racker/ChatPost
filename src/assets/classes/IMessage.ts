export interface IMessage {
    _id: string
    senderId: string
    receiverId: string
    messageText: string
    messageTime: Date
}