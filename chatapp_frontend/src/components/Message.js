

const Message = ({message, currentUser}) => {
    return(
        <div className="message">
            <div className="message-user">
            { message.username.localeCompare(currentUser) != 0 ? message.username : ""}
            </div>
            <div className={
            message.username.localeCompare(currentUser) === 0 ? 
            "current-user-message" : 
            "message-body"}>
            {message.body}
            </div>
        </div>
    )
}

export default Message