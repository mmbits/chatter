# chatter

**this is a real time chat app built with React**

```js
componentWillMount(){
    firebase.initializeApp({
        apiKey: "AIzaSyBAJVwrP5J4AhVKd5ijYtcTF9XMV6tIcY4",
        authDomain: "msgr-2.firebaseapp.com",
        projectId: "msgr-2",
        storageBucket: "msgr-2.appspot.com",
    });

    this.db = firebase.firestore();

    this.db.collection("messages").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            this.gotMessage(change.doc.data())
        }
        })
    })
}

send = (m) => {
    this.db.collection("messages").add({
        text: m,
        from: this.state.name || 'No name',
        ts: Date.now()
    })
}
```