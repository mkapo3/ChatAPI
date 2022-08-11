
import { urlUser } from "../endpoints"


const ActiveUser = ({setChatId, setChatTitle, activeUser, currentUser}) => {
    
    const openChat = async (username) => {
        if(username != currentUser){

            let currentChat = JSON.parse(sessionStorage.chats).find(
                (chat) => chat.senderUser.username == username 
                    && chat.recipientUser.username == currentUser 
                    || chat.recipientUser.username == username
                    && chat.senderUser.username == currentUser)
            
            if (currentChat == null){

                const responseChat = await fetch(urlUser + '/startchat', {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        senderUser : {username: currentUser},
                        recipientUser : {username: username}
                    })
                });
                const responseChatJSON = await responseChat.json()
                currentChat = responseChatJSON 
            }
            setChatTitle(username + "'s chat");
            setChatId(currentChat.chatId)
        }
        
    }
    
    return(
        <div className="activeuser" onClick={() => openChat(activeUser.username)}>
            {activeUser.username}
            {activeUser.username.localeCompare(currentUser) === 0 ? " (You)" : ""}
        </div>
    )
}

export default ActiveUser