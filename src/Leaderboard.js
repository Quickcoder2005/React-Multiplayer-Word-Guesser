import React, {useEffect, useRef} from "react";
import {Box, Button} from "@material-ui/core";

const swal = window.swal;

function Leaderboard(props){
	const leaders = useRef(document.createElement("p"));

	useEffect(() => {
		leaders.current.innerHTML = "";
		props.leaders.slice(-3).reverse().forEach((v, i) => {
			leaders.current.innerHTML += `${++i}) ${v.name} -> ${v.score} </br>`;				
		});
	}, [props.leaders]);

	function showLead(){
		swal({
			title: "Leaderboard",
			content: leaders.current,
			button: "Thank you!",
			closeOnClickOutside: false
		});
	}

	return (
		<Box position="absolute" right={10}>
			<Button variant="contained" color="secondary" onClick={showLead}> Leaderboard </Button>
		</Box>
	);
}

export default Leaderboard;