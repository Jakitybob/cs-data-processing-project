//
export default class ReportData {
  // Class members
  id = -1;
  dateFiled = null;
  #referenceIds = [];
  source = "";
  description = "";
  #persons = [];
  #dates = [];
  #locations = [];
  #organizations = [];

  // Default constructor
  constructor() {};

  // Get the reference IDs from the report
  GetReferenceIDs() {
    return this.#referenceIds;
  }

  // Add a reference ID to the report
  AddReferenceID(refId) {
    this.#referenceIds.push(refId);
  }

  // Get the persons of interest from the report
  GetPersons() {
    return this.#persons;
  }

  // Add a person of interest to the report
  AddPerson(person) {
    this.#persons.push(person);
  }

  // Get the dates referenced in the report
  GetDates() {
    return this.#dates;
  }

  // Add a date of interest to the report
  AddDate(date) {
    this.#dates.push(date);
  }

  // Get the locations referenced in the report
  GetLocations() {
    return this.#locations;
  }

  // Add a location of interest to the report
  AddLocation(location) {
    this.#locations.push(location);
  }

  // Get the organizations referenced in the report
  GetOrganizations() {
    return this.#organizations;
  }

  // Add an organization of interest to the report
  AddOrganization(org) {
    this.#organizations.push(org);
  }

  // Check if this report contains the provided string within
  ContainsString(string) {
    // Check if the ID matches the string
    if (string == this.id) return true;

    // Check if the string matches any persons
    for (let person of this.#persons) {
      // Check for a full name match or a partial match
      if (string == person) return true;
      const names = person.split(' ');
      for (let name of names) {
        if (string == name) return true;
      }
    }
    
    // Check if the string matches any locations
    for (let loc of this.#locations) {
      if (string == loc[1]) return true;
      if (string == loc[2]) return true;
      if (string == loc[3]) return true;
    }

    // Check if the string matches any organizations
    for (let org of this.#organizations) {
      if (string == org) return true;
    }

    // Check if the string matches any dates
    for (let date of this.#dates) {
      // Check if the date matches a year
      if (string == date.getFullYear()) return true;

      // Check if a date matches mm/yyyy
      if (string == date.getMonth() + "/" + date.getFullYear()) return true;

      // Create a string for the date
      if (string == date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear()) return true;
    }

    return false;
  }
}