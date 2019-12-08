import React, {Component} from "react";
import ConnectInfoArea from "./ConnectInfoArea";
import QuillEditor from "./QuillEditor";
import "./App.css";
import marked from "marked";

export const translateMarkdown = (plainText, isGuardXss = false) => {
    return marked(isGuardXss ? xss(plainText) : plainText, {
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: true,
        smartLists: true,
        smartypants: true,
        highlight: function (code) {
            /*eslint no-undef: "off"*/
            return hljs.highlightAuto(code).value
        }
    })
};


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textValArea1: document.createElement('textArea1'),
            textValArea2: document.createElement('textArea2'),
            connectVal: document.createElement('connectInfo'),
            ip_address: 'loading...',
            location: []
        };
        this.readme = "# 6770 ELEN Course Project\n" +
            "## You can find source codes and project description in " +
            "[here](https://github.com/camelboat/6770_ELEN_Cloud_Project).\n" +
            "- Author: Changxu Luo, cl3875\n" +
            "- Instructor: Professor Krishan Sabnani and Professor Thomas Woo\n" +
            "- Course Assistant: Xiaoyang Liu";
        this.readme_HTML = translateMarkdown(this.readme);
        console.log(this.readme_HTML);
        console.log("app constructor");
    }

    render() {
        return (
            <div className="App">
                <div className="horizontal">
                    <div id="editor-container1">
                        <div id="editor1">
                            <div className={"content"} dangerouslySetInnerHTML={{__html: this.readme_HTML}}></div>
                        </div>
                    </div>
                    <div id="editor-container2">
                        <div id={"editor2"}>
                            <ConnectInfoArea/>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="horizontal">
                    <div id="editor-container1">
                        <div id="editor1">
                            <QuillEditor
                                socketurl={"ws://3.136.85.49:3000"}
                                elementName={"textArea1"}
                                roomName={"room 1"}
                            />
                        </div>
                    </div>
                    <div id="editor-container2">
                        <div id={"editor2"}>
                            <QuillEditor
                                socketurl={"ws://3.136.85.49:3000"}
                                elementName={"textArea2"}
                                roomName={"room 2"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

