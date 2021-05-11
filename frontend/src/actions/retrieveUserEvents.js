function getDates() {
  console.log("testing")
  fetch('http://localhost:3001/api/user/events/individual')
           .then(res => res.json())
           .then(data => {
              console.log("this is data");
              return data});
}

export default getDates;