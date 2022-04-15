import React, { useState, useRef } from "react";
import Popover from '@mui/material/Popover';


export default function MarkerInfo(props){
    const {info}=props;
   // alert(info.LitterAssessment);
    return(

        
            <Popover open={true}>

            <ul>
                <li>{info.LiterAsessment}</li>
                <li>{info.location}</li>
            </ul>
            </Popover>
        
    );
}