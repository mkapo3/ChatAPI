

const ActiveUser = ({activeUser, currentUser}) => {
    return(
        <div className="activeuser">
            {activeUser.Username}
            {activeUser.Username.localeCompare(currentUser) === 0 ? " (You)" : ""}
        </div>
    )
}

export default ActiveUser