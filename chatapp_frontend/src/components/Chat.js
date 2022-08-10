import Message from "./Message"
import SendMessage from "./SendMessage"
import Header from "./Header"
import { useEffect } from "react"

const Chat = ({currentUser, messages, setMessages, chatName}) => {

    const addMessage = (newMessage) => {
        setMessages([...messages,newMessage]);
    }

    

    return(
        <div className="chat">
            <div>
                <Header chatName={chatName}/>
            </div>
            <div className="chat-messages">
            {messages && messages.map(message =>(
                <Message key={message.id} message={message} currentUser={currentUser}/>
            ))}
            </div>
            <div className="chat-input">
                <SendMessage addMessage={addMessage} currentUser={currentUser}/>
            </div>
        </div>
    )

}

export default Chat