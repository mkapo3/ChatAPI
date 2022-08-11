import { useState } from "react";
import ActiveUser from "./ActiveUser"

const ActiveUsers = ({setChatId, setChatTitle, className, activeUsers, currentUser}) =>{
    
    const [activeUser, setActiveUser] = useState();
    
    
//activeusers-div
    return(
        <div className={className}>
            <h3>Active Users</h3>
            
            {activeUsers && activeUsers.map(activeUser =>(
                <ActiveUser
                    setChatId = {setChatId} 
                    setChatTitle = {setChatTitle}
                    key={activeUser.id} 
                    activeUser={activeUser} 
                    currentUser={currentUser}
                />
            ))}
        </div>
    )
}

export default ActiveUsers