import {Base64} from 'js-base64';

export const encode = (uncoded_val, isBoolean) => {
    if(isBoolean) uncoded_val = uncoded_val * 1500;

    let encoded_val = Base64.encode(uncoded_val);
    if(encoded_val.includes('==') ||  encoded_val.includes('=')) {
        encoded_val = encoded_val.replace('==','').replace('=','');
    }

    return encoded_val;
};

export const decode = (encoded_val, isBoolean) => {
    let decoded_val = Base64.decode(encoded_val);

    if(isBoolean) decoded_val = decoded_val / 1500;

    return decoded_val;
};
