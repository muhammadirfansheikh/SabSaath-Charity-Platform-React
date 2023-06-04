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
import ModalApplHistory from 'components/modal/ModalApplHistory'

const Counseling = (props) => {

  const [openModal, setOpenModal] = useState(false);
 const openNewmodal = () => {
   
    setOpenModal(true);
  }
  const closeNewmodal = () => {
    setOpenModal(false);
  } 

  return (
    <>
     <div className="content">
   <Row>
    <Col md={12} className="text-right">
      <Button color="secondary" className="btn-sm" type="submit" onClick={() => openNewmodal({ UserId: 0 })}>History</Button>
    </Col>
    </Row>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Counseling</h6>
        </CardHeader>
        <CardBody>
        <Form>

        <Row form>
        <Col md={3}>
        <FormGroup>
        <Label for="">Student Name</Label>
        <Input type="text" className="form-control" />
        </FormGroup>
        </Col>
        </Row>

        <Row form>
        <Col md={6}>
          <FormGroup check className="mt-1 pt-3">
                <Input type="checkbox" />
                <Label check> Parents/Guardians present during counseling</Label>
            </FormGroup>
          </Col>
        </Row>

       <Row form>
      <Col md={3}>
      <FormGroup>
        <Label for="">Student Goals</Label>
        <Input type="text" className="form-control" />
      </FormGroup>
     </Col>
     <Col md={3}>
      <FormGroup>
        <Label for="">Student Hobbies</Label>
        <Input type="text" className="form-control" />
      </FormGroup>
     </Col>
     <Col md={3}>
      <FormGroup>
        <Label for="">Counselor Feedback</Label>
        <Input type="text" className="form-control" />
      </FormGroup>
     </Col>
     <Col md={3}>
     <FormGroup>
       <Label for="">Student Remarks</Label>
       <Input type="text" className="form-control" />
     </FormGroup>
    </Col>
        </Row>

        <Row form>
        <Col md={6}>
          <FormGroup>
          <Label for="">Counselor Recommendations</Label>
          <Input type="text" className="form-control" />
          </FormGroup>
        </Col>
        </Row>

      <Row form>
        <Col md={3}>
        <FormGroup>
          <Label for="">Counselar Name</Label>
          <Input type="text" className="form-control" />
        </FormGroup>
      </Col>
      <Col md={3}>
      <FormGroup>
        <Label for="">Counselor Contact Number</Label>
        <Input type="number" className="form-control" />
      </FormGroup>
      </Col>
      <Col md={3}>
      <FormGroup>
        <Label for="">Date of Counseling</Label>
        <Input type="date" className="form-control" />
      </FormGroup>
      </Col>
      <Col md={3}>
      <FormGroup>
        <Label for="">Next Counseling Date</Label>
        <Input type="date" className="form-control" />
      </FormGroup>
      </Col>
     </Row>
        
        <Row form className="text-right">
          <Col md={12}>
            <FormGroup>
              <Button color="primary">Save</Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>

     {/* <Row>
        <Col md={12}>
          <h2 className="h6">Case Follow-up Details</h2>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Table bordered striped responsive>
            <thead>
              <tr>
                <th>Sr #</th>
                <th>Applicant Name</th>
                <th>Father Name/Husband Name</th>
                <th>CNIC Number</th>
                <th>Gender</th>
                <th>Age</th>
                <th>City</th>
                <th>Contact Number</th>
                <th>Nature of Case</th>
                <th>Category</th>
                <th>Fund Category</th>
                <th>Referer</th>
                <th>Investigator</th>
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
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><button class="btn btn-outline-primary btn-sm"><i class="nc-icon nc-ruler-pencil"></i></button><button class="btn btn-outline-danger btn-sm"><i class="nc-icon nc-simple-remove"></i></button></td>
              </tr>
              <tr>
                <td>2</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><button class="btn btn-outline-primary btn-sm"><i class="nc-icon nc-ruler-pencil"></i></button><button class="btn btn-outline-danger btn-sm"><i class="nc-icon nc-simple-remove"></i></button></td> 
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>*/}


        </CardBody>
      </Card>
      {/* <Row className="text-right">
        <Col md={12}>
          <Button color="primary">Update</Button>
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
    </>
   
  );



}

export default Counseling