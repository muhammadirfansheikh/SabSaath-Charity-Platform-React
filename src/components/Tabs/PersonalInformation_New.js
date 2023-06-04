import React, { useState } from "react";
//import { useHistory } from "react-router-dom";
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
import ModalApplHistory from "../../components/modal/ModalApplHistory.js";

const PersonalInformation_New = (props) => { 

  const [openModal, setOpenModal] = useState(false);
  const openNewmodal = () => {
    setOpenModal(true);
  };
  const closeNewmodal = () => {
    setOpenModal(false);
  };

  return (
    <div>
          <Row form>
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
          <h6 className="font-weight-bold mb-0">Personal Information</h6>
        </CardHeader>
        <CardBody>
          <Form>
            <Row form>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Name of Applicant*</Label>
                  {/* <Input type="text" className="form-control" name="FullName" value={props.primaryValues.FullName} onChange={props.handlePrimaryInputChange} />
                   */}
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Father Name/Husband Name*</Label>
                  {/* <Input type="text" className="form-control" name="Father_HusbandName" value={props.primaryValues.Father_HusbandName} onChange={props.handlePrimaryInputChange} /> */}
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">CNIC Number*</Label>
                  {/* <Input type="number" className="form-control" name="CNIC" value={props.primaryValues.CNIC} onChange={props.handlePrimaryInputChange} /> */}
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Family Number*</Label>
                  {/* <Input type="number" className="form-control" name="FamilyNumber" value={props.primaryValues.FamilyNumber} onChange={props.handlePrimaryInputChange} /> */}
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="InputState">Gender</Label>
                  {/* <Input type="select" className="form-control" name="GenderId" value={props.primaryValues.GenderId} onChange={props.handlePrimaryInputChange}>
            <option key={0} value={0} >Select</option>
            {
              props.primaryValues.GenderList &&
                            props.primaryValues.GenderList.map((item, key) => (
                              <option key={item.SetupDetailId} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
          </Input>*/}
                </FormGroup>
              </Col>

              {/*<Col md={3}>
        <FormGroup>
          <Label for="InputDate">Date of Birth</Label>
          <Input type="date" className="form-control" id="InputDate" name="DOB" value={props.primaryValues.DOB} onChange={props.handlePrimaryInputChange} />
        </FormGroup>
      </Col>*/}
              <Col md={3}>
                <FormGroup>
                  <Label for="">Age</Label>
                  {/* <Input type="number" className="form-control" name="Age" value={props.primaryValues.Age} onChange={props.handlePrimaryInputChange} /> */}
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label for="InputState">Religion</Label>
                  <select id="InputState" className="form-control">
                    <option selected="">Religion</option>
                  </select>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">No. of household members </Label>
                  {/* <Input type="number" className="form-control" name="NoOfHouseholdMember" value={props.primaryValues.NoOfHouseholdMember} onChange={props.handlePrimaryInputChange} /> */}
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Accompanying Family Member</Label>
                  {/* <Input type="text" className="form-control" name="AccompFamilyMember" value={props.primaryValues.AccompFamilyMember} onChange={props.handlePrimaryInputChange} /> */}
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label for="">Earning</Label>
                  <Input
                    type="number"
                    className="form-control"
                    name="Earning"
                  />
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label for="">Details of Earning(Remarks)</Label>
                  <Input
                    type="text"
                    className="form-control"
                    name="Details Of Earning"
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Residential Details</h6>
        </CardHeader>
        <CardBody>
          <Form>
            <Row form>
              <Col md={3}>
                <FormGroup>
                  <Label for="InputState">Province</Label>
                  {/* <Input type="select" className="form-control" name="ProvinceId" value={props.primaryValues.ProvinceId} onChange={props.handlePrimaryInputChange}>
            <option key={0} value={0} >Sindh</option>
            {
              props.primaryValues.ProvinceList &&
                            props.primaryValues.ProvinceList.map((item, key) => (
                              <option key={item.SetupDetailId} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
          </Input>*/}
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">City/tehsil</Label>
                  {/*  <Input type="select" className="form-control" name="CityId" value={props.primaryValues.CityId} onChange={props.handlePrimaryInputChange}>
          <option key={0} value={0} >Karachi</option>
          {
            props.primaryValues.CityList &&
                          props.primaryValues.CityList.map((item, key) => (
                            <option key={item.SetupDetailId} value={item.SetupDetailId}>
                              {item.SetupDetailName}
                            </option>
                          ))
                        }  
        </Input>*/}
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Union Council</Label>
                  <Input type="text" className="form-control" />
                </FormGroup>
              </Col>

              {/*<Col md={3}>
    <FormGroup>
      <Label for="">Council</Label>
       <Input type="select" className="form-control" name="CouncilId" value={props.primaryValues.CouncilId} onChange={props.handlePrimaryInputChange}>
        <option key={0} value={0} >Select</option>
        {
          props.primaryValues.CouncilList &&
                        props.primaryValues.CouncilList.map((item, key) => (
                          <option key={item.SetupDetailId} value={item.SetupDetailId}>
                            {item.SetupDetailName}
                          </option>
                        ))
                      }  
      </Input>
      
    </FormGroup>
  </Col>*/}

              <Col md={3}>
                <FormGroup>
                  <Label for="">Village/Muhalla</Label>
                  <Input type="text" className="form-control" />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="">Temporary Address</Label>
                  {/* <Input type="text" className="form-control" name="TemporaryAddress" value={props.primaryValues.TemporaryAddress} onChange={props.handlePrimaryInputChange} /> */}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="">Permanent Address</Label>
                  {/* <Input type="text" className="form-control" name="PermanentAddress" value={props.primaryValues.PermanentAddress} onChange={props.handlePrimaryInputChange} /> */}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Contact Information</h6>
        </CardHeader>
        <CardBody>
          <Form>
            <Row form>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Contact Number*</Label>
                  {/* <Input type="number" className="form-control" name="ContactNumber" value={props.primaryValues.ContactNumber} onChange={props.handlePrimaryInputChange} /> */}
                </FormGroup>
              </Col>
            </Row>

            <Row form className="text-right">
              <Col md={12}>
                <FormGroup>
                                  <Button color="primary" size="sm">Add</Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>

                  <Row form>
            <Col md={12}>
              <h2 className="h6 pt-3">Contact Details</h2>
            </Col>
          </Row>
                  <Row form>
            <Col md={12}>
              <Table bordered striped responsive>
                <thead>
                  <tr>
                    <th>Sr #</th>
                    <th>Contact Details</th>
                                      <th className="text-center" style={{ width: 150 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td></td>
                                      <td className="text-center">
                                          <Button color="primary" className="btn-circle" size="sm">
                        <i className="nc-icon nc-ruler-pencil"></i>
                      </Button>
                                          <Button color="danger" className="btn-circle" size="sm">
                        <i className="nc-icon nc-simple-remove"></i>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td></td>
                    <td>
                                          <Button color="primary" className="btn-circle" size="sm">
                        <i className="nc-icon nc-ruler-pencil"></i>
                      </Button>
                                          <Button color="danger" className="btn-circle" size="sm">
                        <i className="nc-icon nc-simple-remove"></i>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td></td>
                    <td>
                                          <Button color="primary" className="btn-circle" size="sm">
                        <i className="nc-icon nc-ruler-pencil"></i>
                      </Button>
                                          <Button color="danger" className="btn-circle" size="sm">
                        <i className="nc-icon nc-simple-remove"></i>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td></td>
                    <td>
                                          <Button color="primary" className="btn-circle" size="sm">
                        <i className="nc-icon nc-ruler-pencil"></i>
                      </Button>
                                          <Button color="danger" className="btn-circle" size="sm">
                        <i className="nc-icon nc-simple-remove"></i>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Additional Details</h6>
        </CardHeader>
        <CardBody>
          <Form>
            <Row form>
              <Col md={3}>
                <FormGroup>
                  <Label for="InputState">Nature of Case*</Label>
                  {/*  <Input type="select" className="form-control" name="NatureOfCaseId" value={props.primaryValues.NatureOfCaseId} onChange={props.handlePrimaryInputChange}>
            <option key={0} value={0} >Urgent</option>
            {
              props.primaryValues.NatureOfCaseList &&
                            props.primaryValues.NatureOfCaseList.map((item, key) => (
                              <option key={item.SetupDetailId} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
          </Input>*/}
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="InputState">Acceptance Of Charity</Label>
                  <select id="InputState" className="form-control">
                    <option selected="">Zakaat</option>
                  </select>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <div className="form-check-inline mt-3">
                    <Label className="form-check-Label">
                      {/*    <Input
                        type="checkbox"
                        className="form-check-Input"
                        name="IsCriminalActivity"
                        checked={props.primaryValues.IsCriminalActivity}
                         onChange={props.handlePrimaryInputChange}/>*/}
                      Have you been Charged for a criminal activity?*
                    </Label>
                  </div>
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <div className="form-check-inline ">
                    <Label className="form-check-Label">
                      {/* <Input
                        type="checkbox"
                        className="form-check-Input"
                        name="IsPartOfBannedOrg"
                       checked={props.primaryValues.IsPartOfBannedOrg}
                       onChange={props.handlePrimaryInputChange}
                      />*/}
                      Are you/have you been part of any banned
                      organization/activity?*
                    </Label>
                  </div>
                </FormGroup>
              </Col>
              {/*<Col md={12}>
        <FormGroup>
          <div className="form-check-inline ">
                    <Label className="form-check-Label">
                      <Input
                        type="checkbox"
                        className="form-check-Input"
                        name="IsPartOfBannedOrg"
                       checked={props.primaryValues.IsPartOfBannedOrg}
                       onChange={props.handlePrimaryInputChange}
                      />
                      Is the patient eligible for Sehat Sahulat Card (SSC)?
                    </Label>
                  </div>
          
        </FormGroup>
      </Col>
*/}

              <Col md={12}>
                <FormGroup>
                  <div className="form-check-inline ">
                    <Label className="form-check-Label">
                      {/*  <Input
                      type="checkbox"
                      className="form-check-Input"
                      name="IsPartOfBannedOrg"
                     checked={props.primaryValues.IsPartOfBannedOrg}
                     onChange={props.handlePrimaryInputChange}
                    />*/}
                      Is the applicant eligible for EHSAAS or BISP (Benazir
                      income support program)?
                    </Label>
                  </div>
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <div className="form-check-inline ">
                    <Label className="form-check-Label">
                      <Input type="checkbox" className="form-check-Input" />
                      Is there a government school within 1KM from home? If not,
                      then how far (approx.)?
                    </Label>
                    <Row>
                      <FormGroup>
                        <Col md={12}>
                          <Input
                            type="text"
                            placeholder="How far"
                            className="form-control ml-2"
                          />
                        </Col>
                      </FormGroup>
                    </Row>
                  </div>
                </FormGroup>
              </Col>

              {
                // <Col md={12} className="text-right">
                //   <FormGroup>
                //     <Button color="primary" >Save</Button>
                //   </FormGroup>
                // </Col>
              }
            </Row>
          </Form>
        </CardBody>
      </Card>

      {openModal && (
        <ModalApplHistory
          {...props}
          HeaderText="Applicant History"
          Ismodalshow={openModal}
          closeNewmodal={closeNewmodal}
        />
      )}
    </div>
  );
};
export default PersonalInformation_New;
