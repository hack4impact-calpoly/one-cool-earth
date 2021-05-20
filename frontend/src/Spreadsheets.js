import React from 'react';
import {Table, Container, Row, Col, Button} from "react-bootstrap";
import '../src/css/Spreadsheets.css';
import { ExportCSV } from './ExportCSV.js'
import Toggle from 'react-toggle'
import UserModal from './UserModal.js'


const userData = {rows:
    [
    {
        id: 1,
        firstName: "Quentin",
        lastName: "Monasterial",
        email: "q@gmail.com",
        phone: "1234567890",
        eventIds: [1, 2, 3]
    },
    {
        id: 2,
        firstName: "Ella",
        lastName: "Tadmor",
        email: "e@gmail.com",
        phone: "1234567890",
        eventIds: [1, 2, 3]
    },
    {
        id: 3,
        firstName: "Sarah",
        lastName: "Skykora",
        email: "s@gmail.com",
        phone: "1234567890",
        eventIds: [1, 2, 3]
    },
    {
        id: 4,
        firstName: "Quentin",
        lastName: "Monasterial",
        email: "q@gmail.com",
        phone: "1234567890",
        eventIds: [1, 2, 3]
    },
    {
        id: 5,
        firstName: "Ella",
        lastName: "Tadmor",
        email: "e@gmail.com",
        phone: "1234567890",
        eventIds: [1, 2, 3]
    },
    {
        id: 6,
        firstName: "Sarah",
        lastName: "Skykora",
        email: "s@gmail.com",
        phone: "1234567890",
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
            userModalData: {}
        }
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
                            {/* <th>Events</th> */}
                        </tr>
                    </thead>
                <tbody>
                    {userData.rows.map(user => (
                        <tr onClick={() => this.handleShowUserModal(user)}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                    )) }
                </tbody>
                </>
            )
        } else if (this.state.tableViewUsers === false) {
            return (
                <>
                <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Location</th>
                            {/* <th>Volunteers</th> */}
                        </tr>
                    </thead>
                <tbody>
                    {eventData.rows.map(event => (
                        <tr>
                            <td>{event.id}</td>
                            <td>{event.name}</td>
                            <td>{event.date}</td>
                            <td>{event.time}</td>
                            <td>{event.location}</td>
                        </tr>
                    )) }
                </tbody>
                </>
            )}
    }




    render(){
        return (<body>
            
            <UserModal show={this.state.showUserModal} userData={this.state.userModalData} handleClose={this.handleCloseUserModal}></UserModal>
            <Container>
            <Button variant="primary" onClick={() => this.handleShowUserModal()}>
        Custom Width Modal
      </Button>
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
                <ExportCSV csvData={this.state.tableViewUsers ? userData : eventData} fileName={"One Cool Earth Data"}></ExportCSV>

                </div>
                
                
            </Container>
        </body>
        )
    }
}

export default Spreadsheets;
