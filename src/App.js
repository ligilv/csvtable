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

  useEffect(() => {
    // console.log("fdata E", fData);
    // console.log("pin", pin);
    // console.log("date", date);
  });
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
  return (
    <>
      <div>
        filter pin
        <input
          placeholder="enter pin to filer"
          onInput={filterByPin}
          value={pin}
        ></input>
      </div>
      <div>
        filter date
        <input
          placeholder="enter date to filter"
          onInput={filterByDate}
          value={date}
        ></input>
      </div>
      <button onClick={sortbyPin}>sort by pin</button>
      <button>sort by date</button>
      {fData.length ? (
        <div>
          <table
            style={{
              width: "80%",
              // border: "1px ,solid ,#dddddd",
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: "black",
            }}
          >
            <tr>
              <th>orderid</th>
              <th>customerid</th>
              <th>deliverypincode</th>
              <th>orderdate</th>
              <th>item</th>
            </tr>
            {fData.map((item, index) => {
              return (
                <tr key={item.orderId}>
                  <td
                    style={{
                      // border: "1px ,solid ,#dddddd",
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: "black",
                    }}
                  >
                    {item.orderId}
                  </td>
                  <td
                    style={{
                      // border: "1px ,solid ,#dddddd",
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
                      // border: "1px ,solid ,#dddddd",
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: "black",
                    }}
                  >
                    {item.orderDate}
                  </td>
                  <td
                    style={{
                      // border: "1px ,solid ,#dddddd",
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
