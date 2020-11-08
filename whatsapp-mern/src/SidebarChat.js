import { Avatar } from '@material-ui/core';
import React from 'react';
import "./SidebarChat.css";

function SidebarChat() {
    return (
        <div className="sidebarchat">
            <Avatar />
            <div className ="sidebarChat_info">
                <h2>Room name</h2>
                <p>this is the last message</p>
            </div>
        </div>
    )
}

export default SidebarChat
