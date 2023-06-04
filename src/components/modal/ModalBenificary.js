import React,{useState} from 'react'
import {Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"

 export const ModalBenificary=(props)=>{

     function toggle()
    {
      props.closeNewmodal();
    }
    
return(
    
    <Modal isOpen={props.Ismodalshow} toggle={toggle}>
                <ModalHeader toggle={function noRefCheck(){}}>
                    Add/Edit Beneficiary Organization
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="">Beneficiary</Label>
                                    <Input type="text" className="form-control" id="" />
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

export default ModalBenificary;