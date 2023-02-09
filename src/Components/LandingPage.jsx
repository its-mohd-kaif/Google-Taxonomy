import React, { useEffect, useState } from "react";
import "../App.css";
import DisplayComponent from "./DisplayComponent";
const file = require("../Data/file.txt");
function LandingPage() {
  // UseState For List Array
  const [list, setList] = useState([]);
  // Index Array
  const [indexArr, setIndexArr] = useState([]);
  let obj = {};
  let values = [];
  useEffect(() => {
    fetch(file)
      .then((res) => res.text())
      .then((val) => {
        let arr = val.split("\n");
        arr.map((ele) => {
          values = ele.split(" > ");
          // Call Method that make data into key value form
          createNestedObject(obj, values);
          setList([...list, obj]);
        });
      });
  }, []);
  // Function that make nested key value objects
  var createNestedObject = function (object, array) {
    for (var i = 0; i < array.length; i++) {
      object = object[array[i]] = object[array[i]] || {};
    }
  };

  const makeSubCategory = (data, value, index) => {
    if (indexArr.includes(index)) {
      list.splice(index + 1, list.length - index, data[value]);
      setList([...list]);
    } else {
      setList([...list, data[value]]);
      setIndexArr([...indexArr, index]);
    }
  };
  return (
    <div>
      <center>
        <h1>Google Taxonomy</h1>
        {list.map((val, index) => (
          <DisplayComponent
            key={index}
            data={val}
            index={index}
            makeSubCategory={makeSubCategory}
          />
        ))}
      </center>
    </div>
  );
}

export default LandingPage;
