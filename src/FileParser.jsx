import { useState } from 'react'
import ReportData from './Report'
import Location from './Location'
import ReportStatistics from './Statistics.jsx'

// Reads the given report text file and breaks it up assuming it follows the correct format
export default function FileParser(file, setArrayFunction, reportStats, setReportStatistics) {
  const tempArray = []; // Temporary array to return later
  let reportStatistics = reportStats;

  // Create a file reader object and bind logic to its onload event
  const reader = new FileReader(); 
  reader.onload = (event) => {
    // Split each report in the text file for parsing
    const content = event.target.result;
    const reports = content.split("REPORT\n");
    for (const report of reports) {
      if (report == reports[0]) continue; // Skip first report as it is empty because of how split works
      tempArray.push(GenerateReport(report, reportStatistics));
    }

    // Once fully read, pass out the array via the state set function
    setArrayFunction(tempArray);
    console.log(reportStatistics)
    setReportStatistics(reportStatistics);
  }

  // Have the reader load the text file
  reader.readAsText(file);
  
  // The rest of the functionality from here is in the reader.onload lambda
}

// Returns a report object
function GenerateReport(report, reportStatistics) {
  const reportObject = new ReportData();

  // Split each line of the report
  const lines = report.split('\n');

  // Get the ID, date, source, and description
  reportObject.id = lines[0].split("ID: ")[1];
  reportObject.dateFiled = ReportStringToDate(lines[1].split("REPORTDATE: ")[1]);
  reportObject.source = lines[3].split("REPORTSOURCE: ")[1];
  reportObject.description = lines[4].split("REPORTDESCRIPTION: ")[1];

  // Handle all ; separated lists
  HandleSeparatedList(reportObject, lines[2], "REFERENCEID: ", reportStatistics);
  HandleSeparatedList(reportObject, lines[5], "PERSONS: ", reportStatistics);
  HandleSeparatedList(reportObject, lines[6], "DATES: ", reportStatistics);
  HandleSeparatedList(reportObject, lines[7], "PLACES: ", reportStatistics);
  HandleSeparatedList(reportObject, lines[8], "ORGANIZATIONS: ", reportStatistics);
  
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
function HandleSeparatedList(reportObjectRef, string, reportDataType, reportStatistics) {
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
        AddStatistic(reportStatistics.NameFrequency, d);
        break;
      case "DATES: ":
        reportObjectRef.AddDate(ReportStringToDate(d));
        if (reportStatistics.DateFrequency.has(d)) reportStatistics.DateFrequency.set(d, reportStatistics.DateFrequency.get(d) + 1)
        else reportStatistics.DateFrequency.set(d, 1);
        break;
      case "REFERENCEID: ":
        reportObjectRef.AddReferenceID(d);
        break;
      case "PLACES: ":
        let location = d.split('/');
        reportObjectRef.AddLocation(location);
        // Town frequency
        if (location[1] !== " ") {
          if (reportStatistics.TownFrequency.has(location[1])) reportStatistics.TownFrequency.set(location[1], reportStatistics.TownFrequency.get(location[1]) + 1)
          else reportStatistics.TownFrequency.set(location[1], 1);
        }
        // State/province frequency
        if (location[2] !== " ") {
          if (reportStatistics.StateFrequency.has(location[2])) reportStatistics.StateFrequency.set(location[2], reportStatistics.StateFrequency.get(location[2]) + 1)
          else reportStatistics.StateFrequency.set(location[2], 1);
        }
        // Country frequency
        if (location[1] !== " ") {
          if (reportStatistics.CountryFrequency.has(location[3])) reportStatistics.CountryFrequency.set(location[3], reportStatistics.CountryFrequency.get(location[3]) + 1)
          else reportStatistics.CountryFrequency.set(location[3], 1);
        }
        break;
      case "ORGANIZATIONS: ":
        reportObjectRef.AddOrganization(d);
        if (reportStatistics.OrgFrequency.has(d)) reportStatistics.OrgFrequency.set(d, reportStatistics.OrgFrequency.get(d) + 1)
        else reportStatistics.OrgFrequency.set(d, 1);
        break;
    }
  }
}

function AddStatistic(statisticArray, data) {
  // Iterate through the array to check if the value already exists in a pair
  for (let index = 0; index < statisticArray.length; index++) {
    if (statisticArray[index].key == data) { // Increment the data if it was found
      statisticArray[index].value += 1;
      return;
    }
  }

  // Push the value to the array if it wasn't found in the for loop
  statisticArray.push({key: data, value: 1});
}