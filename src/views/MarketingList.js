import React, { useState, Link } from "react";
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
  Badge,
} from "reactstrap";


const MarketingList = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();

  function OpenCouncellingPage()
{
  history.push('/admin/Marketing');
}
  const openNewmodal = () => {
    setOpenModal(true);
  };
  const closeNewmodal = () => {
    setOpenModal(false);
  };

  return (
    <>
       <div className="content">
      <Row>
        <Col md={12} className="text-right">
          <Button
            color="secondary"
            className="btn-sm"
            type="submit"
            onClick={() => openNewmodal({ UserId: 0 })}
          >
            History
          </Button>
        </Col>
      </Row>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Search</h6>
        </CardHeader>
        <CardBody>
          <Form>
            <Row form>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Applicant Name</Label>
                  <Input type="text" className="form-control" />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Applicant CNIC</Label>
                  <Input type="text" className="form-control" />
                </FormGroup>
              </Col>
              {/* <Col md={3}>
                <FormGroup>
                  <Label for="">Student Name</Label>
                  <Input type="text" className="form-control" />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">B-Form/CNIC</Label>
                  <Input type="number" className="form-control" />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="InputState">Gender</Label>
                  <select id="InputState" className="form-control">
                    <option selected="">Male</option>
                    <option selected="">Female</option>
                  </select>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Age</Label>
                  <Input type="number" className="form-control" />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Contact Number</Label>
                  <Input type="number" className="form-control" />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="InputState">City</Label>
                  <select id="InputState" className="form-control">
                    <option selected="">Karachi</option>
                  </select>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="">Address</Label>
                  <Input type="text" className="form-control" />
                </FormGroup>
              </Col> */}
            </Row>

            <Row form>
              {/* <Col md={3}>
                <FormGroup>
                  <Label for="">Counselor Name</Label>
                  <Input type="text" className="form-control" />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Counselor Contact Number</Label>
                  <Input type="number" className="form-control" />
                </FormGroup>
              </Col> */}
      
           
            </Row>

            {/* <Row form>
              <Col md={3}>
                <FormGroup>
                  <div className="form-check-inline mt-3 pt-3">
                    <Label className="form-check-Label">
                      <Input type="checkbox" className="form-check-Input" />
                      Parents/Guardians present during counseling
                    </Label>
                  </div>
                </FormGroup>
              </Col>
            </Row> */}

            <Row form className="text-right">
              <Col md={12}>
                <FormGroup>
                  <Button color="primary">Search</Button>
                </FormGroup>
              </Col>

             
            </Row>

            
             
        
          </Form>

          <Row>
            <Col md={12}>
              <h2 className="h6">Marketing List</h2>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Table bordered striped responsive>
                <thead>
                  <tr>
                    <th>Sr #</th>
                    <th>Applicant Name</th>
                    <th>Document Attachment</th>
                    {/* <th></th>
                    <th>B-Form/CNIC</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Contact Number</th>
                    <th>Counselor Name</th>
                    <th>Counselor Contact Number</th>
                    <th>Next Counseling Date</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td></td>
                    {/* <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>*/}
                    <td></td> 
                    <td>
                    <a href="#" color="primary2" className="m-0" onClick={OpenCouncellingPage} >Marketing</a>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td></td>
                    {/* <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>*/}
                    <td></td> 
                    <td>
                    <a href="#" color="primary2" className="m-0" onClick={OpenCouncellingPage} >Marketing</a>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
      {/* <Row className="text-right">
        <Col md={12}>
          <Button color="primary">Update</Button>
        </Col>
      </Row> */}

   
    </div>
    </>
 
  );
};

export default MarketingList;
