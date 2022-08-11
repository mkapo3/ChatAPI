import { useState } from "react";
import { urlMessage } from "../endpoints";

const SendMessage = ({chatId, addMessage, currentUser}) => {

    const [message, setMessage] = useState({
        username: "",
        body:"", 
        currentUser: true});

    const sendMessagePOST = async (username, body) => {
        if(chatId == 0){
            const responseUser =  await fetch(urlMessage + '/sendmessage', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    body: body,
                    chatId: chatId,
                    createdData: null,
                    isDeleted: false,
                    username: username
                })
            })
        }
        else{
            await fetch(urlMessage + '/sendprivatemessage/' + chatId, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    body: body,
                    chatId: chatId,
                    createdData: null,
                    isDeleted: false,
                    username: username
                }) 
            })
        }
    }   

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessagePOST(message.username, message.body);
        setMessage({body:""})
    }

    return(
        <div className="sendmessage">
            <form className="sendmessage-form" onSubmit={handleSubmit}>
                <textarea
                    placeholder="Type here"
                    onChange={(e) => setMessage({username: currentUser, body:e.target.value})}
                    value={message.body}
                    className="sendmessage-input"
                >
                </textarea>
                <input className="sendmessage-btn" type="submit" value="Send Message"/>
            </form>
        </div>
    )
}

export default SendMessage