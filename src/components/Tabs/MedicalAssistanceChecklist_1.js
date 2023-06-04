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

const MedicalAssistanceChecklist = (props) => {
  return (
    <div>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Medical Assistance Checklist</h6>
        </CardHeader>
        <CardBody>
          <Form>
            <Row Form>
              <col md={2}>
                <FormGroup>
                  <div className="form-check">
                    <Input className="form-check-Input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <Label className="form-check-Label" for="flexRadioDefault1">
                      Is the patient eligible for Sehat Sahulat Card (SSC)?
                    </Label>
                  </div>
                </FormGroup>
              </col>
              <Col md={2}>
                <FormGroup>
                  <Label for="">Uplaod Doctor's prescription </Label>
                  <Input type="file" />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="">Updated Lab Test Report</Label>
                  <Input type="file" />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="">Updated prescription / Medical Cost </Label>
                  <Input type="file" />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="">Previous Record of Patient</Label>
                  <Input type="file" />
                </FormGroup>
              </Col>
            </Row>
            <Row Form className="text-align-right">
              <Col md={12}>
                <FormGroup>
                  <button type="button" className="btn btn-primary">Upload</button>
                </FormGroup>
              </Col>
            </Row>
          </Form>

                  <Row form>
            <Col md={12}>
              <h2 className="h6">Documents</h2>
            </Col>
          </Row>
                  <Row form>
            <Col md={12}>
              <Table bordered striped responsive>
                <thead>
                  <tr>
                    <th>Sr #</th>
                    <th>Documents</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
          <Row form className="text-align-right">
        <Col md={2}>
                  <button color="primary" size="sm" >Update</button>
        </Col>
      </Row>
    </div>
  );

}

export default MedicalAssistanceChecklist