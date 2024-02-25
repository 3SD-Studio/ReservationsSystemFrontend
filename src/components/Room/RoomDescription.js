import React from "react";

import "./RoomDescription.css";

export function RoomDescription(props) {
    let room = props['children']
    return (
        <div className="descritpionDiv">
            <h3 className="descriptionHeader">Description</h3>
            <hr></hr>
            <p>{room['description']}</p>
            <hr></hr>
            <p>Capacity: {room['capacity']}</p>
            <p>Air conditioning {symbol(room['conditioning'])}</p>
            <p>Wi-Fi {symbol(room['wifi'])}</p>
            <p>Ethernet {symbol(room['ethernet'])}</p>
            <p>Projector  {symbol(room['projector'])}</p>
            <p>TV {symbol(room['tv'])}</p>
            <p>Whiteboard {symbol(room['whiteboard'])}</p>
        </div>
    )
}

const symbol = (bool) => {
    if (bool) {
        return <b className="green">&#x2713;</b>
    } else {
        return <b className="red">&#x2717;</b>
    }
} 