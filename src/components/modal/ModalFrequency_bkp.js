import React, { useState } from 'react'
import {Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { ApiMethods,ControllerName,OperationTypeId } from '../../utils/Constants.js'
import Swal from "sweetalert2";
export const ModalFrequency = (props) => {


  const [frequencyName, setFrequencyName] = useState("");

  function toggle() {
    props.closeNewmodal();
  }
  async function GetFrequency(FrequencyId) {
    try { 
      var RequestData = {OperationId:OperationTypeId.Select, FrequencyId: FrequencyId }
      const data = await fetchData(ControllerName.Setup,ApiMethods.Frequency_Operation, RequestData);
      if ( data.response===true && data.data != null) {
  //     
        setFrequencyName(data.data[0].Frequency)
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
      if (props.FrequencyId > 0) {
        GetFrequency(props.FrequencyId);
      }
    };

    load();


  }, []);

  async function AddUpdateFrequency(e) {
    try {
      e.preventDefault();
  //    
      var FrequencyId = 0;
      FrequencyId = props.FrequencyId > 0 ? props.FrequencyId : 0;
      var OperationType=FrequencyId==0?OperationTypeId.Insert:OperationTypeId.Update;
      var UserId=localStorage.getItem('UserId');
      var UserIp=localStorage.getItem('UserIP');
      var RequestData = {OperationId:OperationType, FrequencyId: FrequencyId, FrequencyName:frequencyName,CreatedBy:UserId,UserIP:UserIp }
      const data = await fetchData(ControllerName.Setup,ApiMethods.Frequency_Operation, RequestData);
 //     
      if (data.response===true && data.data != null) {
          if(data.data[0].HasError===1)
          {
              // alert(data.data[0].Message);
              Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });

          }
          else{
                  // FrequencyId===0?alert("Added Successfully"):alert("Updated Successfully");;
                  FrequencyId === 0 ? Swal.fire({ title: 'Success', text:"Added Successfully", icon:'success' }) : Swal.fire({ title: 'Success', text:"Updated Successfully", icon:'success' });
        toggle();
          }
      }
      else {
         Swal.fire({ title: 'Error', text:"Some Thing Went Wrong", icon:'error' });
        
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
                  <Label>Frequency Name</Label>
                  <Input
                    placeholder="Frequency Name"
                    type="text"
                    max="50"
                    name="frequencyName"
                    onChange={(e) => setFrequencyName(e.target.value)}
                    value={frequencyName}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
      </ModalBody>
      <ModalFooter>
              <Button color="primary" size="sm" onClick={AddUpdateFrequency}>Save</Button>
              <Button color="secondary" size="sm" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>

  );
}

export default ModalFrequency;