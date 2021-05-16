import React, {useState} from "react";
import {Button, Container, TextField} from "@material-ui/core";

const toastify = window.toastify;

function Input(props){
	const [guess, setGuess] = useState("");

	function handleSubmit(e){
		e.preventDefault();
		if (guess.toLowerCase() === props.quest.toLowerCase()){
			props.guessed();
		}
		else{
			toastify({
				text: "Not quite. Try again!",
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
		props.sendMessage(guess);
		setGuess("");
	}

	function scramble(str){
	    str = str.split("");
	    for (let str2 = str.length - 1; 0 < str2; str2--){
	        let str3 = Math.floor(Math.random()*(str2 + 1));
	        let str4 = str[str2];
	        str[str2] = str[str3];
	        str[str3] = str4;
	    }
	    if ((str.join("") !== "") && (str.join("").toLowerCase() === props.quest.toLowerCase())){
	    	scramble(props.quest);
	    }
	    else{
	    	props.setCurQuest(str.join("").toUpperCase());
	    }
	}

	return (
		<Container style={{marginTop: "20px"}}>
			<form onSubmit={handleSubmit}>
				<TextField id="standard-basic" label="Take a guess..." onChange={(e) => setGuess(e.target.value)} value={guess}/>
				<Button variant="contained" color="primary" type="submit"> Enter </Button>
			</form>
			<Button style={{marginTop: "20px"}} variant="contained" color="primary" type="button" onClick={() => scramble(props.quest)}> Scramble </Button>
		</Container>
	);
}

export default Input;