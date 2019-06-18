import React from "react"
import firebase from './firebaseConfig'
import { Button } from 'react-bootstrap'

class Kitchen extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    firebase.auth().signOut()
    .then(this.props.history.push(`/`))
  }

  render() {
    return (
      <div>
        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          onClick={this.logout}
          block>
          cozinha
</Button>
      </div>

    )
  }
}

export default Kitchen