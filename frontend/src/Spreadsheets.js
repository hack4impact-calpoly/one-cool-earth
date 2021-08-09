import React from 'react';
import {Table, Container, Row, Col, Button} from "react-bootstrap";
import '../src/css/Spreadsheets.css';
import { ExportCSV } from './ExportCSV.js'
import Toggle from 'react-toggle'
import UserModal from './UserModal.js'
import EventModal from './EventModal.js'

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
        if(this.state.eventData === undefined || this.state.eventData.length === 0) {
            const URL = `${process.env.REACT_APP_SERVER_URL}/api/event/get-all`;
            fetch(URL, {credentials: 'include'})
                .then((res) => res.json())
                .then((data) => {
                    this.setState({eventData: data})
                }, (error) => {
                    console.log("Error loading event data: ", error)
                });
        }
        if(this.state.userData === undefined || this.state.userData.length === 0) {
            const URL = `${process.env.REACT_APP_SERVER_URL}/api/user/get-all`;
            fetch(URL,
                {
                    method: 'POST',
                    credentials: 'include',
                    mode: 'cors'
                })
                .then((res) => res.json())
                .then((data) => {
                    this.setState({userData: data})
                }, (error) => {
                    console.log("Error loading user data: ", error);
                });
        }
    }

    handleAdminChange = () => {
        if(this.state.userModalData.admin) {
            const URL = `${process.env.REACT_APP_SERVER_URL}/api/admin/removeAdmin`
            fetch(URL, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: this.state.userModalData.email}),
            }).then( response => {
                if(response.status === 200) {
                    this.updateUserAdminStatus(this.state.userModalData.email)
                }
            })
        }
        else{
            const URL = `${process.env.REACT_APP_SERVER_URL}/api/admin/makeAdmin`
            fetch(URL, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: this.state.userModalData.email}),
            }).then( response => {
                if(response.status === 200) {
                    this.updateUserAdminStatus(this.state.userModalData.email)
                }
            })

        }
    }

    handleToggleChange = () => {
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

    handleEventModalChange = (eventData) => {
        let newEventData = this.state.eventData
        newEventData.splice(newEventData.findIndex( entry => entry._id === eventData._id), 1, eventData)
        this.setState({eventModalData: eventData, eventData: newEventData})
    }

    updateUserAdminStatus = (email) => {
        let newUserData = this.state.userData
        newUserData = newUserData.map( user => {
            if (user.email === email) {
                const newUser = user
                newUser.admin = !user.admin
                return newUser
            } else {
                return user
            }
        })
        this.setState({userData: newUserData})
    }

    getTableDataRows = () => {
        if(this.state.tableViewUsers === true) {
            return (
                <>
                <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Admin?</th>
                            {/* <th>Events</th> */}
                        </tr>
                    </thead>
                <tbody>
                    {this.state.userData.map(user => (
                        <tr onClick={() => this.handleShowUserModal(user)} className="data-row">
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
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
                                <th>Name</th>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Location</th>
                                <th>Address</th>
                                <th># of Volunteers</th>
                                <th>Coordinator</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                    <tbody>
                        {this.state.eventData.map(event => (
                            <tr onClick={() => this.handleShowEventModal(event)} className="data-row">
                                <td>{event.name}</td>
                                <td>{new Date(event.date).toLocaleDateString()}</td>
                                <td>
                                    {new Date(event.startTime).toLocaleTimeString().substr(0, 4) +
                                    ' ' +
                                    new Date(event.startTime).toLocaleTimeString().substr(-2, 2)}
                                </td>
                                <td>
                                    {new Date(event.endTime).toLocaleTimeString().substr(0, 4) +
                                    ' ' +
                                    new Date(event.endTime).toLocaleTimeString().substr(-2, 2)}
                                </td>
                                <td>{event.address}</td>
                                <td>{event.location}</td>
                                <td>{event.numberOfVolunteers}</td>
                                <td>{event.coordinator}</td>
                                <td>{event.volunteerType}</td>
                            </tr>
                        )) }
                    </tbody>
                    </>
                )

            }}
    }




    render(){
        return (<>
            {this.state.showEventModal ?
                <EventModal
                    show={this.state.showEventModal}
                    eventData={this.state.eventModalData}
                    handleClose={this.handleCloseEventModal}
                    handleChange={this.handleEventModalChange}
                    handleVolunteerClick={this.handleVolunteerClick}
                /> : null
            }
            <UserModal
                show={this.state.showUserModal}
                userData={this.state.userModalData}
                handleClose={this.handleCloseUserModal}
                handleAdminChange={this.handleAdminChange}
            />
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
                <div style={{paddingTop: "10px", paddingBottom: "20px"}}>
                    {
                        this.state.tableViewUsers
                            ? null
                            : <Button href="/calendar">Calendar View</Button>
                    }
                    <ExportCSV csvData={this.state.tableViewUsers ? this.state.userData : this.state.eventData} fileName={"One Cool Earth Data"} />
                </div>
            </Container>
        </>
        )
    }
}

export default Spreadsheets
