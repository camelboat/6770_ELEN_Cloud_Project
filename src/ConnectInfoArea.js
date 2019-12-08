import React, {Component} from "react";
import {YText} from "yjs/types/YText";
import {WebsocketProvider} from "yjs/provider/websocket";
import ReactQuill from "react-quill";
import {QuillBinding} from "yjs/bindings/quill";
import publicIP from 'react-native-public-ip';
import axios from "axios";
import 'react-quill/dist/quill.bubble.css';

export default class ConnectInfoArea extends Component {
    constructor(props) {
        super(props);
        console.log("yjstextarea constructor");
        this.textRef = null;
        this.reactTextRef = null;
        this.ip_address = "";
        this.location = [];
        this.date = new Date();
        this.provider = new WebsocketProvider('ws://3.136.85.49:3000');
        this.ydocument = this.provider.get("connectInfo");
        this.type = this.ydocument.define("connectInfo", YText);
    }

    componentDidMount() {
        this.attachQuillRefs();
        new QuillBinding(this.type, this.textRef);
        console.log(this.ydocument);
        console.log(this.ydocument.getAwarenessInfo());
        console.log(this.ydocument.getLocalAwarenessInfo());
        console.log(this.ydocument.awareness.values());
        console.log("type: ", this.type);
        console.log(this.textRef);
        publicIP()
            .then(ip => {
                console.log(ip);
                this.ip_address = ip;
                axios.get("http://ip-api.com/json/" + ip)
                    .then(res => {
                        const location_tmp = res.data;
                        console.log(res.data);
                        // this.setState({location: location_tmp});
                        this.location = location_tmp;
                        const log = this.ip_address + " from " + this.location.city + " at " + this.date + "\n";
                        this.textRef.insertText(0, log);
                        // this.textRef.deleteText(0, "Current connection number: 1\n".length);
                        this.connectNum = this.ydocument.getAwarenessInfo().size+1;
                        const logNum = "Current connection number: " + this.connectNum + "\n";
                        this.textRef.insertText(0, logNum);
                    });
                console.log(this.location);
            })
            .catch(error => {
                console.log(error);
                // 'Unable to get IP address.'
            });
    }

    componentWillUnmount() {
        const range = this.textRef.getSelection();
        const position = range ? range.index : 0;
        this.textRef.insertText(position, "unmount");
        // clearInterval(this.timerID);
    }

    attachQuillRefs = () => {
        if (typeof this.reactTextRef.getEditor !== 'function') return;
        this.textRef = this.reactTextRef.getEditor();
        console.log("attachQuillRefs");
    };

    render() {
        return (
            <div>
                <ReactQuill
                    ref={(el) => {
                        this.reactTextRef = el
                    }}
                    theme={null}
                    // readOnly={true}
                />
            </div>
        );
    }
}
