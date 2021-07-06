import React from 'react'
import IFrame from 'react-iframe';
import {Button, Modal} from 'react-bootstrap'

class Jotform extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         showModal: true
      }
      if(!this.props.email) {
         window.location.assign('/signup')
      }
   }

   componentDidMount = () => {
      this.getJotFormSubmission()
      this.timerId = setInterval(() => this.getJotFormSubmission(), 3000)
   }

   componentWillUnmount() {
      clearInterval(this.timerId)
   }

   handleClose = () => {
      this.setState({showModal: false})
   }

   checkAnswer = (answers) => {
      for (const [key, value] of Object.entries(answers)) {
         if (value.name === 'email' && value.answer && value.answer === this.props.email) {
            return true
         }
      }
      return false
   }

   getJotFormSubmission = () => {
      const jotformURL = `https://api.jotform.com/form/${this.process.env.REACT_APP_JOTFORM_FORM_ID}/submissions?apiKey=${this.process.env.REACT_APP_JOTFORM_API_KEY}`
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
                      body: JSON.stringify({email: this.props.email})
                   }).then( response => {
                      if(response.status === 200) {
                         this.props.handleLogin()
                      } else {
                         window.location.assign('/')
                      }
                   })
                }
             })
          })
   }

   render() {
      return (
          <div>
             <Modal centered show={this.state.showModal} onHide={this.handleClose}>
                <Modal.Header>
                   <Modal.Title style={{textTransform: 'uppercase'}}>Read carefully!!</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-center'>You should be redirected shortly after submitting this form.</Modal.Body>
                <Modal.Footer>
                   <Button variant="primary" onClick={this.handleClose}>
                      Close
                   </Button>
                </Modal.Footer>
             </Modal>
            <IFrame
               url={`https://form.jotform.com/${this.process.env.REACT_APP_JOTFORM_FORM_ID}`}
               width="100%"
               height="100%"
               position="absolute"
            />
          </div>
      )
   }
}

export default Jotform
