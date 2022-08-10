import './App.css';
import Chat from "./components/Chat"
import ActiveUsers from "./components/ActiveUsers"
import { useEffect, useState } from 'react';
import { urlMessage, urlUser } from './endpoints';
import ReactJsAlert from "reactjs-alert"
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';




function App() {

  const [messages, setMessages] = useState([])
  const [activeUsers, setActiveUsers] = useState([])
  const [chatName, setChatName] = useState("Group Chat")
  const [currentUser, setCurrentUser] = useState("")
  

  const fetchData = async () => {
    
    console.log(sessionStorage.currentUser)
    const responseUser =  await fetch(urlUser + '/loginuser', {
      method: "POST",
      headers:{'Content-type':'application/json'},
      body: JSON.stringify ({
          username: sessionStorage.currentUser
        }
      )
    })
    const responseUserJSON = await responseUser.json()
    setCurrentUser(responseUserJSON.username)
    console.log(responseUserJSON.username)
    sessionStorage.setItem('currentUser', responseUserJSON.username)

    
    // const responseMessages =  await fetch(urlMessage + '/getmessages', {method: "GET"})
    // const responseMessagesJSON = await responseMessages.json()
  }

  const fetchActiveUsers = (message) => {
    //const responseActiveUsers = await fetch(urlUser + '/activeusers', {method: "GET"})
    //const responseActiveUsersJSON = await responseActiveUsers.json()
    const newActiveUsers = JSON.parse(message)
    const oldActiveUsers = sessionStorage.activeUsers ? JSON.parse(sessionStorage.activeUsers) : [] 
    
    const results = newActiveUsers.filter((user1) => !oldActiveUsers.some((user2) => user1.Username == user2.Username))
    if(oldActiveUsers.length!=0 && results.length != 0){
      toast.info(results.at(0).Username + " has joined the chat.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        
    }
    sessionStorage.setItem('activeUsers', message)
    setActiveUsers(newActiveUsers)
    
  }

  const fetchMessages = (responseMessage, username) => {
    
    setMessages(JSON.parse(responseMessage).map(message => {
      return {
          username: message.Username,
          body: message.Body,
          currentUser: message.Username.localeCompare(username) === 0 ? true : false
      }
    }))
  }
  

  // const handleTabClose = async (event) => {
    
  //   return await fetch(urlUser + '/removefromcache/' + currentUser, {method: "DELETE", keepalive: true});
  // };


  useEffect( () =>  {

    
      
    fetchData()

    

    setCurrentUser(sessionStorage.getItem('currentUser'))

    const eventSourceUsers = new EventSource(urlUser + '/activeusers')
    eventSourceUsers.onmessage = function (e) {fetchActiveUsers(e.data)};
    
    const eventSourceMessages = new EventSource(urlMessage + '/messages')
    eventSourceMessages.onmessage = function (e) {fetchMessages (e.data, currentUser)};
    
    //addEventListener('beforeunload', handleTabClose);

    const handleTabClose = event => {
      event.preventDefault();

      console.log(sessionStorage.getItem('currentUser'))

      fetch(urlUser + '/removefromcache/' + sessionStorage.getItem('currentUser'), {method: "DELETE", keepalive: true});  

      //sessionStorage.removeItem('currentUser')

    };
  
    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
      eventSourceUsers.close();
      eventSourceMessages.close();
    };

  },[])


  return (
    <div className="App">

      <Chat 
        currentUser={currentUser}
        messages={messages} 
        chatName={chatName} 
        setMessages={setMessages}/> 

      <ActiveUsers 
        activeUsers={activeUsers}
        currentUser={currentUser}/>
      
      <ToastContainer
        position="top-right"
        autoClose={50}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        {/* Same as */}
      <ToastContainer />

    </div>
  );
}

export default App;
