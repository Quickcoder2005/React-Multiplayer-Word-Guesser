import React from "react";
import Leaderboard from "./Leaderboard";
import {AppBar, Toolbar, Typography} from "@material-ui/core";

function Header(props){
	return (
		<AppBar>
			<Toolbar>
				<span style={{marginTop: "5px", marginRight: "5px", fontSize: "30px"}} className="material-icons"> spellcheck </span>
				<Typography variant="h6" color="inherit"> WordGuesser </Typography>
				<Leaderboard leaders={props.leaders}/>
			</Toolbar>
		</AppBar>
	);
}

export default Header;