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

---

```
git commit -am "jdsjkd"
```

```
git tag v1.0.0
```
---

# Deploy

```
npm run build
```

irá criar a pasta build.

mude a configuração no arquivo `firebase.json` para que ele abra o **hosting** na pasta **build** ao invés de public:


```
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "functions": {
    "predeploy": [
      "npm --prefix \"$RESOURCE_DIR\" run lint"
    ],
    "source": "functions"
  },
  "hosting": {
    "public": "build", // mudar aqui 
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

```
firebase deploy --only hosting
```
