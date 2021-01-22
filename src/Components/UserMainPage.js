import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const currentDate = new Date().toLocaleDateString();

const formData = {
  currentDate1: new Date(),
  id: "",
  name: "",
  title: "",
  content: "",
};
let userInfoArray = [];
const Userform = (props) => {
  const [formValues, setValues] = useState({
    currentDate1: currentDate,
    id: "",
    name: "",
    title: "",
    content: "",
  });

  const [check, setCheck] = useState(false);
  const submitData = async (e) => {
    e.preventDefault();

    if (check) {
      let id = props.editValues.id;
      let data = JSON.parse(localStorage.getItem("userInfo"));
      data[id] = formValues;
      data[id].id = id + 1;

      props.update("Asd");
      props.edit({
        currentDate1: new Date(),
        id: "",
        name: "",
        title: "",
        content: "",
      });
      await localStorage.setItem("userInfo", JSON.stringify(data));
    } else {
      let data = JSON.parse(localStorage.getItem("userInfo"));
      if (data?.length > 0) {
        userInfoArray = data;
      }

      formValues.id = userInfoArray ? userInfoArray.length + 1 : 1;
      userInfoArray.push(formValues);
      localStorage.setItem("userInfo", JSON.stringify(userInfoArray));
      setValues(formData);
      props.update("Asd");
    }
  };

  useEffect(() => {
    if (Object.keys(props.editValues).length > 0) {
      setValues((prev) => {
        return {
          ...prev,
          id: Object.keys(props.editValues).length,
          currentDate1: props.editValues.data.currentDate1,
          name: props.editValues.data.name,
          title: props.editValues.data.title,
          content: props.editValues.data.content,
        };
      });

      if (check == false) {
        setCheck(true);
      } else {
        setCheck(false);
      }
    }
  }, [props]);

  const changeValue = (e) => {
    setValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const newForm = () => {
    props.edit({
      currentDate1: new Date(),
      id: "",
      name: "",
      title: "",
      content: "",
    });
  };
  //delete method
  const deleteHandler = () => {
    const browserData = JSON.parse(localStorage.getItem("userInfo"));
    let remainData = JSON.stringify(
      browserData.filter((x) => x.id !== props.editValues.data.id)
    );
    localStorage.setItem("userInfo", remainData);
    setValues(formData);
    props.update("Asd");
    props.edit({
      currentDate1: new Date(),
      id: "",
      name: "",
      title: "",
      content: "",
    });
  };
  useEffect(() => {}, [formValues]);

  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={submitData}>
        <Grid container spacing={2}>
          <Grid item xs={8} />
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="primary"
              style={{ textAlign: "center" }}
              onClick={() => newForm()}
            >
              New
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="primary"
              style={{ textAlign: "center" }}
              type="submit"
            >
              {check ? "Edit" : "Save"}
            </Button>
          </Grid>
          <Grid item xs={1} className="buttonText">
            <Button
              variant="contained"
              color="primary"
              style={{ textAlign: "center" }}
              onClick={() => deleteHandler()}
            >
              Delete
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="standard-full-width"
              label="Created date"
              fullWidth
              placeholder={new Date().toISOString()}
              name="currentDate1"
              variant="outlined"
              style={{ margin: 8 }}
              disabled
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="standard-full-width"
              label="name "
              value={formValues.name}
              style={{ margin: 8 }}
              placeholder="Placeholder"
              onChange={changeValue}
              name="name"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="standard-full-width"
              label="title"
              value={formValues.title}
              onChange={changeValue}
              style={{ margin: 8 }}
              placeholder="Placeholder"
              name="title"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextareaAutosize
              value={formValues.content}
              rows={20}
              cols={161}
              style={{ margin: 8 }}
              onChange={changeValue}
              name="content"
              variant="outlined"
              aria-label="maximum height"
              placeholder="Maximum 4 rows"
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Userform;
