import './App.css';
import Chat from "./components/Chat"
import ActiveUsers from "./components/ActiveUsers"
import { useEffect, useMemo, useState } from 'react';
import { urlMessage, urlUser } from './endpoints';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



function App() {

  const [messages, setMessages] = useState([])
  const [activeUsers, setActiveUsers] = useState([])
  const [chatName, setChatName] = useState("Group Chat")
  const [currentUser, setCurrentUser] = useState("")
  const [chats, setChats] = useState([])
  const [chatTitle, setChatTitle] = useState("Group Chat")
  const [chatId, setChatId] = useState(0)
  

  const fetchData = async () => {
    
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
    
    sessionStorage.setItem('currentUser', responseUserJSON.username)
    
  }

  const fetchActiveUsers = (responseUsers) => {
  
    if(JSON.parse(responseUsers) != null){
      const newActiveUsers = JSON.parse(responseUsers)
      
      const oldActiveUsers = sessionStorage.activeUsers ? JSON.parse(sessionStorage.activeUsers) : [] 
      
      const results = newActiveUsers.filter((user1) => !oldActiveUsers.some((user2) => user1.username == user2.username))
      if(oldActiveUsers.length!=0 && results.length != 0 && sessionStorage.currentUser!=results.at(0).username){
        toast.info(results.at(0).username + " has joined the chat.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          
      }
      sessionStorage.setItem('activeUsers', responseUsers)
      setActiveUsers(newActiveUsers)
    }
    
  }

  const fetchMessages = (responseMessage) => {
    
    setMessages(JSON.parse(responseMessage).map(message => {
      return {
          username: message.username,
          body: message.body
      }
    }))
  }
  
  const fetchChats = (responseChats, currentUser) => {
    if(JSON.parse(responseChats) != null){
      const newChats = JSON.parse(responseChats)
      const oldChats = sessionStorage.chats ? JSON.parse(sessionStorage.chats) : [] 
      
      const results = newChats.filter((chat1) => !oldChats.some(
        (chat2) => 
          chat1.recipientUser.username == chat2.recipientUser.username
          && chat1.senderUser.username == chat2.senderUser.username
        )
      )
      if(results.length != 0 && results.at(0).senderUser.username!=currentUser){
        toast.info(results.at(0).senderUser.username + " has invited you to chat.", {
          position: "top-right",
          autoClose: false,
          // hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          
      }
      sessionStorage.setItem('chats', responseChats)
      setChats(JSON.parse(responseChats))
    }
  }

  

  useMemo(() => {
    fetchData()
  }, [])

  useEffect( () =>  {

  
    let eventSourceMessages = new EventSource(urlMessage + '/messages/' + chatId)
    eventSourceMessages.onmessage = function (e) {fetchMessages (e.data)};
    
    const eventSourceUsers = new EventSource(urlUser + '/activeusers')
    eventSourceUsers.onmessage = function (e) {fetchActiveUsers(e.data)};

    const eventSourceChats = new EventSource(urlUser + '/getchats/' + sessionStorage.currentUser)
    eventSourceChats.onmessage = function (e) {fetchChats (e.data, sessionStorage.currentUser)};

    const handleTabClose = event => {
      event.preventDefault();
      fetch(urlUser + '/removefromcache/' + sessionStorage.getItem('currentUser'), {method: "DELETE", keepalive: true});  
    };
  
    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
      eventSourceUsers.close();
      eventSourceMessages.close();
      eventSourceChats.close();
    };

  },[chatId, currentUser])


  return (
    <div className="App">

    <ActiveUsers
        setChatId = {setChatId} 
        setChatTitle = {setChatTitle}
        className={"activeusers-div"}
        activeUsers={activeUsers}
        currentUser={currentUser}/>
      
      <Chat
        chatId={chatId}
        setChatId={setChatId}
        chatTitle={chatTitle}
        setChatTitle={setChatTitle}
        activeUsers={activeUsers}
        currentUser={currentUser}
        messages={messages} 
        chatName={chatName} 
        setMessages={setMessages}/> 

      

      
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
