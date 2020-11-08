import { Avatar, IconButton } from '@material-ui/core';
import React from 'react';
import "./Chat.css";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

function Chat({messages}) {
    {console.log('a',messages)}
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3> Room name</h3>
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
            {messages.map((message)=>{
                return(
                   <p 
                   className={`chat__message ${message.received && "chat__reciver"}`}>
                   <span className="chat__name">{message.name}</span>
                   {message.message}
            <span className="chat__timestamp">{message.timetamp}</span>
               </p>)
            })}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input placeholder="Type a message" type="text" />
                    <button type="submit">send a message</button>
                </form>
                <MicIcon />
                
            </div>
        </div>

    )
}

export default Chat
