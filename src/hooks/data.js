import React, { useState, useEffect } from "react";
import { useCSVReader, usePapaParse } from "react-papaparse";
import { toObj } from "./arrayToObject";
import csvString from "./SeedData.csv";
const ObjectData = () => {
  const [finalData, setFinalData] = useState([]);
  const { readRemoteFile } = usePapaParse();
  useEffect(() => {
    readRemoteFile(csvString, {
      complete: (results) => {
        const finaldata = toObj(results.data);
        setFinalData(finaldata);
      },
    });
  }, []);

  return [finalData, setFinalData];
};
export default ObjectData;
