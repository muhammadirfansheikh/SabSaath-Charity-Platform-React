import React, { useState } from 'react'
import {Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { ApiMethods,ControllerName,OperationTypeId } from '../../utils/Constants.js'
import Swal from "sweetalert2";

export const ModalFundCategory = (props) => {

const initialValues = {
   
  };
  const [values, setValues] = useState(initialValues);
  const [fundCategory, setFundCategory] = useState("");
  const [categoryId, setCategoryId] = useState('0');

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
  async function GetFundCategory(FundCategoryId) {
    try {
    
      var RequestData = {OperationId:OperationTypeId.Select, FundCategoryId: FundCategoryId }
      const data = await fetchData(ControllerName.Setup,ApiMethods.FundCategory_Operation, RequestData);
      if ( data.response===true && data.data != null) {
       
        // initialValues.companyFamily = data.data[0].Family;
        // initialValues.companyid = data.data[0].CompanyId;
        setFundCategory(data.data[0].FundCategory);
        setCategoryId(data.data[0].CategoryId); 
        // setValues(initialValues);
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
      if (props.FundCategoryId > 0) {
        GetFundCategory(props.FundCategoryId);
      }
    };

    load();


  }, []);

  async function AddUpdateFundCategory(e) {
    try {
       
      e.preventDefault(); 
      
      var FundCategoryId = 0;
      FundCategoryId = props.FundCategoryId > 0 ? props.FundCategoryId : 0;
      var OperationType=FundCategoryId===0?OperationTypeId.Insert:OperationTypeId.Update;
      var UserId=localStorage.getItem('UserId');
      var UserIp=localStorage.getItem('UserIP');
      var RequestData = {OperationId:OperationType, FundCategoryId: FundCategoryId,FundCategoryName:fundCategory, CategoryId:categoryId,CreatedBy:UserId,UserIP:UserIp }
      const data = await fetchData(ControllerName.Setup,ApiMethods.FundCategory_Operation, RequestData);
     
      if (data.response===true && data.data.length >0) {
          if(data.data[0].HasError===1)
          {
               //alert(data.data[0].Message);
               Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });
          }
          else{

                   //alert("Added Successfully");
                   Swal.fire({ title: 'Success', text:"Added Successfully", icon:'success' });
        toggle();
          }
      }
      else {
        //alert("Error");
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
             <Col className="px-1" md={6}>
                      <FormGroup>
                        <Label for="">Fund Category Name</Label>
                        <Input
                          type="text"
                          onChange={(e)=>setFundCategory(e.target.value)}
                          name="fundCategory"
                          max="50"
                          value={fundCategory}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md={6}>
                        <FormGroup>
                            <Label for="">Category</Label>
                           <Input
                          id="exampleSelect"
                          name="categoryId"
                          type="select"
                          value={categoryId}
                          onChange={(e)=>setCategoryId(e.target.value)}
                        >
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            props.categoryddl.map((item, key) => (
                              <option key={item.CategoryId} value={item.CategoryId}>
                                {item.Category}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>
            </Row>
          </Form>
      </ModalBody>
      <ModalFooter>
              <Button color="primary" size="sm" onClick={AddUpdateFundCategory}>Save</Button>
              <Button color="secondary" size="sm" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>

  );
}

export default ModalFundCategory;