import { useEffect, useState } from "react";
import "./App.css";
import objectData from "./hooks/data";
function App() {
  const [finalData] = objectData();
  const [fData, setFdata] = useState([]);
  useEffect(() => {
    setFdata(finalData);
  }, [finalData]);
  const [pin, setPin] = useState();
  const filterData = (e) => {
    setPin(e.target.value);
    console.log(pin);
    if (e.target.value) {
      console.log("in");
      setFdata(
        finalData.filter((item) => item.deliveryPincode == e.target.value)
      );
      console.log(fData);
    } else {
      console.log("else");
      setFdata(finalData);
    }
  };
  return (
    <>
      <div>
        filter{" "}
        <input
          placeholder="enter pin to filer"
          onInput={filterData}
          value={pin}
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
