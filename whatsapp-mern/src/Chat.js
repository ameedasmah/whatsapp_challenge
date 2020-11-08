import { Avatar, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import "./Chat.css";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from 'axios';
import SelectInput from '@material-ui/core/Select/SelectInput';

function Chat({messages}) {

    const[input,setInpit]=useState("");
    const sendMessage = async(e)=>{
        e.preventDefault();

        await axios.post('http://127.0.0.1:9000/messages/new',{
            message : input,
            name: "Ameed",
            timetamp : "just now!",
            received : false,

        });
        setInpit("");
    }
    // {console.log('a',messages)}
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src="https://ca.slack-edge.com/TTVPM20S0-U01BJSLTV5K-54889184147f-512" />
                <div className="chat__headerInfo">
                    <h3> MOmoStackOverFlow</h3>
                    <p>Last seen at ...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton >
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
            {messages.map((message,i)=>{
                return(
                   <p key={i}
                   className={`chat__message ${message.received && "chat__reciver"}`}>
                   <span className="chat__name" >{message.name }</span>
                   {message.message}
            <span className="chat__timestamp">{message.timetamp}</span>
               </p>)
            })}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e=>setInpit(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick ={sendMessage} type="submit">send a message</button>
                </form>
                <MicIcon />
                
            </div>
        </div>

    )
}

export default Chat
