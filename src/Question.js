import React from "react";
import {Typography} from "@material-ui/core";

function Question(props){ 
	return (
		<>
			<Typography style={{fontSize: "35px"}} variant="h6" color="textPrimary"> {props.curQuest} </Typography>
			<Typography style={{fontSize: "18px", marginTop: "10px"}} variant="h5" color="textPrimary"> {props.hint} </Typography>
		</>
	);
}

export default Question;