import React from 'react';
import '../css/App.css';
import T from '../js/common';
const $ = window.$;

class App extends React.Component {
    constructor() {
        super();
        this.max = 200;
        this.min = 1;
    }

    convert = e => {
        const input = $('#input').val();
        if (!input) return;
        let width = $('#width').val();
        if (isNaN(width)) return;
        width = Number(width);
        if (width < this.min || width > this.max) return;
        const output = input.split('\n').map(i => i.slice(1)).join('').match(new RegExp('.{1,'+width+'}', 'g')).map(i => ' ' + i).join('\n');
        $('#output').val(output);
    }

    copy() {
        var copyText = document.getElementById("output");
        copyText.select();
        copyText.setSelectionRange(0, 999999999999999);

        document.execCommand("copy");
        copyText.setSelectionRange(0, 0);

        T.notify('Copied', 'success');
    }

    selectAll() {
        var copyText = document.getElementById("output");
        copyText.select();
        copyText.setSelectionRange(0, 999999999999999);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Wrap text tool</h1>
                    <div className='row' style={{ height: '500px', width: '1800px' }}>
                            <div className='ta input col-5'>
                                <div>
                                    <label htmlFor='input'>Input</label>
                                    <label>
                                    Width:&nbsp;
                                        <input id='width' type='Number' defaultValue={70} max={this.max} min={this.min}/>
                                    </label>
                                </div>
                                <textarea id='input'/>
                            </div>
                        <div className='convert-container col-2'>
                            <button className='btn btn-success convert-button' onClick={this.convert}>Convert</button>
                        </div>
                        <div className='ta output col-5'>
                            <div>
                                <label htmlFor='output'>Output</label>
                                <div>
                                    <button className='btn btn-warning' onClick={this.selectAll}>Select all</button>
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