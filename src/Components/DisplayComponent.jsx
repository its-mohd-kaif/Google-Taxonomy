import React from "react";

function DisplayComponent({ data, index, makeSubCategory }) {
  // Display List Component
  return (
    <div>
      <div className="section" style={{ width: "50%" }}>
        {/* Check Validation */}
        {Object.keys(data).length !== 0 ? (
          <select
            onChange={(e) => {
              makeSubCategory(data, e.target.value, index);
            }}
            className="form-select"
            aria-label="Default select example"
          >
            <option disabled selected>
              --Select--
            </option>
            {/* Map */}
            {Object.keys(data).map((val, index) => (
              <option key={index} value={val}>
                {val}
              </option>
            ))}
          </select>
        ) : null}
      </div>
    </div>
  );
}

export default DisplayComponent;
