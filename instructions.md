https://pt-br.reactjs.org/docs/create-a-new-react-app.html

* No local onde deseja criar

```$
npm init react-app nome-da-app
```

ou

```$
npm install -g create-react-app
```

```$
npm start
```

---

npm i --save firebase

import firebase from 'firebase';

const firebaseConfig = {
  ...
}

firebase.initializeApp(firebaseConfig);

export default 

import firebase from './firebaseConfig';

---

const database = firebase.firestore();

---
handleClick = () => {
  const object = {
    ...
  }
  database.collection('laboratoria').add(object)
}


---

npm i --save react-router-dom

---


npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/react-fontawesome

```
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
 
const element = <FontAwesomeIcon icon={faCoffee} />
```

npm install -g firebase-tools

firebase deploy --only functions
