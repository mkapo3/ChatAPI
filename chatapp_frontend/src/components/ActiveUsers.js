import { useState } from "react";
import ActiveUser from "./ActiveUser"

const ActiveUsers = ({activeUsers, currentUser}) =>{
    
    const [activeUser, setActiveUser] = useState();
    
    

    return(
        <div className="activeusers-div">
            <h2>Active Users</h2>
            
            {activeUsers && activeUsers.map(activeUser =>(
                <ActiveUser key={activeUser.id} activeUser={activeUser} currentUser={currentUser}/>
            ))}
        </div>
    )
}

export default ActiveUsers