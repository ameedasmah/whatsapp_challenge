
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import axios from './axios'
import Pusher from 'pusher-js';


function App() {
  
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get('/messages/sync')
      .then((response) => {
        // console.log('a', response)
        setMessages(response.data)
      })
  }, [])
  useEffect(() => {
    let pusher = new Pusher('ba0b397e412fe8de179d', {
      cluster: 'eu'
    });
    let channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMesssage) => {
      // alert(JSON.stringify(newMesssage));
      setMessages([...messages, newMesssage])
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  console.log(messages)

  return (
    <div className="app">
      {/* <h1>Lets Build a Mern Whatsapp-mern</h1> */}
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
