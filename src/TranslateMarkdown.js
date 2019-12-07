import React, {Component} from "react";
import {WebsocketProvider} from "yjs/provider/websocket";
import {YText} from "yjs/types/YText";
import {TextareaBinding} from "yjs/bindings/textarea";
import {DomBinding} from "yjs/bindings/dom/DomBinding";
import marked from 'marked'
import {QuillBinding} from "yjs/bindings/quill";
import ReactQuill from "react-quill";
import ReactHtmlParser from 'react-html-parser';
import ReactDOM, {findDOMNode} from 'react-dom';

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

