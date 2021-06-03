
const testEvent = {
    name: 'Event One', 
    startTime: new Date(), 
    endTime: new Date(), 
    location: 'SLO', 
    description: 'description!',
    volunteersPerShift: 3,
    coordinator: 'Coordinator 1',
    address: '123 Grand Ave',
    volunteerType: 'Type'
}



//COPY THE FOLLOWING CALLS TO THE PAGE YOU ARE WORKING ON, DON'T CALL THEM HERE. THESE ARE JUST SAMPLES.


function getQueryString(obj) {
    var queryString = "?" + Object.keys(obj).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    }).join('&');
    return queryString;
}

function getEventById() {
    const URL = `${process.env.REACT_APP_SERVER_URL}/api/event/getEvent` + this.getQueryString({"id": "60abd356f5a66b419d3c8ec9"});
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                console.log("GOT EVENT: ", data)
            }, (error) => {
                console.log("Error getting event by id: ", error)
            });
}

function createEvent() {
    const URL = `${process.env.REACT_APP_SERVER_URL}/api/event/create`;
        fetch(URL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: JSON.stringify(testEvent),
          })
            .then((res) => res)
            .then((data) => {
                console.log("created event!: ", data)
            }, (error) => {
                console.log("Error creating new event: ", error)
            });
}

function deleteEventById() {
    const data2 = {id: '60abd356f5a66b419d3c8ec9'};
    const URL = `${process.env.REACT_APP_SERVER_URL}/api/event/deleteEvent`;
        fetch(URL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: JSON.stringify(data2),
          })
            .then((res) => res)
            .then((data) => {
                console.log("Delete EVENT: ", data)
            }, (error) => {
                console.log("Error deleting event by id: ", error)
            });
}