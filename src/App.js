import { useEffect, useState } from "react";
import "./App.css";
import objectData from "./hooks/data";
function App() {
  const [finalData, setFinalData] = objectData();
  const [fData, setFdata] = useState([]);
  useEffect(() => {
    setFdata(finalData);
  }, [finalData]);
  useEffect(() => {
    console.log("fdata E", fData);
    console.log("pin", pin);
    console.log("date", date);
  });
  const [pin, setPin] = useState("");
  const [date, setDate] = useState("");
  const filterByPin = (e) => {
    setPin(e.target.value);
    if (e.target.value) {
      const fil = fData.filter(
        (item) => item.deliveryPincode == e.target.value
      );
      if (fil.length == 0) {
        setFdata(finalData);
      } else {
        setFdata(fil);
      }
    } else if (!pin && !date) {
      console.log("empty");
      setFdata(finalData);
    }
  };
  const filterByDate = (e) => {
    setDate(e.target.value);
    if (e.target.value) {
      const fil = fData.filter((item) => item.orderDate == e.target.value);
      if (fil.length == 0) {
        setFdata(finalData);
      } else {
        setFdata(fil);
      }
    } else if (!pin && !e.target.value) {
      setFdata(finalData);
    }
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
                <tr key={index}>
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
