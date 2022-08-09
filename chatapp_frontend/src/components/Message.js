

const Message = ({message}) => {
    return(
        <div className="message">
            <div className="message-user">
            {! message.currentUser ? message.username : ""}
            </div>
            <div className={
            message.currentUser ? 
            "current-user-message" : 
            "message-body"}>
            {message.body}
            </div>
        </div>
    )
}

export default Message