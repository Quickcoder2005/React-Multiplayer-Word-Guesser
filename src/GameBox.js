import React from "react";
import Question from "./Question";
import ChatBox from "./ChatBox";
import Input from "./Input";
import LiveScores from "./LiveScores";
import {Container} from "@material-ui/core";

function GameBox(props){
	return (
		<Container style={{marginTop: "75px"}}>
			<center>
				<Question curQuest={props.curQuest} hint={props.hint}/>
				<ChatBox chats={props.chats}/>
				<Input quest={props.quest} setCurQuest={props.setCurQuest} guessed={props.guessed} sendMessage={props.sendMessage}/>
				<LiveScores userId={props.userId} scores={props.scores}/>
			</center>
		</Container>
	);
}

export default GameBox;