import { useState } from "react";
import ActiveUser from "./ActiveUser"

const ActiveUsers = ({activeUsers}) =>{
    
    const [activeUser, setActiveUser] = useState();
    
    return(
        <div className="activeusers-div">
            <h2>Active Users</h2>
            {activeUsers.map(activeUser =>(
                <ActiveUser key={activeUser.id} activeUser={activeUser}/>
            ))}
        </div>
    )
}

export default ActiveUsers