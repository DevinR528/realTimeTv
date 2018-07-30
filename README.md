## RealTime-TV
built with [Create React App](https://github.com/facebookincubator/create-react-app) and socket.io

## Check it out
[Real-Time TV](https://google.com)

## Installing and using the component

```bash
npm i --save real-time-tv?
```
or clone the repo and run in dev server port is set to 5000

```bash
npm install
npm start 
```

### your server will have to respond to the following events

```
`newVideo` event
`isReady` event
`stateChange` event
`placeChange` event
```

here is the example server responding to the events
```js
io.on("connection", socket => {
    const userId = socket.id;
    connIds.push(userId);

    // newVideo event
    socket.on("newVideo", vidObj => {
        const objSend = {
            url: vidObj.url,
            id: vidObj.vidId,
            screenState: vidObj.screenState,
            controlId: vidObj.controlId
        };
        io.emit("updateVideo", objSend);
    });

    // isReady when all are ready emit allIsReady
    socket.on("isReady", socketId => {
        clientIds.push(socketId.ids);

        let objSend = {
            msg: null
        };
        const clients = Object.keys(io.sockets.sockets);

        promisePoller({
                taskFn: () => {
                    return new Promise((resolve, reject) => {
                        if (clients.length === clientIds.length) {
                            resolve(true);
                        } else {
                            reject(`${clients.length - clientIds.length}`);
                        }
                    });
                },
                interval: 500,
                retries: 5,
            })
            .then(poll => {
                if (poll === true) {
                    io.emit("allIsReady");
                }
            }).catch(err => {
                objSend.msg = `${err[err.length]} user(s) not connected.`;
                io.emit("allIsReady", objSend);
            });
    });

    // stateChange event
    socket.on("stateChange", stateObj => {

        const objSend = {
            state: stateObj.state
        };
        socket.broadcast.emit("updateState", objSend);
    });

    // placeChange event
    socket.on("placeChange", placeObj => {

        const objSend = {
            place: placeObj.ytPlace
        };
        io.emit("updatePlace", objSend);
    });

    socket.on("disconnect", () => {
        console.log(`user disconnected`);
        const id = socket.id;
        const newConnIdArr = filterIds(connIds, id);
        const newClientIdArr = filterIds(clientIds, id);
        connIds = newConnIdArr;
        clientIds = newClientIdArr;
    });
});
```