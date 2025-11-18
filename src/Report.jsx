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
}