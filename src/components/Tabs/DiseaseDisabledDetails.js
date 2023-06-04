import React, { useState, Link } from 'react'
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  FormGroup,
  Form,
  Label,
  Option,
  Input,
  check,
  Badge
} from "reactstrap";
import ModalApplHistory from '../../components/modal/ModalApplHistory.js'

const DiseaseDisabledDetails = (props) => {

  const [openModal, setOpenModal] = useState(false);
 const openNewmodal = () => {
   
    setOpenModal(true);
  }
  const closeNewmodal = () => {
    setOpenModal(false);
  } 

  return (
    <div>
          <Row form>
    <Col md={12} className="text-right">
      <Button color="secondary" className="btn-sm" type="submit" onClick={() => openNewmodal({ UserId: 0 })}>History</Button>
    </Col>
    </Row>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Disease/Disabled Details</h6>
        </CardHeader>
        <CardBody>
          <Form>
            <Row form>
              <Col md={5}>
                <FormGroup check>
                    <Input
                      name="checkbox1"
                      type="checkbox"
                    />
                    {' '}
                    <Label check>
                      Is there a disabled person(s) in the house?
                    </Label>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Details</Label>
                  <Input type="textarea" Row={2} className="form-control" id="" />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={5}>
                  <FormGroup check>
                    <Input
                      name="checkbox1"
                      type="checkbox"
                    />
                    {' '}
                    <Label check>
                      Does any family member have a medical condition?
                    </Label>
                  </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Details</Label>
                  <Input type="textarea" Row={2} className="form-control" id="" />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      {/* <Row className="text-right">
        <Col md={12}>
          <FormGroup>
            <Button color="primary">Save</Button>
          </FormGroup>
        </Col>
      </Row> */}
      {
      openModal &&
      <ModalApplHistory {...props}
        HeaderText="Applicant History"
        Ismodalshow={openModal}
        closeNewmodal={closeNewmodal}
      />

    }
    </div>
  );



}

export default DiseaseDisabledDetails