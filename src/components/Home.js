import React from "react"
import firebase from '../firebaseConfig'
import { Button } from 'react-bootstrap'

class Home extends React.Component {
  constructor() {
      super();
      this.logout = this.logout.bind(this);
  }

  logout() {
      firebase.auth().signOut();
  }

  render() {
      return (
        <Button
              variant="primary"
              type="submit"
              className="mt-3"
              onClick={this.logout}
              block>
              Logout
              </Button>
      );

    }

}

export default Home