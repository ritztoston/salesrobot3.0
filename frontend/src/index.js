import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";
import blue from "@material-ui/core/es/colors/blue";
import {SnackbarProvider} from 'notistack';
import Button from "@material-ui/core/Button";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: {
            main: '#FFFFFF'
        }
    },
    typography: {
        useNextVariants: true,
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <SnackbarProvider
            maxSnack={3}
            action={[
                <Button color="secondary" size="small">
                    {'Dismiss'}
                </Button>
            ]}
        >
            <App />
        </SnackbarProvider>
    </MuiThemeProvider>
    , document.getElementById('root'));

serviceWorker.unregister();
