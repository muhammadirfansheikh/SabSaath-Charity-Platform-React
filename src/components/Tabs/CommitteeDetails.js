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

const CommitteeDetails = (props) => {

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
          <h6 className="font-weight-bold mb-0">Committee Details</h6>
        </CardHeader>
        <CardBody>
          <Form>
          
            <Row form>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Purpose</Label>
                  <Input type="text" className="form-control" id="" />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Committe Amount</Label>
                  <Input type="number" className="form-control" id="" />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Duration</Label>
                  <Input type="text" className="form-control" id="" />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Remarks</Label>
                  <Input type="text" className="form-control" id="" />
                </FormGroup>
              </Col>
            </Row>
            <Row form className="text-right">
              <Col md={12}>
                <FormGroup>
                  <Button color="primary">Add</Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
                  <Row form>
            <Col md={12}>
              <h2 className="h6">Committe Details</h2>
            </Col>
          </Row>
                  <Row form>
            <Col md={12}>
              <Table bordered striped responsive>
                <thead>
                  <tr>
                    <th>Sr #</th>
                    <th>Purpose</th>
                    <th>Commmitte Amount</th>
                    <th>Duration</th>
                    <th>Remarks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

        </CardBody>
      </Card>
      {/* <Row className="text-right">
        <Col md={12}>
          <Button color="primary">Save</Button>
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

export default CommitteeDetails