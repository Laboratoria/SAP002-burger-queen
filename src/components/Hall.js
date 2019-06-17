import React from "react"
import firebase from '../firebaseConfig'
import { Button } from 'react-bootstrap'

class Hall extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    firebase.auth().signOut()
    .then(this.props.history.push(`/login`))
  }

  render() {
    return (
      <>
        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          onClick={this.logout}
          block>
          salão
</Button>
      </>

    )
  }
}


export default Hall