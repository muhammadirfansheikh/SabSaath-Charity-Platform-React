import React, { useState } from 'react'
import {Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { ApiMethods,ControllerName,OperationTypeId } from '../../utils/Constants.js'
import Swal from "sweetalert2";
export const ModalCompany = (props) => {


  const [companyName, setCompanyName] = useState("");

  function toggle() {
    props.closeNewmodal();
  }
  async function GetCompany(CompanyId) {
    try { 
      var RequestData = {OperationId:OperationTypeId.Select, CompanyId: CompanyId }
      const data = await fetchData(ControllerName.Setup,ApiMethods.Company_Operation, RequestData);
      if ( data.response===true && data.data != null) {
  //     
        setCompanyName(data.data[0].Company)
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
      if (props.CompanyId > 0) {
        GetCompany(props.CompanyId);
      }
    };

    load();


  }, []);

  async function AddUpdateCompany(e) {
    try {
      e.preventDefault();
      

      if(companyName != "")
      {
        var CompanyId = 0;
        CompanyId = props.CompanyId > 0 ? props.CompanyId : 0;
        var OperationType=CompanyId===0?OperationTypeId.Insert:OperationTypeId.Update;
        var UserId=localStorage.getItem('UserId');
        var UserIp=localStorage.getItem('UserIP');
        var RequestData = {OperationId:OperationType, CompanyId: CompanyId, CompanyName:companyName,CreatedBy:UserId,UserIP:UserIp }
        const data = await fetchData(ControllerName.Setup,ApiMethods.Company_Operation, RequestData);
    
        if (data.response===true && data.data != null) {
            if(data.data[0].HasError===1)
            {
               //  alert(data.data[0].Message);
               Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });
            }
            else{
                //CompanyId===0?alert("Added Successfully"):alert("Updated Successfully");;
                CompanyId === 0 ? Swal.fire({ title: 'Success', text:"Added Successfully", icon:'success' }) : Swal.fire({ title: 'Success', text:"Updated Successfully", icon:'success' });
  
          toggle();
            }
        }
        else {
         // alert("Error");
         Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon:'error' });
        }
      }
      else
      {
        Swal.fire({ title: 'Error', text: "Enter Company Name.", icon:'error' });
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
                  <Label>Company Name</Label>
                  <Input
                    placeholder="Company Name"
                    type="text"
                    name="companyName"
                    max="50"
                    onChange={(e) => setCompanyName(e.target.value)}
                    value={companyName}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
      </ModalBody>
      <ModalFooter>
              <Button color="primary" size="sm" onClick={AddUpdateCompany}>Save</Button>
              <Button color="secondary" size="sm" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>

  );
}

export default ModalCompany;