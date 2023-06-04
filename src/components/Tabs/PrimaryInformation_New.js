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
import ModalApplHistory from '../../components/modal/ModalApplHistory.js'

const PrimaryInformation_New = (props) => { 
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
          <h6 className="font-weight-bold mb-0">Primary Information</h6>
        </CardHeader>
        <CardBody>
          <Form>

          <Row form>
          <Col md={3}>
          <FormGroup>
              <Label for="">Date</Label>
              <Input type="date" className="form-control" id="" />
            </FormGroup>
          </Col>
          </Row>

            <Row form>
            <Col md={3}>
            <FormGroup>
                <Label for="">Name of Applicant*</Label>
                <Input type="text" className="form-control" id=""
                value={props.primaryValues.FullName} onChange={props.primaryValues.handlePrimaryInputChange} />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
              <Label for="Province">Province*</Label>
              <Input type="select" className="form-control" id="">
                <option selected="">PUNJAB</option>
                <option selected="">SINDH</option>
                <option selected="">BALOCHISTAN</option>
                <option selected="">KPK</option>
                <option selected="">Gilgit-baltistan</option>
              </Input>
            </FormGroup>
              </Col> 

              <Col md={3}>
              <FormGroup>
              <Label for=" Village City"> Village City*</Label>
              <Input type="select" className="form-control" id="">
                <option selected="">Nawab Shah</option>
           </Input>
            </FormGroup>
              </Col> 

              <Col md={3}>
              <FormGroup>
              <Label for="Union"> Union*</Label>
              <Input type="select" className="form-control" id="">
                <option selected=""> Union</option>
           </Input>
            </FormGroup>
              </Col> 


              <Col md={3}>
              <FormGroup>
              <Label for="Country"> Country*</Label>
              <Input type="select" className="form-control" id="">
                <option selected=""> PAKISTAN</option>
           </Input>
            </FormGroup>
              </Col> 


              <Col md={3}>
              <FormGroup>
              <Label for="District"> District*</Label>
              <Input type="select" className="form-control" id="">
               <option selected="">KORANGHI</option>
           </Input>
            </FormGroup>
              </Col> 


            <Col md={3}>
            <FormGroup>
                <Label for="">Temperory Addresss*</Label>
                <Input type="text" className="form-control" id="" />
              </FormGroup>
            </Col>

            <Col md={3}>
            <FormGroup>
                <Label for="">Permanent Address*</Label>
                <Input type="text" className="form-control" id="" />
              </FormGroup>
            </Col>

            <Col md={3}>
            <FormGroup>
                <Label for="">Reference Name*</Label>
                <Input type="text" className="form-control" id="" />
              </FormGroup>
            </Col>
             
            <Col md={3}>
            <FormGroup>
                <Label for="">IsActive*</Label>
                <input type="checkbox" id="IsActive" name="IsActive" value="IsActive" />
              </FormGroup>
            </Col>

            <Col md={3}>
            <FormGroup>
                <Label for="">Is Joint Family*</Label>
                <input type="checkbox" id="IsJointFam" name="IsJointFam" value="IsJointFam" />
              </FormGroup>
            </Col>


            <Col md={3}>
            <FormGroup>
                <Label for="">IsBlocked*</Label>
                <input type="checkbox" id="IsBlocked" name="IsBlocked" value="IsBlocked" />
              </FormGroup>
            </Col>

            <Col md={3}>
            <FormGroup>
                <Label for="">Block Unblock Reason*</Label>
                <Input type="text" className="form-control" id="" />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
              <Label for="MuhallaId"> Muhalla*</Label>
              <Input type="select" className="form-control" id="">
                <option selected="">Chandni Chowk</option>
           </Input>
            </FormGroup>
              </Col> 


              <Col md={3}>
              <FormGroup>
              <Label for="ReferalTypeId"> Referal Type*</Label>
              <Input type="select" className="form-control" id="">
                <option selected="">Referal Type</option>
           </Input>
            </FormGroup>
              </Col>


                      <Col md={3}>
              <FormGroup>
              <Label for="ReferedBy"> Refered By*</Label>
              <Input type="select" className="form-control" id="">
                <option selected="">Syed Anas Ali shah Bukahri</option>
           </Input>
            </FormGroup>
              </Col>  

              
            </Row>
          </Form>
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
};

export default PrimaryInformation_New;
