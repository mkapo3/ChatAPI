import "react-chat-elements/dist/main.css";
import { useState } from "react";

const SendMessage = ({addMessage, username}) => {

    const [message, setMessage] = useState({
        username: "username",
        body:"", 
        currentUser: true});

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage({body:"", currentUser: true});
        console.log(message);
        addMessage(message);
    }

    return(
        <div className="sendmessage">
            <form className="sendmessage-form" onSubmit={handleSubmit}>
                <textarea
                    placeholder="Type here"
                    onChange={(e) => setMessage({username: username, body:e.target.value, currentUser: true})}
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