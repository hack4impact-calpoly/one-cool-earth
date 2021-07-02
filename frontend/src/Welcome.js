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
        }
    }

    componentDidMount() {
        const eventsURL = `${process.env.REACT_APP_SERVER_URL}/api/event/get-all`;  // should access endpoint for getting shifts instead
        fetch(eventsURL, {credentials: 'include'})
            .then((res) => res.json())
            .then((json) => this.setState({eventList: json}))
            .catch((err) => console.error(err));
        const announcementsURL = `${process.env.REACT_APP_SERVER_URL}/api/announcement/`;
        fetch(announcementsURL, {credentials: 'include'})
            .then((res) => res.json())
            .then((json) => this.setState({announcementList: json}))
            .catch((err) => console.error(err));
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
                    <div id='planning'>
                        <div id='engagements'>
                            <h3>Current Engagements</h3>
                            {this.state.eventList.map((e) => (
                                <div key={e.name} className='event'>
                                    <h5>{'> ' + e.name}</h5>
                                </div>
                            ))}
                            <br/>
                            <div id='edit-button'>
                                <Button href='/edit-user'>Edit</Button>
                            </div>
                        </div>
                        <div id='calendar-button'>
                            <Button href='/calendar'>Calendar</Button>
                        </div>
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
