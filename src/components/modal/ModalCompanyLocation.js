import React, { useState } from 'react'
import {Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { ApiMethods,ControllerName,OperationTypeId } from '../../utils/Constants.js'
import Swal from "sweetalert2";

export const ModalCompanyLocation = (props) => {

const initialValues = {
    
  };
  const [values, setValues] = useState(initialValues);
  const [companyLocation, setCompanyLocation] = useState("");
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
  async function GetComapnyLocation(CompanyLocationId) {
    try {
    //  console.log(CompanyLocationId);
      var RequestData = {OperationId:OperationTypeId.Select, CompanyLocationId: CompanyLocationId }
      const data = await fetchData(ControllerName.Setup,ApiMethods.CompanyLocation_Operation, RequestData);
      if ( data.response===true && data.data != null) {
       
        // initialValues.companyFamily = data.data[0].Family;
        // initialValues.companyid = data.data[0].CompanyId;
        setCompanyLocation(data.data[0].Location);
        setCompanyid(data.data[0].CompanyId);
    //     console.log(data.data[0].Location);
    //      console.log(data.data[0].CompanyId);
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
      if (props.CompanyLocationId > 0) {
          
        GetComapnyLocation(props.CompanyLocationId);
      }
    };

    load();


  }, []);

  async function AddUpdateLocation(e) {
    try {
       
      e.preventDefault();
  //     console.log(companyid);

  if(companyid != "0")
  {
    if(companyLocation != "")
    {

      
      var CompanyLocationId = 0;
      CompanyLocationId = props.CompanyLocationId > 0 ? props.CompanyLocationId : 0;
      var OperationType=CompanyLocationId===0?OperationTypeId.Insert:OperationTypeId.Update;
      var UserId=localStorage.getItem('UserId');
      var UserIp=localStorage.getItem('UserIP');
      var RequestData = {OperationId:OperationType, CompanyLocationId: CompanyLocationId,LocationName:companyLocation, CompanyId:companyid,CreatedBy:UserId,UserIP:UserIp }
      const data = await fetchData(ControllerName.Setup,ApiMethods.CompanyLocation_Operation, RequestData);
  //    
      if (data.response===true && data.data.length >0) {
          if(data.data[0].HasError===1)
          {
               //alert(data.data[0].Message);
               Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });
          }
          else{
                    //alert("Added Successfully");
                    Swal.fire({ title: 'Success', text: "Added Successfully", icon:'success' });

        toggle();
          }
      }
      else {
              //alert("Error");
              Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon:'error' });

      }
    }
    else
    {
      Swal.fire({ title: 'Error', text: "Enter Company Location Name.", icon:'error' });
    }
  }
  else
  {
    Swal.fire({ title: 'Error', text: "Select Company Family", icon:'error' });
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
                        <Label for="">Company Location Name</Label>
                        <Input
                          type="text"
                          onChange={(e)=>setCompanyLocation(e.target.value)}
                          name="companyLocation"
                          max="50"
                          value={companyLocation}
                        />
                      </FormGroup>
                    </Col>
                    
            </Row>
          </Form>
      </ModalBody>
      <ModalFooter>
              <Button color="primary" size="sm" onClick={AddUpdateLocation}>Save</Button>
              <Button color="secondary" size="sm" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>

  );
}

export default ModalCompanyLocation;