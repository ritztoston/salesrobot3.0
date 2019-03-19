import React from 'react';
import Typography from "@material-ui/core/Typography";

const styleActive = {
    padding: '5px 10px',
    color: '#FFFFFF',
    borderRadius: '30px',
    backgroundColor: '#0090ff',
    display: 'inline-block',
};

const styleSent = {
    padding: '5px 10px',
    color: '#FFFFFF',
    borderRadius: '30px',
    backgroundColor: '#00bc5c',
    display: 'inline-block',
};

const styleSuspended = {
    padding: '5px 10px',
    color: '#FFFFFF',
    borderRadius: '30px',
    backgroundColor: '#bc0025',
    display: 'inline-block',
};

const styleDraft = {
    padding: '5px 10px',
    color: '#000000',
    borderRadius: '30px',
    backgroundColor: '#e4e3f2',
    display: 'inline-block',
};

const BubbleText = ({text}) => (
    <Typography component="div" style={text === 'Sending' ? styleActive : (text === 'Sent' ? styleSent : (text === 'Suspended' ? styleSuspended : (text === 'Draft' ? styleDraft : null)))}>
        {text}
    </Typography>
);

export default BubbleText;