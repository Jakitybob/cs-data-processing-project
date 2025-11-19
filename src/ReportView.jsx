import { useState } from 'react'
import './index.css'
import ReportData from './Report'
import Location from './Location'

export default function ReportView(reportArray) {
  const [selectedReport, setSelectedReport] = useState();

  // Scrollbox of reports by ID
  return (
    <div className="flex-col bg-stone-900 px-5 pt-3 pb-3 text-white font-mono rounded-xl shadow-md shadow-neutral-900">
      <div className="flex justify-between">
        <h1 className="text-xl">Report Detail Viewer</h1>
        <form>
          <textarea/>
        </form>
      </div>
      <div className="max-h-110 flex justify-center gap-5 pt-3 pb-3 text-white font-mono">
        <ScrollableList reports={reportArray} selectedReport={selectedReport} onSelectReport={setSelectedReport} />
        <ShowReport index={selectedReport} array={reportArray}/>
      </div>
    </div>
  )
}

// Generates a scrollable list of all reports
function ScrollableList({ reports, selectedReport, onSelectReport }) {
  // Array of selectable elements
  const elements = [];
  if (reports.reportArray.length > 0) {
    for (let index = 0; index < reports.reportArray.length; index++) {
      elements.push(
        <li key={reports.reportArray[index].id} className="cursor-pointer text-white bg-stone-600 my-3 mr-3 pl-2 rounded-lg" onClick={() => onSelectReport(index)}>Report: {reports.reportArray[index].id}</li>
      );
    }
  }

  return (
    <div className="min-h-100 overflow-y-auto">
      <ul className="">
        {elements}
      </ul>
    </div>
  );
}

// Shows prompt text or the details of the selected report
function ShowReport(props) {
  // Display prompt text
  if (props.index == undefined) {
    return (
      <div className="flex bg-stone-800 px-5 max-w-250 inner-shadow-sm inner-shadow-black rounded-2xl overflow-y-auto">
        <h1 className="font-semibold self-center text-center w-250">Select a report on the left...</h1>
      </div>
    )
  }
  
  // Index and report from array, saved for my own sanity
  const index = props.index;
  const report = props.array.reportArray[index];

  return (
    <div className="flex flex-col gap-3 bg-stone-800 px-5 max-w-250 inner-shadow-sm inner-shadow-black rounded-2xl overflow-y-auto">
      <h1 className="font-semibold text-left text-2xl pt-2 pb-3">Report Details</h1>
      <div>
        <label className="font-semibold">ID: </label>
        <>{report.id}</>
      </div>
      <div>
        <label className="font-semibold">Date Filed: </label>
        <>{report.dateFiled.toDateString()}</>
      </div>
      <div>
        <label className="font-semibold">Reference IDs: </label>
        <>{RefIDsToString(report)}</>
      </div>
      <div>
        <label className="font-semibold">Source: </label>
        <>{report.source}</>
      </div>
      <div className="-indent-5 ml-5">
        <label className="font-semibold">Description: </label>
        <label>{report.description}</label>
      </div>
      <div>
        <label className="font-semibold">Person(s): </label>
        <>{PersonsToString(report)}</>
      </div>
      <div>
        <label className="font-semibold">Relevant Date(s): </label>
        <>{DatesToString(report)}</>
      </div>
      <div>
        <label className="font-semibold">Location(s): </label>
        <>{LocationsToString(report)}</>
      </div>
      <div>
        <label className="font-semibold">Organization(s): </label>
        <>{OrganizationsToString(report)}</>
      </div>
    </div>
  )
}

// Create a comma separated string of the reference ids
function RefIDsToString(report) {
  let string = "";
  for (let ref of report.GetReferenceIDs()) {
    if (string === "") string = ref;
    else string = string + ", " + ref;
  }

  return string;
}

// Create a comma separated string of the people of interest
function PersonsToString(report) {
  let string = "";
  for (let person of report.GetPersons()) {
    if (string === "") string = person;
    else string = string + ", " + person;
  }

  return string;
}

// Create a separated string of the important dates
function DatesToString(report) {
  let string = "";
  for (let date of report.GetDates()) {
    if (string === "") string = date.toDateString();
    else string = string + ", " + date.toDateString();
  }

  return string;
}

// Create a separated string of the locations of interest
function LocationsToString(report) {
  let string = "";
  for (let location of report.GetLocations()) {
    // Add each non empty part to a temp string
    let tempString = "";
    for (let subStr of location) {
      if (subStr !== " ") {
        if (tempString === "") tempString = subStr;
        else tempString = tempString + ", " + subStr;
      }
    }

    // Add the temp string to the main string
    if (string === "") string = tempString;
    else string = string + "; " + tempString;
  }

  // Return the string
  return string;
}

// Create a separated string of the organizations of interest
function OrganizationsToString(report) {
  let string = "";
  for (let org of report.GetOrganizations()) {
    if (string === "") string = org;
    else string = string + ", " + org;
  }

  return string;
}