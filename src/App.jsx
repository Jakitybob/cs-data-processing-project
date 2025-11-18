import './App.css'
import { useState } from 'react'
import FileParser from './FileParser.jsx'

export default function App() {
  const [array, setArray] = useState([]);

  // Call the FileParser when the input box changes
  const HandleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) FileParser(file, setArray);
  };

  // Element array to print report data
  const elements = [];

  // Test print
  if (array.length > 0) {
    for (let report of array) {
      elements.push(
      <p>Report {report.id}:</p>
    )}

    return <div>{elements}</div>
  }

  return (
    <div>
      <header>
        <h1>Intelligence Analysis</h1>
        <div className="subheader">
          Upload a dataset to analyze:
          <input type="file" accept=".txt" onChange={HandleFileChange} /> 
        </div>
      </header>
      <MainComponentDisplay array={array} />
    </div>
  )
}

// Displays the data set format guide if the array is empty, or the report viewer if it is not empty
function MainComponentDisplay(array) {
  console.log(array);
  // Display the data set guide if the array is empty
  if (array == undefined || array.length < 1) {
    console.log("dataset!");
    return (<DatasetFormat />);
  } 

  // Return the 
}

// Display the format guidelines for a dataset
function DatasetFormat() {
  return (
    <div class="info-box">
      <h3>Dataset Format Guidelines</h3>
      <p>
        The dataset must follow these formatting guidelines to be properly analyzed:
      </p>
      <ul>
        <li>Each report must be separated with a line that says "REPORT: "</li>
        <li>
          There must be lines started with ID:, REPORTDATE:, REFERENCEID:, REPORTSOURCE:,
          REPORTDESCRIPTION:, PERSONS:, DATES:, and ORGANIZATIONS:.
        </li>
        <li>Dates must be in the format MM/DD/YYYY, however month and day can have one digit.</li>
        <li>Places must be separated into four locations. If one is blank they still need a space. (e.g. Road/Town/State/Place)</li>
        <li>Any lists must be separated by a semi-colon.</li>
      </ul>
    </div>
  )
}