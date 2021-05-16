import React from "react";
import {Card, Typography} from "@material-ui/core";

function ChatBox(props){
	const arr = props.chats;
	const chatList = arr.slice(-6).map((v, i) => {
		return <Typography style={{fontSize: "16px", marginBottom: "5px"}} variant="h5" color="textPrimary" key={i}> {v} </Typography>
	});

	return (
		<Card style={{marginTop: "20px", paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px", paddingBottom: "10px"}}>
			<Typography style={{marginBottom: "5px"}} variant="h6" color="textPrimary"> Messages </Typography>
			{chatList} 
		</Card>
	);
}

export default ChatBox;