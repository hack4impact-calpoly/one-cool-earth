import React from 'react';
import {Table, Container, Row, Col, Button} from "react-bootstrap";
import '../src/css/Spreadsheets.css';
import { ExportCSV } from './ExportCSV.js'
import Toggle from 'react-toggle'
import UserModal from './UserModal.js'
import EventModal from './EventModal.js'


const userData = {rows:
    [
    {
        id: 1,
        firstName: "Quentin",
        lastName: "Monasterial",
        email: "q@gmail.com",
        phone: "1234567890",
        admin: false,
        eventIds: [1, 2, 3]
    },
    {
        id: 2,
        firstName: "Ella",
        lastName: "Tadmor",
        email: "e@gmail.com",
        phone: "1234567890",
        admin: false,
        eventIds: [1, 2, 3]
    },
    {
        id: 3,
        firstName: "Sarah",
        lastName: "Skykora",
        email: "s@gmail.com",
        phone: "1234567890",
        admin: true,
        eventIds: [1, 2, 3]
    },
    {
        id: 4,
        firstName: "Quentin",
        lastName: "Monasterial",
        email: "q@gmail.com",
        phone: "1234567890",
        admin: false,
        eventIds: [1, 2, 3]
    },
    {
        id: 5,
        firstName: "Ella",
        lastName: "Tadmor",
        email: "e@gmail.com",
        phone: "1234567890",
        admin: true,
        eventIds: [1, 2, 3]
    },
    {
        id: 6,
        firstName: "Sarah",
        lastName: "Skykora",
        email: "s@gmail.com",
        phone: "1234567890",
        admin: false,
        eventIds: [1, 2, 3]
    }
]}

const eventData = {rows:[
    {
        id: 1,
        name: "Test Event",
        date: "5/15/21",
        time: "3-6pm",
        location: "SLO",
        volunteers: [1, 2, 3]
    },
    {
        id: 2,
        name: "Test Event 2",
        date: "5/15/21",
        time: "3-6pm",
        location: "SLO",
        volunteers: [1, 2, 3]
    },
    {
        id: 3,
        name: "Test Event 3",
        date: "5/15/21",
        time: "3-6pm",
        location: "SLO",
        volunteers: [1, 2, 3]
    },
    {
        id: 4,
        name: "Test Event",
        date: "5/15/21",
        time: "3-6pm",
        location: "SLO",
        volunteers: [1, 2, 3]
    },
    {
        id: 5,
        name: "Test Event 2",
        date: "5/15/21",
        time: "3-6pm",
        location: "SLO",
        volunteers: [1, 2, 3]
    },
    {
        id: 6,
        name: "Test Event 3",
        date: "5/15/21",
        time: "3-6pm",
        location: "SLO",
        volunteers: [1, 2, 3]
    }
]}


class Spreadsheets extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            tableViewUsers: false,
            showUserModal: false,
            showEventModal: false,
            userModalData: {},
            eventModalData: {},
            eventData: [],
            userData: []
        }
    }

    componentDidMount() {
        if(this.state.eventData === undefined) {
            const URL = `${process.env.REACT_APP_SERVER_URL}/api/event/get-all`;
            fetch(URL)
                .then((res) => res.json())
                .then((data) => {
                    this.setState({eventData: data})
                }, (error) => {
                    console.log("Error loading event data: ", error)
                });
        }
            const URL = `${process.env.REACT_APP_SERVER_URL}/api/userData/get-all`;
            fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({userData: data})
            }, (error) => {
                console.log("Error loading user data: ", error);
            });
    }

    handleToggleChange() {
        this.setState(prevState => ({
            tableViewUsers: !prevState.tableViewUsers
          }));
    }

    handleCloseUserModal = () => {
        this.setState({
            showUserModal: false
        })
    }

    handleShowUserModal = (userData) => {
        this.setState({
            showUserModal: true,
            userModalData: userData
        })
    }

    handleCloseEventModal = () => {
        this.setState({
            showEventModal: false
        })
    }

    handleShowEventModal = (eventData) => {
        this.setState({
            showEventModal: true,
            eventModalData: eventData
        })
    }

    getTableDataRows() {
        if(this.state.tableViewUsers === true) {
            return (
                <>
                <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Admin</th>
                            {/* <th>Events</th> */}
                        </tr>
                    </thead>
                <tbody>
                    {this.state.userData.map(user => (
                        <tr onClick={() => this.handleShowUserModal(user)}>
                            <td>{user.googleId}</td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}{console.log(user)}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.admin === true ? "Yes" : "No"}</td>
                        </tr>
                    )) }
                </tbody>
                </>
            )
        } else if (this.state.tableViewUsers === false) {
            if(this.state.eventData === undefined) {
                return (<h4>No event data found</h4>)
            } else {
                return (
                    <>
                    <thead>
                            <tr>
                                {/* <th>Id</th> */}
                                <th>Name</th>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Location</th>
                                {/* <th>Volunteers</th> */}
                            </tr>
                        </thead>
                    <tbody>
                        {this.state.eventData.map(event => (
                            <tr onClick={() => this.handleShowEventModal(event)}>
                                {/* <td>{event.id}</td> */}
                                <td>{event.name}</td>
                                <td>{new Date(event.date).toLocaleDateString()}</td>
                                <td>{event.startTime}</td>
                                <td>{event.endTime}</td>
                                <td>{event.location}</td>
                            </tr>
                        )) }
                    </tbody>
                    </>
                )

            }}
    }




    render(){
        return (<body>
            <EventModal show={this.state.showEventModal} eventData={this.state.eventModalData} handleClose={this.handleCloseEventModal} ></EventModal>
            <UserModal show={this.state.showUserModal} userData={this.state.userModalData} handleClose={this.handleCloseUserModal}></UserModal>
            <Container>
                <Row style={{paddingBottom: "10px"}}>
                    <Col md={10}>
                        <h1>Admin Data</h1>
                    </Col>
                    <Col md={2} style={{alignContent: "center", alignSelf: "center", alignItems: "center", display: "flex"}}>
                        <span style = {{paddingRight: "5px"}}>Events</span>
                        <Toggle defaultChecked={this.state.tableViewUsers} icons={false} onChange={() => this.handleToggleChange()} />
                        <span style = {{paddingLeft: "5px"}}>Users</span>
                    </Col>


                </Row>
                <Row>
                    <Table striped hover>
                        {this.getTableDataRows()}
                    </Table>
                </Row>
                <div style={{paddingTop: "10px"}}>
                <ExportCSV csvData={this.state.tableViewUsers ? this.state.userData : eventData} fileName={"One Cool Earth Data"}></ExportCSV>

                </div>


            </Container>
        </body>
        )
    }
}

export default Spreadsheets;
