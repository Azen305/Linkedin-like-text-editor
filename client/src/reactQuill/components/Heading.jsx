import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Heading = () => {
  const [heading, setHeading] = useState("");
  return (
    <InputGroup size='lg' className='my-4'>
      <Form.Control
        aria-label='Large'
        aria-describedby='inputGroup-sizing-sm'
        placeholder='Heading'
        onChange={(e) => setHeading(e.target.value)}
      />
    </InputGroup>
  );
};

export default Heading;
