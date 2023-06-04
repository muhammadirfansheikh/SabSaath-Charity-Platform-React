import React, { useState } from 'react'
import {Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"


export const ModalJobList = (props) => {

 

  function toggle() {
    
    props.closeNewmodal();
  }
  
  React.useEffect(() => {
    // need to define the function and call it separately
    const load = async () => {
      
    };
    load();
  }, []);


  return (

    <Modal isOpen={props.Ismodalshow} toggle={toggle}>
      <ModalHeader
        toggle={toggle}>{props.HeaderText}</ModalHeader>
      <ModalBody>
          <Form>
            <Row form>
              <Col className="px-1" md="6">
                <FormGroup>
                  <Label>User Name</Label>
                  <Input
                    placeholder="User Name"
                    type="text"
                    name="userName"
                    
                  />
                </FormGroup>
              </Col>
              
            </Row>
            <Row>
              <Col className="px-1" md="6">
                <FormGroup>
                  <Label>Email Address</Label>
                  <Input
                    placeholder="Email"
                    type="text"
                    name="emailAddress"
                    
                  />
                </FormGroup>
              </Col>
              <Col className="px-1" md="6">
                <FormGroup>
                  <Label>Roles</Label>
                  <Input
                    name="rolevalues"
                    type="select"
                    
                  >
                    <option key={0} value={0}>
                      Select
                    </option>
                 
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            
          </Form>
      </ModalBody>
      <ModalFooter>
              <Button color="primary" size="sm">Save</Button>
              <Button color="secondary" size="sm" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>

  );
}

export default ModalJobList;