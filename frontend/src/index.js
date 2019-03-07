import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";
import blue from "@material-ui/core/es/colors/blue";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: {
            main: '#FFFFFF'
        }
    },

});

ReactDOM.render(<MuiThemeProvider theme={theme}><App /></MuiThemeProvider>, document.getElementById('root'));

serviceWorker.unregister();
