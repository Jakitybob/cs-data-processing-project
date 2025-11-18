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
      <Header />
      <body class="main-body">
        <input type="file" accept=".txt" onChange={HandleFileChange} />
      </body>
    </div>
  )
}

// The persistent header for the application
function Header() {
  return (
    <header>
      <h1>Intelligence Analysis</h1>
    </header>
  );
}
