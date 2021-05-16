import React, {useState, useEffect} from "react";
import {CssBaseline, createMuiTheme, ThemeProvider} from "@material-ui/core";
import {playerEnter, playerGuessed, playerData} from "./backend";
import uuid from "uuid-random";
import Header from "./Header";
import GameBox from "./GameBox";
import Footer from "./Footer";

const swal = window.swal;

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#178cce"
		},
		secondary: {
			main: "#c02e61"
		}
	}
});

function App(){
	const [user, setUser] = useState("");
	const [userId, setUserId] = useState("");
	const [quest, setQuest] = useState("");
	const [curQuest, setCurQuest] = useState("");
	const [hint, setHint] = useState("");
	const [chats, setChats] = useState([]);
	const [scores, setScores] = useState([]);
	const [leaders, setLeaders] = useState([]);

	useEffect(() => {
		swal({
			title: "Instructions",
			text: "1) You will be given a scrambled word and you have to guess what the actual word is and type it into the input box.\n\n2) You will also be given a hint along with the scrambled word.\n\n3) Once a player guesses the actual word the word changes and the player gains a point.\n\n4) You can track the scores and leaders with respective buttons.",
			button: "Understood!",
			closeOnClickOutside: false
		}).then(() => {
			swal({
				title: "Introduce yourself please!",
				text: "Write your name below: ",
				content: "input",
				button: "Set this name!",
				closeOnClickOutside: false
			}).then((name) => {
				if (name){
					playerEnter(name.slice(0, 15), uuid(), setUserId, setQuest, setHint, setChats, setScores, setLeaders);
					setUser(name)
				}
				else{
					playerEnter("UnknownPlayer", uuid(), setUserId, setQuest, setHint, setChats, setScores, setLeaders);
					setUser("UnknownPlayer");
				}
			});
		});
	}, []);

	useEffect(() => {
		function scramble(str){
		    str = str.split("");
		    for (let str2 = str.length - 1; 0 < str2; str2--){
		        let str3 = Math.floor(Math.random()*(str2 + 1));
		        let str4 = str[str2];
		        str[str2] = str[str3];
		        str[str3] = str4;
		    }
		    if ((str.join("") !== "") && (str.join("").toLowerCase() === quest.toLowerCase())){
		    	scramble(quest);
		    }
		    else{
		    	return str.join("").toUpperCase();
		    }
		}
		setCurQuest(scramble(quest));
	}, [quest]);

	function sendMessage(data){
		playerData(data, user);
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Header leaders={leaders}/>
			<GameBox userId={userId} quest={quest} curQuest={curQuest} setCurQuest={setCurQuest} guessed={() => playerGuessed(setQuest)} hint={hint} chats={chats} sendMessage={sendMessage} scores={scores}/>
			<Footer/>
		</ThemeProvider>
	);
}

export default App;