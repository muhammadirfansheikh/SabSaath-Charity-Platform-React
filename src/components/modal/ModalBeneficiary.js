import React, { useState } from 'react'
import {Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { ApiMethods,ControllerName,OperationTypeId } from '../../utils/Constants.js'
import Swal from "sweetalert2";

export const ModalBeneficiary = (props) => {


  const [beneficiaryName, setBeneficiaryName] = useState("");

  function toggle() {
    props.closeNewmodal();
  }
  async function GetBeneficiary(BeneficiaryId) {
    try { 
      var RequestData = {OperationId:OperationTypeId.Select, BeneficiaryId: BeneficiaryId }
      const data = await fetchData(ControllerName.Setup,ApiMethods.Beneficiary_Operation, RequestData);
      if ( data.response===true && data.data != null) {
    
        setBeneficiaryName(data.data[0].Beneficiary)
      }
      else {
        //  setUserList([]);
      }
    } catch (error) {
    }
  }
  React.useEffect(() => {

    // need to define the function and call it separately
    const load = async () => {
      if (props.BeneficiaryId > 0) {
        GetBeneficiary(props.BeneficiaryId);
      }
    };

    load();


  }, []);

  async function AddUpdateBeneficiary(e) {
    try {
      e.preventDefault();
   
      var BeneficiaryId = 0;
      BeneficiaryId = props.BeneficiaryId > 0 ? props.BeneficiaryId : 0;
      var OperationType=BeneficiaryId===0?OperationTypeId.Insert:OperationTypeId.Update;
      var UserId=localStorage.getItem('UserId');
      var UserIp=localStorage.getItem('UserIP');
      var RequestData = {OperationId:OperationType, BeneficiaryId: BeneficiaryId, BeneficiaryName:beneficiaryName,CreatedBy:UserId,UserIP:UserIp }
      const data = await fetchData(ControllerName.Setup,ApiMethods.Beneficiary_Operation, RequestData);
   
      if (data.response===true && data.data != null) {
          if(data.data[0].HasError===1)
          {
              // alert(data.data[0].Message);
              Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });
          }
          else{
       //BeneficiaryId=0? alert("Added Successfully") :alert("Updated Successfully");
              BeneficiaryId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });

              setBeneficiaryName("");
       // toggle();
          }
      }
      else {
       // alert("Error");
       Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon:'error' });

      }
    } catch (error) {
    
    }
  }
  return (

    <Modal isOpen={props.Ismodalshow} toggle={toggle}>
      <ModalHeader
        toggle={toggle}>{props.HeaderText}</ModalHeader>
      <ModalBody>
          <Form>
            <Row form>
              <Col className="px-1" md="6">
                <FormGroup>
                  <Label>Beneficiary Name</Label>
                  <Input
                    placeholder="Beneficiary Name"
                    type="text"
                    max="50"
                    name="beneficiaryName"
                    onChange={(e) => setBeneficiaryName(e.target.value)}
                    value={beneficiaryName}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
      </ModalBody>
      <ModalFooter>
              <Button color="primary" size="sm" onClick={AddUpdateBeneficiary}>Save</Button>
              <Button color="secondary" size="sm" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>

  );
}

export default ModalBeneficiary;