export default class Location {
    // Class members
    address = "";
    town = "";
    state = "";
    country = "";

    // Constructor takes a string separated by / and populates itself
    constructor(locationString) {
        // Split the location string into its 4 parts
        const locationParts = locationString.split('/');
        
        // Fill out each part based on the string. Some strings may be " "
        this.address = locationParts[0];
        this.town = locationParts[1];
        this.state = locationParts[2];
        this.country = locationParts[3];
    };

    
}