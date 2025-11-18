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
    <>
      <h1>File Thingy</h1>
      <div>
        <input type="file" accept=".txt" onChange={HandleFileChange} />
      </div>
    </>
  )
}
