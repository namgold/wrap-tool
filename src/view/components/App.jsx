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
    state = { isShowHowToUse: false };

    convert = e => {
        try {
            let input = $('#input').val();
            if (!input) throw new Error('Empty input');
            if (input.slice(0, 16) !== 'Import-Package: ' && input.slice(0, 16) !== 'Export-Package: ') throw new Error('Invalid input format');
            const width = 70;
            const isImport = input.slice(0, 16) === 'Import-Package: ';
            input = input.slice(15);
            let output = '';
            if (isImport) {
                output = ('mport-Package: ' + remove_duplicates_safe(input.replace(/\s/g, '').split(/(?<!\[[.0-9]+),/g))).match(new RegExp('.{1,' + (width - 1) + '}', 'g')).map((i, index) => (index > 0 ? ' ' : 'I') + i).join('\n');
            } else {
                throw new Error('Export-Package is not support yet!');
            }
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

    genExample = () => {
        let example = ['org.apache.camel', 'org.apache.camel.spi', 'org.osgi.framework', 'org.slf4j', 'javax.activation', 'javax.crypto', 'javax.crypto.spec', 'javax.mail', 'javax.mail.internet', 'javax.net.ssl', 'javax.security.auth.x500', 'javax.security.cert', 'javax.xml.parsers', 'javax.xml.transform', 'javax.xml.transform.dom', 'javax.xml.transform.stream', 'org.apache.commons.codec', 'org.apache.commons.codec.binary', 'org.w3c.dom', 'org.xml.sax', 'org.xml.sax.helpers', 'javax.xml.bind', 'javax.servlet', 'javax.servlet.http', 'javax.xml.namespace', 'org.apache.commons.compress.compressors.bzip2', 'org.apache.commons.compress.compressors.xz', 'org.apache.commons.compress.utils', 'com.sap.it.api', 'com.sap.it.api.adapter.monitoring', 'com.sap.it.api.ccs.adapter', 'com.sap.it.api.ccs.adapter.exception', 'com.sap.it.api.exception', 'com.sap.it.api.keystore', 'com.sap.it.api.keystore.exception', 'com.sap.it.api.msglog.adapter', 'com.sap.it.api.securestore', 'com.sap.it.api.securestore.exception', 'javax.sql', 'javax.tools', 'org.apache.camel.impl', 'org.apache.camel.language.simple', 'org.apache.camel.util', 'javax.naming', 'javax.naming.directory', 'javax.crypto.interfaces', 'javax.ws.rs', 'javax.ws.rs.client', 'javax.ws.rs.core', 'javax.ws.rs.ext', 'javax.xml.bind.annotation', 'javax.xml.bind.annotation.adapters', 'javax.jmdns', 'javax.jms', 'javax.management', 'org.osgi.framework.wiring', 'javax.imageio', 'javax.management.openmbean', 'javax.net', 'javax.security.auth', 'javax.security.auth.callback', 'javax.security.auth.login', 'javax.validation', 'javax.xml.datatype', 'org.w3c.dom.bootstrap', 'org.w3c.dom.ls', 'javax.imageio.spi', 'javax.imageio.stream', 'javax.naming.ldap', 'javax.security.auth.kerberos', 'javax.security.sasl', 'javax.validation.constraints', 'javax.validation.metadata', 'javax.xml.stream', 'javax.xml.transform.sax', 'org.apache.commons.beanutils', 'org.apache.commons.collections', 'org.apache.commons.digester', 'org.apache.commons.digester.substitution', 'org.apache.commons.digester.xmlrules', 'org.apache.commons.jexl2', 'org.apache.commons.jxpath', 'org.apache.commons.jxpath.ri', 'org.apache.commons.jxpath.ri.compiler', 'org.apache.commons.jxpath.ri.model', 'org.apache.commons.lang3', 'org.apache.commons.lang3.exception', 'org.apache.commons.lang3.tuple', 'org.apache.commons.vfs2', 'org.apache.commons.vfs2.provider', 'org.slf4j.event', 'org.slf4j.helpers', 'org.slf4j.impl', 'org.slf4j.spi', 'com.sap.it.api.asdk.cloud.authentication', 'javax.xml', 'com.sap.it.op.component.check', 'org.osgi.service.blueprint.container', 'com.sap.it.nm.component', 'com.sap.esb.monitoring.messages.adapter', 'com.sap.core.tenant.api;resolution:=optional', 'com.sap.esb.datastore', 'com.sap.esb.security', 'com.sap.it.nm.concurrent', 'com.sap.it.nm.security', 'com.sap.it.rt.scc.connectivity', 'org.quartz', 'org.springframework.jdbc.datasource', 'org.springframework.transaction', 'org.springframework.transaction.support', 'com.google.gson;version="[2.8,3)"', 'com.google.gson.annotations;version="[2.8,3)"', 'com.google.gson.internal;version="[2.8,3)"', 'com.google.gson.internal.bind;version="[2.8,3)"', 'com.google.gson.internal.bind.util;version="[2.8,3)"', 'com.google.gson.reflect;version="[2.8,3)"', 'com.google.gson.stream;version="[2.8,3)"', 'io.netty.bootstrap', 'io.netty.buffer', 'io.netty.channel', 'io.netty.channel.epoll', 'io.netty.channel.group', 'io.netty.channel.kqueue', 'io.netty.channel.nio', 'io.netty.channel.socket', 'io.netty.channel.socket.nio', 'io.netty.channel.unix', 'io.netty.handler.codec', 'io.netty.handler.codec.http', 'io.netty.handler.codec.http.cookie', 'io.netty.handler.codec.http.websocketx', 'io.netty.handler.codec.http.websocketx.extensions.compression', 'io.netty.handler.logging', 'io.netty.handler.proxy', 'io.netty.handler.ssl', 'io.netty.handler.ssl.util', 'io.netty.handler.stream', 'io.netty.resolver', 'io.netty.util;version="4.1.48"', 'io.netty.util.collection;version="4.1.48"', 'io.netty.util.concurrent;version="4.1.48"', 'io.netty.util.internal;version="4.1.48"', 'io.netty.util.internal.logging;version="4.1.48"', 'io.netty.util.internal.svm;version="4.1.48"', 'org.apache.cxf.jaxrs.impl'];
        example.shuffle();
        example.splice(example.length - Math.ceil(130 * Math.random()), 999999);
        let n = 0;
        example = 'Import-Package: ' + example.join(',');
        while (n < example.length) {
            const randomFactor = Math.random() * 10;
            n += 69 + (randomFactor < 4 ? randomFactor - 2 : 0);
            example = example.slice(0, n) + '\n ' + example.slice(n);
        }
        $('#input').val(example);
        $('#output').val('');
    }

    showHowToUse = e => {
        e.preventDefault();
        this.setState({ isShowHowToUse: !this.state.isShowHowToUse });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>SUBSYSTEM.MF tool</h1>
                    <div className='row' style={{ height: '500px', width: '1800px' }}>
                            <div className='ta input col-5'>
                                <div>
                                    <label htmlFor='input'>Input</label>
                                    <div>
                                        <button className='btn btn-success' onClick={this.genExample}><i className="fas fa-file-alt"/>&nbsp;Example</button>
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
                                    <button className='btn btn-success' onClick={this.copy}><i className="fas fa-copy"/>&nbsp;Copy</button>
                                </div>
                            </div>
                            <textarea id='output' readOnly={true}/>
                        </div>
                    </div>
                    <h6 className='mt-4'>Author: <a href='https://github.com/namgold'>Dominik Nam Nguyen</a></h6>
                    <h6 className=''>Source code: <a href='https://github.com/namgold/wrap-tool'>https://github.com/namgold/wrap-tool</a></h6>
                    <h6 className=''><a href='#' onClick={this.showHowToUse}>{this.state.isShowHowToUse ? 'Hide' : 'How To Use?'}</a></h6>
                    <div style={{ display: this.state.isShowHowToUse ? 'block' : 'none' }}>
                        <h4>1. Copy đoạn Import-package cần align thẳng hàng</h4>
                        <img src='img/1.png' width='1000px'/>
                        <h4>2. Paste vào ô input</h4>
                        <img src='img/2.png'/>
                        <h4>3. Nhấn nút Convert</h4>
                        <img src='img/3.png'/>
                        <h4>4. Kết quả xuất hiện ở ô Output</h4>
                        <img src='img/4.png'/>
                        <h4>5. Nhấn nút copy để copy Output</h4>
                        <img src='img/5.png'/>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;