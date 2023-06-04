import React, { useState } from 'react'
import {Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { ApiMethods,ControllerName,OperationTypeId } from '../../utils/Constants.js'

export const ModalCategory = (props) => {


  const [categoryName, setCategoryName] = useState("");

  function toggle() {
    props.closeNewmodal();
  }
  async function GetCategory(CategoryId) {
    try { 
      var RequestData = {OperationId:OperationTypeId.Select, CategoryId: CategoryId }
      const data = await fetchData(ControllerName.Setup,ApiMethods.Category_Operation, RequestData);
      if ( data.response===true && data.data != null) { 
        setCategoryName(data.data[0].Category)
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
      if (props.CategoryId > 0) {
        GetCategory(props.CategoryId);
      }
    };

    load();


  }, []);

  async function AddUpdateCategory(e) {
    try {
      e.preventDefault();
     
      var CategoryId = 0;
      CategoryId = props.CategoryId > 0 ? props.CategoryId : 0;
      var OperationType=CategoryId===0?OperationTypeId.Insert:OperationTypeId.Update;
      var UserId=localStorage.getItem('UserId');
      var UserIp=localStorage.getItem('UserIP');
      var RequestData = {OperationId:OperationType, CategoryId: CategoryId, CategoryName:categoryName,CreatedBy:UserId,UserIP:UserIp }
      const data = await fetchData(ControllerName.Setup,ApiMethods.Category_Operation, RequestData);
    
      if (data.response===true && data.data != null) {
          if(data.data[0].HasError===1)
          { 
          }
          else{ 
        toggle();
          }
      }
      else { 
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
                  <Label>Category Name</Label>
                  <Input
                    placeholder="Category Name"
                    type="text"
                    name="categoryName"
                    onChange={(e) => setCategoryName(e.target.value)}
                    value={categoryName}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
      </ModalBody>
      <ModalFooter>
              <Button color="primary" size="sm" onClick={AddUpdateCategory}>Save</Button>
              <Button color="secondary" size="sm" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>

  );
}

export default ModalCategory;