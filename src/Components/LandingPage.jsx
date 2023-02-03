import React, { useEffect, useState } from "react";
import "../App.css";
const file = require("../Data/file.txt");
function LandingPage() {
  const [data, setData] = useState([]);
  const [cate, setCate] = useState([]);
  const [select1, setSelect1] = useState("");
  const [sub, setSub] = useState([]);
  const [str, setStr] = useState([]);
  useEffect(() => {
    fetch(file)
      .then((res) => res.text())
      .then((val) => {
        setData(val.split("\n"));
        let temp = [];
        val.split("\n").map((ele) => {
          if (ele.includes(">") === false && ele !== "") {
            temp.push(ele);
          }
        });
        setCate(temp);
      });
  }, [sub, str]);
  const mainSelectHandler = (e) => {
    let tempSelect = [];
    console.log(data);
    setSelect1(e.target.value);
    let unique = makeDropDown(e.target.value);
    setSub(unique);
    tempSelect.push(
      <select
        onChange={subSelectHandler}
        className="form-select"
        aria-label="Default select example"
      >
        <option>--Select--</option>
        {unique.map((val, index) => (
          <option key={index} value={val}>
            {val}
          </option>
        ))}
      </select>
    );
    setStr([...str, tempSelect]);
  };
  const subSelectHandler = (e) => {
    console.log(e.target.value);
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].includes(e.target.value) === true) {
        temp.push(data[i]);
      }
    }
    let filter = [];
    temp.map((val) => {
      val.split(" > ").map((item) => {
        filter.push(item);
      });
    });
    let final = [];
    for (let i = 0; i < filter.length; i++) {
      if (filter[i] === e.target.value && filter[i + 1] !== "") {
        final.push(filter[i + 1]);
      }
    }
    let unique = [...new Set(final)];
    let tempSelect = [];
    tempSelect.push(
      <select
        // onChange={subSelectHandler}
        className="form-select"
        aria-label="Default select example"
      >
        <option>--Select--</option>
        {unique.map((val, index) => (
          <option key={index} value={val}>
            {val}
          </option>
        ))}
      </select>
    );
    setStr([...str, tempSelect]);
    console.log("SUB", unique);
  };
  function makeDropDown(para) {
    let temp = [];
    data.map((val) => {
      if (val.startsWith(`${para} >`) === true) {
        temp.push(val);
      }
    });
    let filter = [];
    temp.map((val) => {
      val.split(" > ").map((item) => {
        filter.push(item);
      });
    });
    let final = [];
    for (let i = 0; i < filter.length; i++) {
      if (filter[i] === para && filter[i + 1] !== "") {
        final.push(filter[i + 1]);
      }
    }
    let unique = [...new Set(final)];
    return unique;
  }
  return (
    <div>
      <center>
        <h1>Google Taxonomy</h1>
        <div style={{ width: "50%" }}>
          <select
            onChange={mainSelectHandler}
            className="form-select"
            aria-label="Default select example"
          >
            <option>--Select--</option>
            {cate.map((val, index) => (
              <option key={index} value={val}>
                {val}
              </option>
            ))}
          </select>
          {str.length !== undefined ? str : ""}
        </div>
      </center>
    </div>
  );
}

export default LandingPage;
