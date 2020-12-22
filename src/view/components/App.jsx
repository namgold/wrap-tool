import React from 'react';
import '../css/App.css';
import T from '../js/common';
const $ = window.$;

function remove_duplicates_safe(arr) {
    var seen = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        if (!(arr[i] in seen)) {
            ret_arr.push(arr[i]);
            seen[arr[i]] = true;
        }
    }
    return ret_arr;
}

class App extends React.Component {
    convert = e => {
        try {
            let input = $('#input').val();
            if (!input) throw new Error('Empty input');
            if (input.slice(0, 16) !== 'Import-Package: ') throw new Error('Invalid input format');
            input = input.slice(15);
            const width = 70;
            const output = ('mport-Package: ' + remove_duplicates_safe(input.split('\n').map(i => i.slice(1)).join('').split(','))).match(new RegExp('.{1,'+(width-1)+'}', 'g')).map((i,index) => (index > 0 ? ' ' : 'I') + i).join('\n');
            $('#output').val(output);
            T.notify('Convert successfully', T.NOTIFY_TYPE.SUCCESS);
        } catch (e) {
            T.notify(e.message, T.NOTIFY_TYPE.DANGER);
        }
    }

    copy() {
        try {

            var copyText = document.getElementById("output");
            if (!copyText || !copyText.value) throw new Error('Nothing to copy');
            copyText.select();
            copyText.setSelectionRange(0, 999999999999999);

            document.execCommand("copy");
            copyText.setSelectionRange(0, 0);

            T.notify('Copied', T.NOTIFY_TYPE.SUCCESS);
        } catch (e) {
            T.notify(e.message, T.NOTIFY_TYPE.DANGER);
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>SUBSYSTEM.MF tool</h1>
                    <div className='row' style={{ height: '500px', width: '1400px' }}>
                            <div className='ta input col-5'>
                                <div>
                                    <label htmlFor='input'>Input</label>
                                    <div>
                                        {/* <button className='btn btn-info' onClick={this.copy}><i className="fas fa-upload"/> Upload</button> */}
                                    </div>
                                </div>
                                <textarea id='input' placeholder='Import-Package: ...'/>
                            </div>
                        <div className='convert-container col-2'>
                            <button className='btn btn-success convert-button' onClick={this.convert}>Convert</button>
                        </div>
                        <div className='ta output col-5'>
                            <div>
                                <label htmlFor='output'>Output</label>
                                <div>
                                    <button className='btn btn-success' onClick={this.copy}>Copy</button>
                                </div>
                            </div>
                            <textarea id='output' readOnly={true}/>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;