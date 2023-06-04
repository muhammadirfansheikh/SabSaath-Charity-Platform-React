import React, { useState } from 'react'
import {Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"

export const ModalApplHistory = (props) => {

  function toggle()
  {
    props.closeNewmodal();
  }
  
return(

    <Modal isOpen={props.Ismodalshow} toggle={toggle}>
      <ModalHeader
        toggle={toggle}>{props.HeaderText}</ModalHeader>
      <ModalBody>
          
      </ModalBody>
      <ModalFooter>
            <Button color="primary" size="sm">Save</Button>
            <Button color="secondary" size="sm" onClick={toggle}>Closessss</Button>
      </ModalFooter>
    </Modal>

  );
}

export default ModalApplHistory;