import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import './index.css';
// socket.io support
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';



const socket = io.connect(process.env.SOCKET_URL);

    socket.on('connect', function(){ console.log('socket.io connected')});
    socket.on('event', msg => console.log(msg));

// Mount point for the app with react wrapper
ReactDOM.render(
  <SocketProvider socket={socket}>
    <App />
  </SocketProvider>, document.querySelector('#root')
);
