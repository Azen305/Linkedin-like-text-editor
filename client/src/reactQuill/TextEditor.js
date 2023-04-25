import React, { useCallback, useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import "./css/textEditor.css";
import { io } from "socket.io-client";

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = {
  container: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ],
  // handlers: { undo: undoChange, redo: redoChange },
};

const TextEditor = () => {
  const [socket, setSocket] = useState(null);
  const [quill, setQuill] = useState(null);

  // USEREF TO INITIALIZE QUILL IN A PROPER MANNER
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const get_Quill = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    setQuill(get_Quill);
  }, []);

  // USEEFFECT TO RECEIVE CHANGES FROM COLABORATION
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      console.log("delta", delta);
      quill.updateContents(delta);
    };
    socket.on("received-changes", handler);
    return () => {
      socket.off("received-changes", handler);
    };
  }, [socket, quill]);

  // USEEFFECT TO SEND CHANGES TO COLABORATION
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
      // console.log("delta", delta);
    };
    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  // USEEFFECT TO GET CONNECTED TO SOCKET.IO SERVEER AND COMMUNICATION THROUGH WEBSOCKET
  useEffect(() => {
    const sckt = io("http://localhost:3001");
    console.log("socket", sckt);
    setSocket(sckt);

    return () => {
      sckt.disconnect();
    };
  }, []);

  // USEEFFECT TO GET EMBEDED HTML
  useEffect(() => {
    if (quill == null) return;

    const handler = () => {
      const delta = quill.getContents();
      const text = quill.getText();
      const html = quill.root.innerHTML;
      console.log("delta", delta);
      console.log("text", text);
      console.log("html", html);
      //  setText(text);
      //  setHtml(html);
    };

    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
    };
  }, [quill]);

  // FUNCTIONS
  

  return <div className='container' ref={wrapperRef}></div>;
};

export default TextEditor;
