import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddCoverIMG from "./reactQuill/components/AddCoverIMG";
import Heading from "./reactQuill/components/Heading";
import TextEditor from "./reactQuill/TextEditor";

const App = () => {
  return (
    <>
      {/* <TextEditor /> */}
      <div className='mx-4 my-4'>
        <Heading />
        <AddCoverIMG />
        <TextEditor />
      </div>
    </>
  );
};

export default App;
