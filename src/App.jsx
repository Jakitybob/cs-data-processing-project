import './index.css'
import { useState } from 'react'
import FileParser from './FileParser.jsx'
import ReportView from './ReportView.jsx'
import ReportStatistics from './Statistics.jsx'
import { Barplot } from './Barplot.jsx'

export default function App() {
  const [array, setArray] = useState([]);
  const reportStatistics = new ReportStatistics();
  const [repStats, setRepStats] = useState(new ReportStatistics());

  // Call the FileParser when the input box changes
  const HandleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) FileParser(file, setArray, repStats, setRepStats);
  };

  const Eep = (array) => {
    if (repStats.NameFrequency.size <= 0) return <></>
    else return <Barplot data={repStats.NameFrequency} width={700} height={400} color={"#004a8aff"}/>
  }

  // Test print
  if (array.length > 0) {
    return (
      <>
        <DisplayHeader />
        <body className="bg-stone-700">
          <div className="flex flex-col items-center justify-center pt-10">
            <ReportView reportArray={array}/>
            <Eep array={array}/>
          </div>
        </body>
      </>
    )
  }

  return (
    <>
      <DisplayHeader />
      <body className="bg-stone-700">
        <div className="flex justify-center pt-10">
          <UploadDataBox fileChangeFunction={HandleFileChange}/>
        </div>
      </body>
    </>
  )
}

// Function to display the header for the page
function DisplayHeader() {
  return (
    <header className="bg-stone-900 drop-shadow-md drop-shadow-neutral-900">
      <h1 className="text-white font-mono text-center text-3xl pb-5 pt-5">
      Intelligence Analysis
      </h1>
    </header>
  );
}

// Dataset Upload Box
function UploadDataBox(props) {
  // ReactJS sillyness to pass the onChange handler down
  const fileChange = (event) => {
    props.fileChangeFunction(event);
  }

  return (
    <div className="bg-stone-900 text-white font-mono text-center flex flex-col content-center px-10 pt-5 rounded-xl drop-shadow-md drop-shadow-neutral-900">
      <label className="text-lg font-semibold pb-3">Upload a Report to Analyze</label>
      <input 
        type="file" 
        accept=".txt" 
        onChange={fileChange} 
        className="self-center file:mr-5 file:rounded-full file:border-0 file:bg-neutral-600 mb-5 file:px-4 file:drop-shadow-lg file:drop-shadow-neutral-900"
      /> 
      <DatasetFormat />
    </div>
  );
}

// Display the format guidelines for a dataset
function DatasetFormat() {
  return (
    <div className="bg-stone-800 max-w-2xl text-left px-10 pt-3 pb-3 mb-5 rounded-2xl inset-shadow-sm inset-shadow-neutral-900">
      <h1 className="text-lg text-center pb-2">Report Format Guidelines</h1>
      <p className="text-sm">
        The dataset must follow these formatting guidelines to be properly analyzed:
      </p>
      <div className="ml-4">
        <ul>
          <li>* Each report must be separated with a line that says "REPORT: "</li>
          <li>
            * There must be lines started with ID:, REPORTDATE:, REFERENCEID:, REPORTSOURCE:,
            REPORTDESCRIPTION:, PERSONS:, DATES:, and ORGANIZATIONS:.
          </li>
          <li>* Dates must be in the format MM/DD/YYYY, however month and day can have one digit.</li>
          <li>* Places must be separated into four locations. If one is blank they still need a space. (e.g. Road/Town/State/Place)</li>
          <li>* Any lists must be separated by a semi-colon.</li>
        </ul>
      </div>
    </div>
  )
}