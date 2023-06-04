import React, { useState } from "react";
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

import { useHistory } from "react-router-dom";

const ApplicantList_New = (props) => {
  const initialValues = {
    ApplicantId: "",
    ApplicantName: "",
    CNIC: "",
    GenderId: "0",
    CityId: "0",
    ContactNumber: "",
    NatureOfCaseId: "0",
    CaseCategoryId: "0",
    FundCategoryId: "0",
    Referrer: "",
    FrequencyId: "0",
  };
  const [values, setValues] = useState(initialValues);
  const history = useHistory();
  function OpenApplicantDetail() {
    // history.push('/admin/ApplicantDetail'); manzoor commit
    history.push("/admin/ApplicantDetail_New");
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  function SearchClickHandle() {
    //  console.log(values);
  }
  function cancelClickHandle() {
    setValues(initialValues);
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col lg={12} md={12}>
            <Card>
              <CardHeader>Search</CardHeader>
              <CardBody>
                <Form>
                  <Row form>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="">Applicant ID</Label>
                        <Input
                          type="text"
                          className="form-control"
                          name="ApplicantId"
                          value={values.ApplicantId}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="">Applicant Name</Label>
                        <Input
                          type="text"
                          className="form-control"
                          name="ApplicantName"
                          value={values.ApplicantName}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="">CNIC</Label>
                        <Input
                          type="text"
                          className="form-control"
                          name="CNIC"
                          value={values.CNIC}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="">Gender</Label>
                        <Input
                          type="select"
                          className="form-control"
                          name="GenderId"
                          value={values.GenderId}
                          onChange={handleInputChange}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>
                          <option key={1} value={1}>
                            Male
                          </option>
                          <option key={2} value={2}>
                            Female
                          </option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="">City</Label>
                        <Input
                          type="select"
                          className="form-control"
                          name="CityId"
                          value={values.CityId}
                          onChange={handleInputChange}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>
                          <option key={1} value={1}>
                            Karachi
                          </option>
                          <option key={2} value={2}>
                            Lahore
                          </option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="">Contact Number</Label>
                        <Input
                          type="text"
                          className="form-control"
                          name="ContactNumber"
                          value={values.ContactNumber}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="">Nature Of Case</Label>
                        <Input
                          type="select"
                          className="form-control"
                          name="NatureOfCaseId"
                          value={values.NatureOfCasdeId}
                          onChange={handleInputChange}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>
                          <option key={1} value={1}>
                            Urgent
                          </option>
                          <option key={2} value={2}>
                            Normal
                          </option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="">Category</Label>
                        <Input
                          type="select"
                          className="form-control"
                          name="CategoryId"
                          value={values.CategoryId}
                          onChange={handleInputChange}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>
                          <option key={1} value={1}>
                            Education
                          </option>
                          <option key={2} value={2}>
                            Medical
                          </option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="">Fund Category</Label>
                        <Input
                          type="select"
                          className="form-control"
                          name="FundCategoryId"
                          value={values.FundCategoryId}
                          onChange={handleInputChange}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>
                          <option key={1} value={1}>
                            Scholarship
                          </option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="">Referrer</Label>
                        <Input
                          type="text"
                          className="form-control"
                          name="Referrer"
                          value={values.Referrer}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="">Frequency</Label>
                        <Input
                          type="select"
                          className="form-control"
                          name="FrequencyId"
                          value={values.FrequencyId}
                          onChange={handleInputChange}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>
                          <option key={1} value={1}>
                            Annually
                          </option>
                          <option key={2} value={2}>
                            Quaterly
                          </option>
                          <option key={3} value={3}>
                            MidYear
                          </option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={12} className="text-right">
                      <Button
                        color="primary"
                        className="mr-2"
                        onClick={SearchClickHandle}
                      >
                        Search
                      </Button>
                      <Button color="secondary" onClick={cancelClickHandle}>
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12}>
            <Card>
              <CardHeader>
                <Row>
                  <Col lg={6} md={6}>
                    Applicant Details
                  </Col>
                  <Col lg={6} md={6} className="text-right">
                    <Button
                      color="primary2"
                      className="m-0"
                      onClick={OpenApplicantDetail}
                    >
                      Create
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Applicant ID</th>
                      <th>Applicant Name</th>
                      <th>CNIC</th>
                      <th>City</th>
                      <th>Category</th>
                      <th>Fund Category</th>
                      <th>Frequency</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ApplicantList_New;
