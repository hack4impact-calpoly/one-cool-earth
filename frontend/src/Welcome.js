import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './css/Welcome.css';
import BannerImage1 from './images/banner-image-1.jpg';
import BannerImage2 from './images/banner-image-2.jpg';
import BannerImage3 from './images/banner-image-3.jpg';
import Iframe from 'react-iframe'

class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eventList: [],
            announcementList: [],
            showModal: null
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
    }

    render() {
        return (
            <div id='welcome'>
                <Modal centered show={this.state.showModal} onHide={this.handleClose} size='lg'>
                    <Modal.Header>
                        <Modal.Title cenetered style={{ textTransform: 'uppercase'}}>Sign Waiver</Modal.Title>
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
