import { useEffect, useState } from "react";
import { isCompositeComponentWithType } from "react-dom/test-utils";
import "./App.css";
import objectData from "./hooks/data";
function App() {
  const [finalData, setFinalData] = objectData();
  const [fData, setFdata] = useState([]);
  useEffect(() => {
    setFdata(finalData);
  }, [finalData]);

  const [pin, setPin] = useState("");
  const [date, setDate] = useState("");
  const filterByPin = (e) => {
    setPin(e.target.value);
    if (e.target.value !== "") {
      if (date) {
        console.log("1");
        setFdata(
          finalData.filter(
            (item) =>
              item.deliveryPincode == e.target.value && item.orderDate == date
          )
        );
      } else if (e.target.value && !date) {
        setFdata(
          finalData.filter((item) => item.deliveryPincode == e.target.value)
        );
        console.log("3");
      }
    } else {
      if (!e.target.value && !date) {
        console.log("allemmpty");
        setFdata(finalData);
      } else if (!e.target.value && date) {
        console.log("lat");
        setFdata(finalData.filter((item) => item.orderDate == date));
      }
    }
  };
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const filterByDate = (e) => {
    setDate(e.target.value);
    if (e.target.value !== "") {
      if (pin) {
        console.log("1");
        setFdata(
          finalData.filter(
            (item) =>
              item.deliveryPincode == pin && item.orderDate == e.target.value
          )
        );
      } else if (e.target.value && !pin) {
        setFdata(finalData.filter((item) => item.orderDate == e.target.value));
        console.log("3");
      }
    } else {
      if (!e.target.value && !pin) {
        console.log("allemmpty");
        setFdata(finalData);
      } else if (!e.target.value && pin) {
        setFdata(finalData.filter((item) => item.deliveryPincode == pin));
      }
    }
  };
  const sortbyPin = () => {
    //need to make a copy of state, directly it wasnt
    //https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
    function sortByKey([...array], key) {
      return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }
    console.log(sortByKey(fData, "deliveryPincode"));
    setFdata(sortByKey(fData, "deliveryPincode"));
  };
  const sortbyid = () => {
    function sortByKey([...array], key) {
      return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }
    setFdata(sortByKey(fData, "orderDate"));
  };

  return (
    <>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          padding: "30px",
          background: "#D3EBCD",
        }}
      >
        <div>
          filter by Pincode <br></br>
          <input
            placeholder="enter pin to filer"
            onInput={filterByPin}
            value={pin}
          ></input>
        </div>
        <div>
          filter by Date<br></br>
          <input
            placeholder="enter date to filter"
            onInput={filterByDate}
            value={date}
          ></input>
        </div>
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            backgroundColor: "red",
            justifyContent: "space-between",
          }}
        >
          <button onClick={sortbyPin}>sort by pin</button>
          <button onClick={sortbyid}>sort by date</button>
        </div>
      </div>

      {fData.length ? (
        <div
          style={{
            padding: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#DFF6FF",
          }}
        >
          <table
            style={{
              width: "100%",
              backgroundColor: "#FCF8E8",
            }}
          >
            <tr>
              <th style={{ border: "2px solid black" }}>orderid</th>
              <th style={{ border: "2px solid black" }}>customerid</th>
              <th style={{ border: "2px solid black" }}>deliverypincode</th>
              <th style={{ border: "2px solid black" }}>orderdate</th>
              <th style={{ border: "2px solid black" }}>item</th>
            </tr>
            {fData.map((item, index) => {
              return (
                <tr
                  key={item.orderId}
                  style={{
                    backgroundColor: index % 2 == 0 ? "#FCF9C6" : "#DFF6FF",
                  }}
                >
                  <td
                    style={{
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: "black",
                    }}
                  >
                    {item.orderId}
                  </td>
                  <td
                    style={{
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: "black",
                    }}
                  >
                    {item.customerId}
                  </td>
                  <td
                    style={{
                      // border: "1px ,solid ,#dddddd",
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: "black",
                    }}
                  >
                    {item.deliveryPincode}
                  </td>
                  <td
                    style={{
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: "black",
                    }}
                  >
                    {item.orderDate}
                  </td>
                  <td
                    style={{
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: "black",
                    }}
                  >
                    {item.items.map((i) => {
                      const word = i.replace(":", "-");
                      return (
                        <>
                          {word}
                          <br></br>
                        </>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      ) : (
        <h2>Nothing found search again</h2>
      )}
    </>
  );
}

export default App;
