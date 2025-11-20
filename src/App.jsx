import './index.css'
import { useState } from 'react'
import FileParser from './FileParser.jsx'
import ReportView from './ReportView.jsx'
import ReportStatistics from './Statistics.jsx'
import { Barplot } from './Barplot.jsx'

export default function App() {
  const [array, setArray] = useState([]);
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
        <div className="bg-stone-700 min-h-screen">
          <div className="flex flex-col items-center justify-center pt-10 pb-20 gap-10">
            <ReportView reportArray={array}/>
            <DisplayGraphs reportStatistics={repStats} />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <DisplayHeader />
      <div className="bg-stone-700 min-h-screen">
        <div className="flex justify-center pt-10">
          <UploadDataBox fileChangeFunction={HandleFileChange}/>
        </div>
      </div>
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

// Display a collection of bar graphs that visualize data frequency from reports
function DisplayGraphs({ reportStatistics }) {
  // Create an array to store the graphs in
  const graphElements = [];

  // Create frequency graphs if they have data within
  if (reportStatistics.NameFrequency.length > 0) {
    graphElements.push(<CreateGraph data={reportStatistics.NameFrequency} color={"#00a5c2ff"} label={"Frequency of Names"} />)
  }

  if (reportStatistics.TownFrequency.length > 0) {
    graphElements.push(<CreateGraph data={reportStatistics.TownFrequency} color={"#00398aff"} label={"Frequency of Towns"} />)
  }

  if (reportStatistics.StateFrequency.length > 0) {
    graphElements.push(<CreateGraph data={reportStatistics.StateFrequency} color={"#4e008aff"} label={"Frequency of States/Provinces"} />)
  }

  if (reportStatistics.CountryFrequency.length > 0) {
    graphElements.push(<CreateGraph data={reportStatistics.CountryFrequency} color={"#7a008aff"} label={"Frequency of Countries"} />)
  }

  if (reportStatistics.DateFrequency.length > 0) {
    graphElements.push(<CreateGraph data={reportStatistics.DateFrequency} color={"#8a003eff"} label={"Frequency of Dates"} />)
  }

  if (reportStatistics.OrgFrequency.length > 0) {
    graphElements.push(<CreateGraph data={reportStatistics.OrgFrequency} color={"#8a0000ff"} label={"Frequency of Organizations"} />)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {graphElements}
    </div>
  );
}

// Create a graph of the specified date type and color with the desired label
function CreateGraph({ data, color, label }) {
  return (
    <div className="text-center text-white font-mono">
      <Barplot data={data} width={700} height={400} color={color} />
      <label>
        {label}
      </label>
    </div>
  );
}