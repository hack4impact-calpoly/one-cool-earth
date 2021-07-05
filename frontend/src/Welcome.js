import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './css/Welcome.css';
import BannerImage1 from './images/banner-image-1.jpg';
import BannerImage2 from './images/banner-image-2.jpg';
import BannerImage3 from './images/banner-image-3.jpg';
import Iframe from 'react-iframe'

const apiKey = '44dccd6f10590ce8651f22c3d52a1a6a'
const formID = '70895957565174'
class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eventList: [],
            announcementList: [],
            showModal: null,
            editToggled: false
        }
    }

    componentDidMount() {
        console.log(this.props.user);
        const eventsURL = `${process.env.REACT_APP_SERVER_URL}/api/event/get/?id=`;
        const announcementsURL = `${process.env.REACT_APP_SERVER_URL}/api/announcement/`;
        this.props.user.shifts.forEach((event) => {
          fetch(eventsURL + event, {credentials: 'include'})
              .then(response => response.json())
              .then(json => {
                  /* Filter events that have already concluded and sort in order of recency */
                  if (json.event && new Date(json.event.endTime) >= new Date()) {
                      const sortedEventList = [...this.state.eventList, json.event].sort((event1, event2) =>
                      {
                        const startDate1 = new Date(event1.startTime);
                        const startDate2 = new Date(event2.startTime);
                        return startDate1 - startDate2;
                      });
                      this.setState({eventList: sortedEventList});
                      console.log(sortedEventList);
                  }
              })
              .catch(error => console.error(error));
        });
        fetch(announcementsURL, {credentials: 'include'})
            .then(response => response.json())
            .then(json => this.setState({announcementList: json}))
            .catch(error => console.error(error));
        this.setState({showModal: !this.props.user.signedWaiver})
        if(!this.props.user.signedWaiver) {
            this.getJotFormSubmission()
            this.timerId = setInterval(() => this.getJotFormSubmission(), 3000)
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.timerId)
    }

    checkAnswer = (answers) => {
        for (const [key, value] of Object.entries(answers)) {
            if (value.name === 'email' && value.answer && value.answer === this.props.user.email) {
                return true
            }
        }
        return false
    }

    getJotFormSubmission = () => {
        const jotformURL = `https://api.jotform.com/form/${formID}/submissions?apiKey=${apiKey}`
        fetch(jotformURL)
            .then(response => {
                return response.json()
            })
            .then(data => {
                data.content.map( (entry)=> {
                    if (this.checkAnswer(entry.answers)) {
                        const signedWaiverURL = `${process.env.REACT_APP_SERVER_URL}/api/user/signed-waiver`
                        fetch(signedWaiverURL, {
                            method: 'POST',
                            mode: 'cors',
                            credentials: 'include',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({email: this.props.user.email})
                        }).then( response => {
                            if(response.status === 200) {
                                this.setState({showModal: false})
                                clearInterval(this.timerId)
                            }
                        })
                    }
                })
            })
    }

    handleToggle = () => {
        this.setState({editToggled: !this.state.editToggled});
    }

    handleDelete = (id) => {

        /* TODO: make POST request to api/events/edit to remove user's _id from the event's list of users */

        console.log(id);
        const deleteShiftURL = `${process.env.REACT_APP_SERVER_URL}/api/user/delete-shift`;
        const deleteShiftBody = {
            email: this.props.user.email,
            shiftId: id
        };
        fetch(deleteShiftURL, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(deleteShiftBody)
        }).then(response => {
                if (response.status === 200)
                    this.setState({eventList: this.state.eventList.filter((event) => event._id.toString() !== id.toString())})
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
          <div id='welcome'>
            <Modal centered show={this.state.showModal} size='lg'>
              <Modal.Header>
                <Modal.Title style={{ textTransform: 'uppercase'}}>Sign Waiver</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Iframe
                  url='https://form.jotform.com/70895957565174'
                  width="100%"
                  height="600px"
                />
              </Modal.Body>
              <Modal.Footer>
                The modal will close a few moments after the form has been submitted
              </Modal.Footer>
            </Modal>
            <h1>Welcome, {this.props.user.name.first}</h1>
              <div id='images-banner'>
                <img className='banner-image' src={BannerImage1} alt="volunteer event" />
                <img className='banner-image' src={BannerImage2} alt="volunteer event" />
                <img className='banner-image' src={BannerImage3} alt="volunteer event" />
              </div>
              <div id='dashboard'>
              <div id='planning' class='text-center'>
                <div id='engagements' class='text-center'>
                  <h3>Current Engagements</h3>
                    {this.state.eventList.map((event) => (
                        <div key={event._id} className='event'>
                            <h5>{event.name + ", " + event.volunteerType}</h5>
                            {this.state.editToggled ? <Button class="py-0"onClick={() => this.handleDelete(event._id)}>Delete</Button> : null}
                        </div>
                    ))}
                    <br/>
                    <Button onClick={this.handleToggle}>{this.state.editToggled ? "Done" : "Edit"}</Button>
                </div>
                <Button href='/calendar'>Calendar</Button>
              </div>
              <div id='news'>
                <h3>Organization News</h3>
                  {this.state.announcementList.map((e) => (
                    <div key={e._id} className='announcement'>
                      <h5>{e.title}</h5>
                        <p>{e.description}</p>
                    </div>
                  ))}
              </div>
              </div>
          </div>
    );
    }
}

export default Welcome;
