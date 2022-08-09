import Message from "./Message"
import SendMessage from "./SendMessage"
import Header from "./Header"
import { useEffect } from "react"

const Chat = ({username, messages, setMessages, chatName}) => {

    const addMessage = (newMessage) => {
        setMessages([...messages,newMessage]);
    }

    

    return(
        <div className="chat">
            <div>
                <Header chatName={chatName}/>
            </div>
            <div className="chat-messages">
            {messages.map(message =>(
                <Message key={message.id} message={message}/>
            ))}
            </div>
            <div className="chat-input">
                <SendMessage addMessage={addMessage} username={username}/>
            </div>
        </div>
    )

}

export default Chat