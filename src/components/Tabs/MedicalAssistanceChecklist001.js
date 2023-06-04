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
return(
<div>
<Card className="mb-3">
<CardHeader>
  <h5 className="font-weight-bold mb-0">Medical Assistance Checklist</h5>
</CardHeader>
<CardBody>
  <form className="small">
    <div className="form-row">
      <div className="form-group col-md-2">
        <div className="form-check">
          <Input className="form-check-Input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
          <Label className="form-check-Label" for="flexRadioDefault1">
            Is the patient eligible for Sehat Sahulat Card (SSC)?
          </Label>
        </div>
      </div>
      <div className="form-group col-md-2">
        <Label for="">Uplaod Doctor's prescription </Label>
        <Input type="file" />
      </div>
      <div className="form-group col-md-2">
        <Label for="">Updated Lab Test Report</Label>
        <Input type="file" />
      </div>
      <div className="form-group col-md-2">
        <Label for="">Updated prescription / Medical Cost </Label>
        <Input type="file" />
      </div>
      <div className="form-group col-md-2">
        <Label for="">Previous Record of Patient</Label>
        <Input type="file" />
      </div>
    </div>
    <div className="form-row float-right">
      <div className="form-group">
        <div className="col-md-12">
          <button type="button" className="btn btn-primary">Upload</button>
        </div>
      </div>
    </div>
  </form>
</CardBody>
</Card>
        <Row form>
<Col md={12}>
  <h2 className="h5">Documents</h2>
</Col>
</Row>
<Row>
<Col md={12}>
  <table className="table ">
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
  </table>
</Col>
</Row>
<div className="row justify-content-end pt-3 mb-3">
<div className="col-sm-2 text-right">
  <button type="button" className="btn btn-primary ">Update</button>
</div>
</div>
</div>
    );



}

export default MedicalAssistanceChecklist