import React, { useState } from 'react'
import {Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { ApiMethods,ControllerName,OperationTypeId } from '../../utils/Constants.js'
import Swal from "sweetalert2";
export const ModalCompanyFamily = (props) => {

const initialValues = {
   
  };
  const [values, setValues] = useState(initialValues);
  const [companyFamily, setCompanyFamily] = useState("");
  const [companyid, setCompanyid] = useState('0');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  function toggle() {
    props.closeNewmodal();
  }
  async function GetComapnyFamily(CompanyFamilyId) {
    try { 
      var RequestData = {OperationId:OperationTypeId.Select, CompanyFamilyId: CompanyFamilyId }
      const data = await fetchData(ControllerName.Setup,ApiMethods.CompanyFamily_Operation, RequestData);
      if ( data.response===true && data.data != null) {
       
        // initialValues.companyFamily = data.data[0].Family;
        // initialValues.companyid = data.data[0].CompanyId;
        setCompanyFamily(data.data[0].Family);
        setCompanyid(data.data[0].CompanyId);
        //  console.log(initialValues);
        // setValues(initialValues);
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
      if (props.CompanyFamilyId > 0) {
        GetComapnyFamily(props.CompanyFamilyId);
      }
    };

    load();


  }, []);

  async function AddUpdateFamily(e) {
    try {
       
      e.preventDefault(); 
    

    if(companyid != "0")
    {
      if(companyFamily != "")
      {
        var CompanyFamilyId = 0;
        CompanyFamilyId = props.CompanyFamilyId > 0 ? props.CompanyFamilyId : 0;
        var OperationType=CompanyFamilyId===0?OperationTypeId.Insert:OperationTypeId.Update;
        var UserId=localStorage.getItem('UserId');
        var UserIp=localStorage.getItem('UserIP');
        var RequestData = {OperationId:OperationType, CompanyFamilyId: CompanyFamilyId,FamilyName:companyFamily, CompanyId:companyid,CreatedBy:UserId,UserIP:UserIp }
        const data = await fetchData(ControllerName.Setup,ApiMethods.CompanyFamily_Operation, RequestData);
    
        if (data.response===true && data.data.length >0) {
            if(data.data[0].HasError===1)
            {
                // alert(data.data[0].Message);
                Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });
            }
            else{
          //alert("Added Successfully");
          Swal.fire({ title: 'Success', text:"Added Successfully", icon:'success' });
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
        Swal.fire({ title: 'Error', text: "Enter Company Family Name.", icon:'error' });
      }
    }
    else
    {
      Swal.fire({ title: 'Error', text: "Select Company", icon:'error' });
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
            <Col className="px-1" md={6}>
                        <FormGroup>
                            <Label for="">Company</Label>
                           <Input
                          id="exampleSelect"
                          name="companyid"
                          type="select"
                          value={companyid}
                          onChange={(e)=>setCompanyid(e.target.value)}
                        >
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            props.companyddl.map((item, key) => (
                              <option key={item.CompanyId} value={item.CompanyId}>
                                {item.Company}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>
             <Col className="px-1" md={6}>
                      <FormGroup>
                        <Label for="">Company Family Name</Label>
                        <Input
                          type="text"
                          max="50"
                          onChange={(e)=>setCompanyFamily(e.target.value)}
                          name="companyFamily"
                          value={companyFamily}
                        />
                      </FormGroup>
                    </Col>
                  
            </Row>
          </Form>
      </ModalBody>
      <ModalFooter>
              <Button color="primary" size="sm" onClick={AddUpdateFamily}>Save</Button>
              <Button color="secondary" size="sm" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>

  );
}

export default ModalCompanyFamily;