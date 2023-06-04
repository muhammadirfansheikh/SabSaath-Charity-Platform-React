import React, { useState } from 'react'
import {Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { ApiMethods,ControllerName,OperationTypeId } from '../../utils/Constants.js'
import { GetRoles } from 'utils/CommonMethods.js'
import { GetCompanies } from 'utils/CommonMethods.js'
import Swal from "sweetalert2";
export const ModalRoles = (props) => {

  const initialValues = {
RoleName : "",
CompanyValue : 0
  };

  
  const [roleVlaues, setroleVlaues] = useState(initialValues);
  const [modalCompanyddl, setmodalCompanyddl] = useState([]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setroleVlaues({
      ...roleVlaues,
      [name]: value,
    });
  };
  function toggle() {
    props.closeNewmodal();
  }
 
  React.useEffect(() => {

    // need to define the function and call it separately
    const load = async () => {
      


      let comanyData =await GetCompanies(0,"");


      if (comanyData.response===true && comanyData.data != null) {
       setmodalCompanyddl(comanyData.data);
     } 
     else {
       setmodalCompanyddl([]);
     }


      if (props.RoleId > 0) {
         let rolesData =await GetRoles("",props.RoleId,0);

         

         setroleVlaues((prevState) => ({
          ...prevState,
          RoleName: rolesData.data[0].RoleName,
          CompanyValue: rolesData.data[0].CompanyId,
         

      }))
      }
    };

    load();


  }, []);

  async function AddUpdateRole(e) {
    try {
      e.preventDefault();
      

if(roleVlaues.CompanyValue != "0"){

  if(roleVlaues.RoleName != ""){

    var RoleId = 0;
    RoleId = props.RoleId > 0 ? props.RoleId : 0;
  
    var OperationType=RoleId===0?OperationTypeId.Insert:OperationTypeId.Update;
  
    var UserId=localStorage.getItem('UserId');
    var UserIp=localStorage.getItem('UserIP');
  
    var RequestData = {OperationId:OperationType, RoleId: RoleId, RoleName:roleVlaues.RoleName,CreatedBy:UserId,UserIP:UserIp,CompanyId: roleVlaues.CompanyValue }
    const data = await fetchData(ControllerName.Security,ApiMethods.UserRole_Operation, RequestData);
  
  
    if (data.response===true && data.data != null) {
      //alert("Added Successfully");
      Swal.fire({ title: 'Success', text:"Added Successfully", icon:'success' });
      toggle();
    }
    else {
    //  alert("Error");
    Swal.fire({ title: 'Error', text:"Error", icon:'error' });
    }

  }
  else{


    //alert("Enter Role Name");
    Swal.fire({ title: 'Error', text:"Enter Role Name", icon:'error' });
  }




}
else{
  alert("Select Company");
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
            <Col md={6}>
                        <FormGroup>
                            <Label for="">Company</Label>
                           <Input
                          id="exampleSelect"
                          name="CompanyValue"
                          type="select"
                          value={roleVlaues.CompanyValue}
                          onChange={handleInputChange}>
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            modalCompanyddl.map((item, key) => (
                              <option key={item.CompanyId} value={item.CompanyId}>
                                {item.Company}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>
             <Col md={6}>
                <FormGroup>
                  <Label>Role Name</Label>
                  <Input
                    placeholder="Role Name"
                    type="text"
                    name="RoleName"
                    onChange={handleInputChange}
                    value={roleVlaues.RoleName}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
      </ModalBody>
      <ModalFooter>
              <Button color="primary" size="sm" onClick={AddUpdateRole}>Save</Button>
              <Button color="secondary" size="sm" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>

  );
}

export default ModalRoles;