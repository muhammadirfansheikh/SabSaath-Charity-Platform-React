import React, { useState } from 'react'
import {Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { ApiMethods,ControllerName,OperationTypeId } from '../../utils/Constants.js'
import Swal from "sweetalert2";
export const ModalPaymentType = (props) => {


  const [paymentType, setPaymentType] = useState("");

  function toggle() {
    props.closeNewmodal();
  }
  async function GetPaymentType(PaymentTypeId) {
    try {
     
      var RequestData = {OperationId:OperationTypeId.Select, PaymentTypeId: PaymentTypeId }
      const data = await fetchData(ControllerName.Setup,ApiMethods.PaymentType_Operation, RequestData);
      if ( data.response===true && data.data != null) {
   //    
        setPaymentType(data.data[0].PaymentType)
      }
      else {
        //  setUserList([]);
      }
    } catch (error) {
 //     
    }
  }
  React.useEffect(() => {

    // need to define the function and call it separately
    const load = async () => {
      if (props.PaymentTypeId > 0) {
        GetPaymentType(props.PaymentTypeId);
      }
    };

    load();


  }, []);

  async function AddUpdatePaymentType(e) {
    try {
      e.preventDefault();
  //    
      var PaymentTypeId = 0;
      PaymentTypeId = props.PaymentTypeId > 0 ? props.PaymentTypeId : 0;
      var OperationType=PaymentTypeId===0?OperationTypeId.Insert:OperationTypeId.Update;
      var UserId=localStorage.getItem('UserId');
      var UserIp=localStorage.getItem('UserIP');
      var RequestData = {OperationId:OperationType, PaymentTypeId: PaymentTypeId, PaymentTypeName:paymentType,CreatedBy:UserId,UserIP:UserIp }
      const data = await fetchData(ControllerName.Setup,ApiMethods.PaymentType_Operation, RequestData);
 //     
      if (data.response===true && data.data != null) {
          if(data.data[0].HasError===1)
          {
              // alert(data.data[0].Message);
              Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });
          }
          else{
           // PaymentTypeId ===0 ? alert("Added Successfully"):alert("Updated Successfully");
           PaymentTypeId === 0 ? Swal.fire({ title: 'Success', text:"Added Successfully", icon:'success' }) : Swal.fire({ title: 'Success', text:"Updated Successfully", icon:'success' });
            toggle();
          }
      }
      else {
       // alert("Error");
        Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon:'error' });
      }
    } catch (error) {
  //    
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
                  <Label>Payment Type</Label>
                  <Input
                    placeholder="Payment Type"
                    type="text"
                    name="paymentType"
                    onChange={(e) => setPaymentType(e.target.value)}
                    value={paymentType}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
      </ModalBody>
      <ModalFooter>
              <Button color="primary" size="sm" onClick={AddUpdatePaymentType}>Save</Button>
              <Button color="secondary" size="sm" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>

  );
}

export default ModalPaymentType;