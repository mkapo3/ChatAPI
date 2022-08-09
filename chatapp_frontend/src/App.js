import logo from './logo.svg';
import './App.css';
import Chat from "./components/Chat"
import ActiveUsers from "./components/ActiveUsers"
import { useEffect, useState } from 'react';
import axios from 'axios'
import { urlMessage, urlUser } from './endpoints';

function App() {

  var responseMessages = [
    {username:"asdsda", body: "message1", currentUser: false},
    {username:"dfazxx312", body: "message2", currentUser: false},
    {username:"Muharem", body: "message3", currentUser: true},
  ]

  var responseUsers = [
    {username:"asdsda"},
    {username:"dfazxx312"},
    {username:"Muharem"},

  ]
  const [messages, setMessages] = useState([])
  const [activeUsers, setActiveUsers] = useState([])
  const [chatName, setChatName] = useState("Group Chat")
  const [currentUser, setCurrentUser] = useState("")

  const fetchData = async () => {
    const responseUser =  await fetch(urlUser + '/loginuser', {method: "GET"})
    let responseUserJSON = await responseUser.json()
    setCurrentUser(responseUserJSON.username)

    const responseMessages =  await fetch(urlMessage + '/getmessages', {method: "GET"})
    const responseMessagesJSON = await responseMessages.json()

    setMessages(responseMessagesJSON.map(message => {
    

      return {
          username: message.username,
          body: message.body,
          currentUser: message.username.localeCompare(responseUserJSON.username) === 0 ? true : false
      }
    }))
    
  }

  useEffect( () =>  {

    fetchData()
    setActiveUsers(responseUsers)
    
  },[])


  return (
    <div className="App">

      <Chat 
        username={currentUser}
        messages={messages} 
        chatName={chatName} 
        setMessages={setMessages}/>

      <ActiveUsers activeUsers={activeUsers}>

      </ActiveUsers>
      
    </div>
  );
}

export default App;
