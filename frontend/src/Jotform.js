import React from 'react'
import JotformEmbed from 'react-jotform-embed';
import {Button, Modal} from 'react-bootstrap'

const apiKey = ''
const formID = '70895957565174'
class Jotform extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         showModal: true
      }
   }

   componentDidMount = () => {
      this.getJotFormSubmission()
      this.timerId = setInterval(() => this.getJotFormSubmission(), 5000)
   }

   componentWillUnmount() {
      clearInterval(this.timerId)
   }

   handleClose = () => {
      this.setState({showModal: false})
   }

   getJotFormSubmission = () => {
      const url = `https://api.jotform.com/form/${formID}/submissions?apiKey=${apiKey}`
      fetch(url)
          .then(response => {
            return response.json()
          })
          .then(data => {
             console.log(data)
          })
   }

   render() {
      return (
          <div>
             <Modal centered show={this.state.showModal} onHide={this.handleClose}>
                <Modal.Header>
                   <Modal.Title style={{textTransform: 'uppercase'}}>Please read!</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-center'>You should be redirected shortly after submitting this form.</Modal.Body>
                <Modal.Footer>
                   <Button variant="primary" onClick={this.handleClose}>
                      Close
                   </Button>
                </Modal.Footer>
             </Modal>
            <JotformEmbed src={`https://form.jotform.com/${formID}`} />
          </div>
      )
   }
}

export default Jotform
