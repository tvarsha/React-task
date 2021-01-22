import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Userform from "./UserMainPage";
import Userinfo from "./UserDetails";

const Main = () => {
  const [value, setvalue] = useState("");
  const [data, setData] = useState({});
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();
  const update = (data) => {
    setvalue(Math.random());
  };
  const editData = (data) => {
    setvalue(Math.random());
  };
  const editForm = (data, id) => {
    setData({ data: data, id: id });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Userinfo update={update} edit={editForm} value={value} />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Userform update={update} edit={editForm} editValues={data} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
