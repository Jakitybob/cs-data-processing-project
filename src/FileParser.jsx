import { useState } from 'react'
import ReportData from './Report'
import Location from './Location'

// Reads the given report text file and breaks it up assuming it follows the correct format
export default function FileParser(file, setArrayFunction) {
  const tempArray = []; // Temporary array to return later

  // Create a file reader object and bind logic to its onload event
  const reader = new FileReader(); 
  reader.onload = (event) => {
    // Split each report in the text file for parsing
    const content = event.target.result;
    const reports = content.split("REPORT\n");
    for (const report of reports) {
      if (report == reports[0]) continue; // Skip first report as it is empty because of how split works
      tempArray.push(GenerateReport(report));
    }

    // Once fully read, pass out the array via the state set function
    setArrayFunction(tempArray);
  }

  // Have the reader load the text file
  reader.readAsText(file);
  // The rest of the functionality from here is in the reader.onload lambda
}

// Returns a report object
function GenerateReport(report) {
  const reportObject = new ReportData();

  // Split each line of the report
  const lines = report.split('\n');

  // Get the ID, date, source, and description
  reportObject.id = lines[0].split("ID: ")[1];
  reportObject.dateFiled = ReportStringToDate(lines[1].split("REPORTDATE: ")[1]);
  reportObject.source = lines[3].split("REPORTSOURCE: ")[1];
  reportObject.description = lines[4].split("REPORTDESCRIPTION: ")[1];

  // Handle all ; separated lists
  HandleSeparatedList(reportObject, lines[2], "REFERENCEID: ");
  HandleSeparatedList(reportObject, lines[5], "PERSONS: ");
  HandleSeparatedList(reportObject, lines[6], "DATES: ");
  HandleSeparatedList(reportObject, lines[7], "PLACES: ");
  HandleSeparatedList(reportObject, lines[8], "ORGANIZATIONS: ");

  // Return the report object
  return reportObject;
}

// Converts a report date to a date object
function ReportStringToDate(date) {
  // Split each part of the data ([0] is month, [1] is day, [2] is year)
  const numbers = date.split('/');

  if (numbers[0] === ' ') return new Date(numbers[2]); // If the month is invalid only make a date with the year
  else if (numbers[1] === ' ') return new Date(numbers[2], numbers[0]); // Else if the day is invalid do only month and year

  // Otherwise return the full date by default
  return new Date(numbers[2], numbers[0], numbers[1]);
}

// Splits a semi-colon separated list and adds it to the specified report data
function HandleSeparatedList(reportObjectRef, string, reportDataType) {
  // Split the line by the data type initially
  const line = string.split(reportDataType);
  if (line.length < 2) return; // Return if the line is empty

  // Split the line by the ; delimiter
  const data = line[1].split(';');
  if (data[0] === '') return; // Return if the data is empty

  // Iterate through each piece of data and place it where it belongs
  for (let d of data) {
    switch (reportDataType) {
      case "PERSONS: ":
        reportObjectRef.AddPerson(d);
        break;
      case "DATES: ":
        reportObjectRef.AddDate(ReportStringToDate(d));
        break;
      case "REFERENCEID: ":
        reportObjectRef.AddReferenceID(d);
        break;
      case "PLACES: ":
        reportObjectRef.AddLocation(new Location(d));
        break;
      case "ORGANIZATIONS: ":
        reportObjectRef.AddOrganization(d);
        break;
    }
  }
}