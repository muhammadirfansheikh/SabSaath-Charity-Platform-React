import React from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"

export const ModalAssignInvestigator = (props) => {

  function toggle() {
    props.closeNewmodal();
  }


    return (
        <Modal isOpen={props.Ismodalshow} toggle={toggle}>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
                <Form>
                    <Row form>
                        <Col className="px-1" md={12}>
                            <FormGroup>
                                <Label for="">Investigator</Label>
                                <Input
                                    id="exampleSelect"
                                    name="InvestigatorId"
                                    type="select"
                                    // value={props.SelectedInvestigatorId > 0 ? props.SelectedInvestigatorId :  
                                    // props.AssigneeValues.InvestigatorId}
                                    value={props.AssigneeValues.InvestigatorId}
                                    onChange={props.onChange}
                                >
                                    <option key={0} value={0}>
                                        Select
                                    </option>
                                    {
                                        props.investigatorddl.map((item, key) => (
                                            <option key={item.Name} value={item.UserId}>
                                                {item.Name}
                                            </option>
                                        ))
                                    }
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col className="px-1" md="8">
                            <FormGroup>
                                {/* <Label>Remarks</Label> */}
                                <Input
                                    placeholder="Remarks"
                                    type="text"
                                    name="Remarks"
                                    max="100"
                                    onChange={props.onChange}
                                    value={props.AssigneeValues.Remarks}
                                    hidden
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={props.SaveAssignInvestigator}>Save</Button>
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>

    );
}

export default ModalAssignInvestigator;
