import React, { Component } from "react";
import {YText} from "yjs/types/YText";
import {WebsocketProvider} from "yjs/provider/websocket";
import {QuillBinding} from 'yjs/bindings/quill.js'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class QuillEditor extends Component {
    constructor(props) {
        super(props);
        this.provider = new WebsocketProvider(this.props.socketurl);
        this.ydocument = this.provider.get(this.props.elementName);
        this.type = this.ydocument.define(this.props.elementName, YText);
        this.quillRef = null;
        this.reactQuillRef = null;
        this.formats = [
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'video'
        ];
        this.modules = {
            toolbar: [
                [{'header': [1, 2, false]}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'video'],
                ['clean']
            ],
        };
        this.element = document.createElement("a");
    }

    componentDidMount() {
        this.attachQuillRefs();
        new QuillBinding(this.type, this.quillRef);
    }

    attachQuillRefs =()=>{
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
        console.log("attachQuillRefs");
    };

    saveFile = () => {
        const editor = this.reactQuillRef.getEditor();
        const unprivilegedEditor = this.reactQuillRef.makeUnprivilegedEditor(editor);
        let text_HTML = unprivilegedEditor.getHTML();
        // console.log(text_HTML);
        const file = new Blob([text_HTML], {type: 'text/plain'});
        this.element.href = URL.createObjectURL(file);
        this.element.download = "myFile.html";
        document.body.appendChild(this.element);
        this.element.click();
        URL.revokeObjectURL(this.element.href);
    };

    render() {
        return (
            <div>
                <ul>{"Editor "+this.props.roomName}</ul>
                <ReactQuill
                    ref={(el) => {
                        this.reactQuillRef = el
                    }}
                    formats={this.formats}
                    theme={'snow'}
                    modules={this.modules}
                    placeholder={"Type something here"}
                />
                <button onClick={this.saveFile}>Save File</button>
            </div>
        );
    }
}

// const QuillEditor = () => {
//     console.log("QuillEditor");
//     let quillRef = null;
//     let reactQuillRef = null;
//     let formats = [
//         'header', 'font', 'size',
//         'bold', 'italic', 'underline', 'strike', 'blockquote',
//         'list', 'bullet', 'indent',
//         'link', 'image', 'video'
//     ];
//     let modules = {
//         toolbar: [
//             [{'header': [1, 2, false]}],
//             ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//             [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
//             ['link', 'image', 'video'],
//             ['clean']
//         ],
//     };
//     const element = document.createElement("a");
//
//     React.useEffect(() => {
//         console.log("useEffect");
//         attachQuillRefs();
//         // const provider = new WebsocketProvider("wss://cloud-computing-project-cl3875.herokuapp.com/");// change to 'ws://localhost:3000' for local development
//         const provider = new WebsocketProvider('ws://3.136.85.49:3000');
//         const ydocument = provider.get("textarea");
//         const type = ydocument.define("textarea", YText);
//         new QuillBinding(type, quillRef);
//     }, []);
//
//     const attachQuillRefs = () => {
//         if (typeof reactQuillRef.getEditor !== 'function') return;
//         quillRef = reactQuillRef.getEditor();
//         console.log("attachQuillRefs");
//     };
//
//     const saveFile = () => {
//         let range = quillRef.getSelection();
//         let position = range ? range.index : 0;
//         let text = quillRef.getText();
//         // console.log(text);
//         const editor = reactQuillRef.getEditor();
//         const unprivilegedEditor = reactQuillRef.makeUnprivilegedEditor(editor);
//         let text_HTML = unprivilegedEditor.getHTML();
//         // console.log(text_HTML);
//         const file = new Blob([text_HTML], {type: 'text/plain'});
//         element.href = URL.createObjectURL(file);
//         element.download = "myFile.html";
//         document.body.appendChild(element);
//         element.click();
//         URL.revokeObjectURL(element.href);
//         // quillRef.insertText(position, 'Hello, World! ')
//     };
//
//     return (
//         <div>
//             <ReactQuill
//                 ref={(el) => {
//                     reactQuillRef = el
//                 }}
//                 formats={formats}
//                 theme={'snow'}
//                 modules={modules}
//                 placeholder={"Type something here"}
//             />
//             <button onClick={saveFile}>Save File</button>
//         </div>
//     )
// };
//
// export default QuillEditor;
