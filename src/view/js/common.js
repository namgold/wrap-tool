import PropTypes from 'prop-types';
// import io from 'socket.io-client';
import dateformat from 'dateformat';
const $ = window.$;

const T = {
    PropTypes,

    sexes: ['male', 'female'],

    randomPassword: length => Math.random().toString(36).slice(-length),

    isDebug: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'),

    download: (url, fileName) => {
        let link = document.createElement('a');
        link.target = '_blank';
        link.download = fileName;
        link.href = url;
        link.click();
    },

    getCookie: cname => {
        const name = cname + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trimStart();
            if (c.indexOf(name) === 0) {
                try {
                    return JSON.parse(c.substring(name.length, c.length));
                } catch {
                    return {};
                }
            }
        }
        return {};
    },

    setCookie: (cname, cvalue, exdays) => {
        let d = new Date();
        d.setTime(d.getTime() + ((exdays === undefined ? 60 : exdays) * 24 * 60 * 60 * 1000));
        document.cookie = cname + '=' + JSON.stringify(cvalue) + ';expires=' + d.toUTCString() + ';path=/';
    },

    validateEmail: email => (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i).test(String(email).toLowerCase()),

    dateToText: (date, format) => dateformat(date, format ? format : 'dd/mm/yyyy HH:MM:ss'),

    numberDisplay: number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),

    NOTIFY_TYPE: {
        DANGER: 'danger',
        SUCCESS: 'success',
        INFO: 'info',
        WARNING: 'warning'
    },
    notify: (message, type) => $.notify({ message }, { type, placement: { from: 'bottom' }, z_index: 2000 }),
};

export default T;