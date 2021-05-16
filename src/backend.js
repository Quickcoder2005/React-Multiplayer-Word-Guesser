import uuid from "uuid-random";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/database";

const toastify = window.toastify;

const firebaseConfig = {
	apiKey: process.env.APIKEY,
	authDomain: process.env.AUTHDOMAIN,
	databaseURL: process.env.DATABASEURL,
	projectId: process.env.PROJECTID,
	storageBucket: process.env.STORAGEBUCKET,
	messagingSenderId: process.env.MESSAGINGSENDERID,	
	appId: process.env.APPID
}
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

let playerName;
let playerId;
let playerScore = 0;

function playerEnter(player, id, setUserId, setQuest, setHint, setChats, setScores, setLeaders){
	let notOne = 0;
	let num = 0;
	playerName = player;
	playerId = id;

	db.ref("wordGuess/lastJoiner").set({
		value: 0
	});
	db.ref("wordGuess/lastJoiner").set({
		value: player
	});	
	db.ref(`wordGuess/players/${id}`).set({
		name: player,
		score: 0
	}).then(() => {
		setUserId(id);
	});
	db.ref("wordGuess/players").once("value", (s) => {
		if (s.numChildren() < 2){
			toastify({
				text: "Too less players, ask someone to join!",
		        toastBoxColor: "#c02e61",    
		        toastBoxTextColor: "white",    
		        toastBoxShadow: "none",    
		        toastBoxTextAlign: "center",    
		        toastWidth: "90vw",    
		        animationOut: "scale-up",    
		        position: "bottom left",    
		        toastCloseTimer: "2500"
		    });
		}
		else{
			toastify({
				text: `${s.numChildren()} player(s) currently joined!`,
		        toastBoxColor: "#c02e61",    
		        toastBoxTextColor: "white",    
		        toastBoxShadow: "none",    
		        toastBoxTextAlign: "center",    
		        toastWidth: "90vw",    
		        animationOut: "scale-up",    
		        position: "bottom left",    
		        toastCloseTimer: "2500"
		    });			
		}
	});
	db.ref("wordGuess/word").on("value", (s) => {
		setQuest(s.val().value);
		setHint(s.val().hint);
	});
	db.ref("wordGuess/lastGuesser").on("value", (s) => {
		let guesser;
		db.ref("wordGuess/lastGuesser").once("value", (s) => {
			guesser = s.val().value;
			if (notOne){
				toastify({
					text: `${guesser} guessed the word!`,
			        toastBoxColor: "#c02e61",    
			        toastBoxTextColor: "white",    
			        toastBoxShadow: "none",    
			        toastBoxTextAlign: "center",    
			        toastWidth: "90vw",    
			        animationOut: "scale-up",    
			        position: "bottom left",    
			        toastCloseTimer: "2500"
			    });	
			}
			else{
				++notOne;
			}
		});
	});
	db.ref("wordGuess/lastJoiner").on("value", (s) => {
		toastify({
			text: `${s.val().value} has joined the game!`,
	        toastBoxColor: "#c02e61",    
	        toastBoxTextColor: "white",    
	        toastBoxShadow: "none",    
	        toastBoxTextAlign: "center",    
	        toastWidth: "90vw",    
	        animationOut: "scale-up",    
	        position: "bottom left",    
	        toastCloseTimer: "2500"
	    });			
	});
	db.ref("wordGuess/lastLeaver").on("value", (s) => {
		if (num){
			toastify({
				text: `${s.val().value} has left the game!`,
		        toastBoxColor: "#c02e61",    
		        toastBoxTextColor: "white",    
		        toastBoxShadow: "none",    
		        toastBoxTextAlign: "center",    
		        toastWidth: "90vw",    
		        animationOut: "scale-up",    
		        position: "bottom left",    
		        toastCloseTimer: "2500"
		    });
		}
		else{
			++num;
		}		
	});
	db.ref("wordGuess/chats").orderByChild("timestamp").on("value", (s) => {
		let chats = [];
		s.forEach((v) => {
			chats.push(v.val().message);
		});
		if (s.numChildren() > 6){
			let n = 0;
			s.forEach((v) => {
				if (n === 0){
					db.ref(`wordGuess/chats/${v.key}`).remove();
				}
				++n;
			});
		}
		setChats(chats);
	});
	db.ref("wordGuess/players").on("value", (s) => {
		let playerScores = [];
		s.forEach((c) => {
			db.ref("wordGuess/leaderBoard").once("value", (s2) => {
				s2.forEach((c2) => {
					if (c.val().score > c2.val().score){
						db.ref(`wordGuess/leaderBoard/${c.key}`).set({
							name: player,
							score: playerScore
						});
					}
				});
			});
			playerScores.push({name: c.val().name, score: c.val().score, id: c.key});
		});
		setScores(playerScores);
	});
	db.ref(`wordGuess/leaderBoard`).orderByChild("score").on("value", (s) => {
		let leaderScores = [];
		s.forEach((c) => {
			leaderScores.push({name: c.val().name, score: c.val().score, id: c.key});
		});
		if (s.numChildren() > 3){
			let n = 0;
			s.forEach((v) => {
				if (n === 0){
					db.ref(`wordGuess/leaderBoard/${v.key}`).remove();
				}
				++n;
			});
		}
		setLeaders(leaderScores);
	});
	db.ref(`wordGuess/players/${id}`).onDisconnect().remove();
	db.ref("wordGuess/lastLeaver").onDisconnect().set({
		value: 0
	});
	db.ref("wordGuess/lastLeaver").onDisconnect().set({
		value: player
	});
}

function playerGuessed(setQuest){
	++playerScore;
	let val;
	db.ref(`wordGuess/players/${playerId}`).once("value", (s) => {
		val = s.val().name;
		db.ref("wordGuess/lastGuesser").set({
			value: 0
		});
		db.ref("wordGuess/lastGuesser").set({
			value: val
		});
		genWord();
	});
	db.ref(`wordGuess/players/${playerId}`).set({
		name: playerName,
		score: playerScore
	});
}

function playerData(data){
	if (data){
		db.ref(`wordGuess/chats/${uuid()}`).set({
			message: `${playerName}: ${data.slice(0, 25)}`,
			timestamp: firebase.database.ServerValue.TIMESTAMP
		});
	}
}

function genWord(){
	axios.get("https://random-word-form.herokuapp.com/random/noun").then((resa) => {
		axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${resa.data[0]}`)}`).then((resb) => {
			let data = JSON.parse(resb.data.contents);
			try {
				let def = (data[0].meanings[0] !== undefined ? data[0].meanings[0].definitions[0].definition : data[0].definitions[0].definition);
				db.ref("wordGuess/word").set({
					value: resa.data[0],
					hint: def
				});
			}
			catch(err){
				genWord();
			}
		});			
	});
}

export {playerEnter, playerGuessed, playerData};