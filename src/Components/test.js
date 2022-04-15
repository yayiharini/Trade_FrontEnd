import React from "react";

import Grid from "@mui/material/Grid";
import BasicTable from "./table";
import Tab from "./tab";
import Tabbar1 from "./Tabbar1";
import TabsWrappedLabel from "./tab";
import MyComponent from "./map";
import Box from "@mui/material/Box";

import { Link } from "react-router-dom";
import axios from "axios";
import { Autocomplete, Container } from "@mui/material";
import { Paper, ListItemText, Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";
import Mapcomp from "./mapcluster";
import { TRADE_ENDPOINT } from "../Constants";
//import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stack,
  TextField,
  Button,
  TextareaAutosize,
} from "@mui/material";
export default function Accordion1() {
  const [age, setAge] = React.useState("");
  //const [pluname, setpluname] = React.useState("");
  const [pluname, setpluname] = React.useState([]);
  const [city, setCity] = React.useState("");
  const [citycounty, setcitycounty] = React.useState([]);
  const [watershed,setwatershed]=React.useState([]);
  const [fromdate, setfromdate] = React.useState("2001-05-24");
  const [todate, settodate] = React.useState("2050-05-24");
  const [plu, setplu] = React.useState([]);
  const [isLoading, setisLoading] = React.useState(true);
  const [records, setRecords] = React.useState([]);
  const [pieChartData, setPieChartData] = React.useState({});
  const [lineChartData, setLineChartData] = React.useState({});
  const [click, setClick] = React.useState(false);
  const [text, setText] = React.useState("");
  const [permittee, setPermittee] = React.useState([]);
  const [permittenum, setPermitteenum] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);
  const [permdisabled, setPermdisabled] = React.useState(false);
  const [citydisabled, setCitydisabled] = React.useState(false);
  const [auto, setAuto] = React.useState([]);
  const [county, setCounty] = React.useState("ALL");
  const [values, setValues] = React.useState([]);
  const [display1,setdisplay1]=React.useState(false);
  const [display2,setdisplay2]=React.useState(false);
  const [requestData, setRequestData] = React.useState({});
  const [position,setPosition]= React.useState({
    lat: 38.56572251, lng: -121.4246997
});

  const handlePermitteChange = (event) => {
    //alert(event.target.value);
    setPermitteenum(event.target.value);
    setDisabled(false);
    setCitydisabled(true);
    setCounty(null);
    setValues([]);
    const val = event.target.value;
    const data = {
      permitte: val,
    };
    //alert(JSON.stringify(data));

    axios.post(TRADE_ENDPOINT + `/getplu`, { data }).then((res) => {
      console.log(res.data);
      setTimeout(function () {
        //alert('Hi')
      }, 1500);
      setplu([{ plu: "ALL" }, ...res.data]);
      setpluname(["ALL", ...res.data.map((eachPlu) => eachPlu.plu)]);
    });
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
    alert(typeof event.target.value);
    setPermdisabled(true);
  };
  const handlefromDateChange = (event) => {
    setfromdate(event.target.value);
    //alert(event.target.value);
  };
  const handleToDateChange = (event) => {
    settodate(event.target.value);
    //alert(event.target.value);
  };

  const handlePluChange = (event) => {
    const {
      target: { value },
    } = event;
    console.clear();
    console.log("------------- plu changed ---------");
    console.log(value);
    console.log(value.includes("ALL"));
    console.log(value)

    if (typeof value === "object") {
      if (value.includes("ALL")) {
        console.log("Setting all plusssssssssssssssssssssss");
        setpluname([...plu.map((eachPlu) => eachPlu.plu)]);
        console.log(pluname);
        console.log("-----------------------------------");
        return;
      }
    }

    setpluname(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    //setpluname(event.target.value);

    //alert(event.target.value);
  };
  const handleAutoChange = (event) => {
    setCounty(auto[event.target.value]);
    //alert(auto[event.target.value]);
  };

  const setvalues = (data) => {
    setRecords(data);
    console.log('data',data);
    
    setText(data);

    //settabledata(data);
  };
  const positiondata= (data) =>{
    let mapposition = {
      lat:data[0].y,
      lng:data[0].x
    }
    setPosition(mapposition);
  }
   
  const submitInputData = () => {
    const data = {
      cityname: city,
      plname: pluname,
      frdate: fromdate,
      tdate: todate,
      permitten: permittenum,
      auto: county,
    };

    setRequestData({ ...data });
    //alert(JSON.stringify(data));
    axios.post(TRADE_ENDPOINT + `/getrecord`, { data }).then((res) => {
      console.log("------------- get record -------------------");
      console.log({ data });
      console.log(res.data);
      console.log(res.data.tableData);
      setvalues(res.data.tableData);
      positiondata(res.data.tableData);
    });
    
    
    setPermdisabled(false);
    setCitydisabled(false);
  };
  
  
  const handleClick = (event) => {
    event.preventDefault();
    submitInputData();
  };
  console.log("records", records);
  console.log("position",position);
  const auto_temp = [];

  React.useEffect(() => {
    fetch(TRADE_ENDPOINT + "/")
      .then((res) => res.json())
      .then((data) => {
        setcitycounty([...data]);
        data.forEach(myFunction);
        function myFunction(item) {
          if (item.county != null) {
            auto_temp.push(item.county);
            const cityval = item.city + "(" + item.county + ")";
            auto_temp.push(cityval);
          }
          setAuto(["ALL", ...auto_temp]);
          setValues("ALL");
          submitInputData();
        }
      })
      .then(setisLoading(false));
  }, []);
  console.log(citycounty);
  console.log("auto", auto);
  const watersheds=[];
  React.useEffect(() => {
    fetch(TRADE_ENDPOINT + "/getwatershed")
      .then((res) => res.json())
      .then((data) => {
        setwatershed([...data]);
        data.forEach(myFunction);
        // Watershed_Name
        function myFunction(item) {
          if (item.Watershed_Name != null) {
            
            const shed ="HUC-"+ item.Watershed_Name ;
            auto_temp.push(shed);
          }
          setAuto(["ALL", ...auto_temp]);
        }
      })
      .then(setisLoading(false));
  }, []);

 

 console.log("watershed",watershed);

 React.useEffect(() => {
  fetch(TRADE_ENDPOINT + "/getwaterboard")
    .then((res) => res.json())
    .then((data) => {
      setwatershed([...data]);
      data.forEach(myFunction);
      // Watershed_Name
      function myFunction(item) {
        if (item.Waterboard_Name != null) {
          
          const board ="WB-"+ item.Waterboard_Name ;
          auto_temp.push(board);
        }
        setAuto(["ALL", ...auto_temp]);
      }
    })
    .then(setisLoading(false));
}, []);

console.log("watershed",watershed);
  React.useEffect(() => {
    fetch(TRADE_ENDPOINT + "/permitte")
      .then((res) => res.json())
      .then((data) => {
        setPermittee([...data]);
        setPermitteenum("ALL");
      })
      .then(setisLoading(false));
  }, []);
  
  const objectArray = Object.entries(records);

  objectArray.forEach(([key, value]) => {
    console.log(key); // 'one'
    console.log(value); // 1
  });

  const [drop, setdrop] = React.useState('');

  const handleChange = (event) => {
    setdrop(event.target.value);
    console.log("drop",event.target.value);
    const s="city/county/watershed/waterboard";
    if(event.target.value===s){
        
        setdisplay1(true);
        setdisplay2(false);
        setPermitteenum("");
        setpluname([]);
    }
    else{
        
        setdisplay1(false);
        setdisplay2(true);
        setCounty(null);
    }
  };
   
  console.log("display",display2);
  return (
    <Container maxWidth="xl">
      <Box fullWidth>
        <Typography
          variant="h4"
          component="h4"
          fontSize={20}
          fontStyle={"bold"}
        >
          Trash Rapid Assessment Data Exchange
        </Typography>
      </Box>
      <br />
      <Paper fullWidth elevation={3}>
        <Grid container spacing={2} justify="space-between" >
           <Grid item >

           </Grid>
          <Grid item md={2} xs={12}>
          <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
            <Select
                labelId="Filter by"
                id="Filter by"
                value={drop}
                label="Filter by"
                onChange={handleChange}
                sx={{ m:1}
            }
            >
            <MenuItem value={"city/county/watershed/waterboard"}>City/County/Watershed/Waterboard</MenuItem>
            <MenuItem value={"Permittee"}>Permittee</MenuItem>
            
            </Select>
          </FormControl>
          </Grid>
          {display1 && (<Grid item md={2} xs={12}>
            <FormControl>
              <Autocomplete
                id="combo-box-demo"
                disabled={citydisabled}   
                options={auto}
                value={values}
                onChange={(event, value) => {
                  setCounty(value);
                  setPermdisabled(true);
                  
                  setValues(value);
                  console.log("On Change county value");
                  console.log(value);
                }}
                
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City/County/Watershed/Waterboard"
                    variant="standard"
                    sx={{  minWidth: 230 }}
                  />
                )}
              />
            </FormControl>
          </Grid>)}
          
           {display2 && (<Grid item md={2} xs={12} >
            <FormControl
              fullWidth
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              
            >
              <InputLabel id="demo-simple-select-label">Permittee</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={permittenum}
                
                label="permitteenum"
                onChange={handlePermitteChange}
                
              >
                <MenuItem value="ALL">ALL</MenuItem>
                {permittee.map((item) => (
                  <MenuItem key={item.permittee} value={item.permittee}>
                    {item.permittee}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          )}
          
          
          

          <Grid item md={2} xs={12}>
            <Stack component="form" noValidate spacing={3}>
              <TextField
                id="date"
                label="From"
                type="date"
                value={fromdate}
                defaultValue={fromdate}
                
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handlefromDateChange}
              />
            </Stack>
          </Grid>

          <Grid item md={2} xs={12}>
            <Stack
              component="form"
              noValidate
              spacing={2}
              onChange={handleToDateChange}
            >
              <TextField
                id="date"
                label="To"
                type="date"
                value={todate}
                defaultValue={todate}
                
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleToDateChange}
              />
            </Stack>
          </Grid>
          {display2 && (<Grid item md={2} xs={12}>
            <FormControl
              fullWidth
              variant="standard"
              
            >
              <InputLabel id="demo-simple-select-label">PLU</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                multiple
                //input={<OutlinedInput label="Tag" />}
                value={pluname}
                
                label="pluname"
                renderValue={(selected) => selected.join(", ")}
                onChange={handlePluChange}
                
              >
                {plu.map((item) => (
                  <MenuItem key={item.plu} value={item.plu}>
                    <Checkbox checked={pluname.indexOf(item.plu) > -1} />
                    <ListItemText primary={item.plu} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          )}
          <Grid item md={1} xs={12}>
            <Button
              variant="outlined"
              style={{
                backgroundColor: "#008080",
                minWidth: 150
              }}
            >
              <Link
                to="/tab"
                underline="none"
                style={{ textDecoration: "none", color: "white" }}
                onClick={handleClick}
              >
                Search
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Grid>
        <br />
        <br />
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3}>
            <Tabbar1
              records={records}
              pieChartData={pieChartData}
              lineChartData={{ ...lineChartData }}
              requestData={{ ...requestData }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
        <Mapcomp records={records} position={position} />
        </Grid>
      </Grid>
    </Container>
  );
}
