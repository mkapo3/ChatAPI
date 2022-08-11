import Message from "./Message"
import SendMessage from "./SendMessage"
import Header from "./Header"
import { useEffect, useState, useRef} from "react"
import {FaBars} from 'react-icons/fa'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import ActiveUsers from "./ActiveUsers"

const Chat = ({chats, chatId, setChatId, chatTitle, setChatTitle, activeUsers, currentUser, messages}) => {
    const bottomRef = useRef(null);
    const listInnerRef = useRef();

    const [activeUsersClass, setActiveUsersClass] = useState("not-shown");
    const [keepAtBottom, setKeepAtBottom] = useState(true)

    const showActiveUsers = () => { 
        setActiveUsersClass(activeUsersClass == "activeusers-small-div" ? "not-shown" : "activeusers-small-div")
        
    }
    const onScroll = () => {
        if (listInnerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
          if (scrollTop + clientHeight === scrollHeight) {
            setKeepAtBottom(true)
          }
          else{
            setKeepAtBottom(false)
          }
        }
      };

    useEffect(() => {
        if(keepAtBottom){
            bottomRef.current?.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages])

    const showGroupChat = () => {
        setChatId(0)
        setChatTitle("Group Chat")
    }

    return(
        <div className="chat">
            <div className="chat-header">
                {chatId != 0 && <AiOutlineArrowLeft className="back-arrow" onClick={showGroupChat}/>}
                <FaBars className="fabars" onClick={showActiveUsers}/>
                <Header chatName={chatTitle}/>
                <ActiveUsers 
                    chats = {chats}
                    setChatId = {setChatId} 
                    setChatTitle = {setChatTitle}
                    className={activeUsersClass}
                    activeUsers={activeUsers}
                    currentUser={currentUser}
                />
            </div>
            <div 
                onScroll={onScroll} 
                ref={listInnerRef} 
                className="chat-messages"
            >
            {messages && messages.map(message =>(
                <Message key={message.id} message={message} currentUser={currentUser}/>
            ))}
                <div ref={bottomRef}/>
            </div>
            <div className="chat-input">
                <SendMessage 
                    chatId={chatId} 
                    currentUser={currentUser}
                />
            </div>
        </div>
    )

}

export default Chat