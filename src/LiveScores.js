import React, {useEffect, useRef} from "react";
import {Box, Button} from "@material-ui/core";

const swal = window.swal;

function LiveScores(props){
	const scores = useRef(document.createElement("p"));

	useEffect(() => {
		scores.current.innerHTML = "";
		props.scores.forEach((v) => {
			if (props.userId === v.id){
				scores.current.innerHTML += `<b> ${v.name} -> ${v.score} </br></b>`;
			}
			else{
				scores.current.innerHTML += `${v.name} -> ${v.score} </br>`;				
			}
		});
		scores.current.innerHTML += `</br> ${props.scores.length} player(s) currently joined.`;
	}, [props.scores, props.userId]);


	function showScores(){
		swal({
			title: "Live Scores",
			content: scores.current,
			button: "Thank you!",
			closeOnClickOutside: false
		});
	}

	return (
		<Box marginTop={2}>
			<Button variant="contained" color="primary" onClick={showScores}> Live Scores </Button>
		</Box>
	);
}

export default LiveScores;