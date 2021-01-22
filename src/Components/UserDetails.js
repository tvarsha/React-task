import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  ul: {
    paddingBottom: "24px",
  },
}));

function Userinfo(props) {
  const [listData, setListData] = useState([]);
  let listItems = [];
  const [filterText, setFilterText] = useState("");
  const [listData2, setListData2] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const browserData = localStorage.getItem("userInfo");
    setListData(JSON.parse(browserData), listData);
  }, [props]);

  // Filter method
  const filteredItems = listData.filter(
    (x) =>
      x.name?.toLocaleLowerCase().includes(filterText) ||
      x.title?.toLocaleLowerCase().includes(filterText) ||
      x.currentDate1?.toLocaleLowerCase().includes(filterText)
  );

  let listData1 = [];
  const filterData = () => {
    const itemsToDisplay = filterText ? filteredItems : listData1;
    setListData2(itemsToDisplay, listData2);
  };

  const upData = (a, b) => {
    props.edit(a, b);
  };
  const del = (a, b) => {
    if (a.name == b) {
      delete a.name;
      filterData();
    }
    if (a.title == b) {
      delete a.title;
      filterData();
    }
    if (a.currentDate1 == b) {
      delete a.currentDate1;
      filterData();
    }
  };

  if (!listData) {
    return <h4>No data found</h4>;
  } else {
    listItems =
      listData &&
      listData.map((x, i) => {
        return (
          <li key={i} className={classes.ul}>
            <Card onClick={() => upData(x, i)} style={{ color: "blue" }}>
              <Typography>{`Name : ${x.name}`}</Typography>
              <Typography>{`Title : ${x.title}`}</Typography>
              <Typography>{`CurrentDate : ${x.currentDate1}`}</Typography>
              <Typography>{`Content : ${x.content}`}</Typography>
            </Card>
          </li>
        );
      });
  }
  return (
    <div>
      <input
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value.toLocaleLowerCase())}
      />
      <br></br>

      <select
        style={{ width: 120 }}
        onChange={(e) => setFilterText(e.target.value.toLocaleLowerCase())}
      >
        {listData.map(({ title }) => (
          <option>{title}</option>
        ))}
      </select>
      <Button
        variant="contained"
        color="primary"
        style={{
          textAlign: "center",
          borderRadius: 10,
          marginLeft: 10,
          marginTop: 10,
        }}
        onClick={() => filterData()}
      >
        Filter
      </Button>

      <div style={{ border: "2px solid", marginTop: 50 }}>
        <h4>Applied Filters:</h4>
        {!filteredItems.length && (
          <div>There are no items to display adjust your filter criteria</div>
        )}
        {listData2.map((x) => (
          <div key={x.y}>
            <p>
              Created:{x.currentDate1}
              <span onClick={() => del(x, x.currentDate1)}>[x]</span>
            </p>
            <p>
              Note For:{x.name}
              <span onClick={() => del(x, x.name)}>[x]</span>
            </p>
            <p>
              Title:{x.title}
              <span onClick={() => del(x, x.title)}>[x]</span>
            </p>
          </div>
        ))}
      </div>
      <ul
        style={{
          borderRadius: "10px",
          color: "lightblue",
          listStyleType: "none",
        }}
      >
        {listItems}
      </ul>
    </div>
  );
}
export default Userinfo;
