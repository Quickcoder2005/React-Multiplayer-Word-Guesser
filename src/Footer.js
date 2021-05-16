import React from "react";
import {Box, Typography} from "@material-ui/core";

function Footer(){
	return (
		<Box marginTop={2.5}>
			<Typography style={{fontSize: "17px"}} variant="h6" color="textSecondary" align="center"><span style={{fontSize: "23px"}} className="material-icons"> copyright </span> 2021 QuickCoder. All Rights Reserved. </Typography>
		</Box>
	);
}

export default Footer;