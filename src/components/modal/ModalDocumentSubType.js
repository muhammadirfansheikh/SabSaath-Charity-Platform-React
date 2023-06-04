import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail, AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const ModalDocumentSubType = (props) => {

const initialValues = {
   
};


const [values, setValues] = useState(initialValues);
  const [documentsubtype, setdocumentsubtype] = useState("");
    const [documentTypeId, setdocumentTypeId] = useState('0');
    const [formLoading, setFormLoading] = useState(false);
    
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
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.DocumentSubTypeId > 0) {
               
                var data=await GetSetupMaster(0, 0,"",props.DocumentSubTypeId);
                if ( data.response===true && data.data != null) { 
                    setdocumentsubtype(data.data[0].SetupDetailName);
                    setdocumentTypeId(data.data[0].ParentId);
                  }
                  else {
                    //  setUserList([]);
                  }
            }
        };

        load();


    }, []);

    async function AddDocumentSubTypeLevel(e) {
        try {
            e.preventDefault();
            setFormLoading(true)
            if(documentTypeId != "0")
            {
                if(documentsubtype != ""){

                    var DocumentSubTypeId = 0;
                    DocumentSubTypeId = props.DocumentSubTypeId > 0 ? props.DocumentSubTypeId : 0;
                    var UserId = localStorage.getItem('UserId');
                    var UserIp = localStorage.getItem('UserIP');
                    let RequestData;
                    let data;
        
                     
        
                    if (DocumentSubTypeId === 0) ///Insert Operation
                    {
                        data=await InsertSetupDetail(SetupMasterIds.DocumentSubTypes,documentTypeId, documentsubtype, "", "", "", UserId, UserIp);
                    }
                    else if (DocumentSubTypeId !== 0) {
                       data=await UpdateSetupDetail(SetupMasterIds.DocumentSubTypes, documentTypeId, DocumentSubTypeId, documentsubtype, "", "", "", UserId, UserIp);
                    }
        
                  
                  
                    if (data.response === true && data.data != null) {
                        if (data.data[0].HasError === 1) {
                            //alert(data.data[0].Message);
                            Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });
                        }
                        else {
        
                            e.preventDefault();
                            
                            props.ReBindGrid(SetupMasterIds.DocumentSubTypes, 0, "", 0);
                            //DocumentSubTypeId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                            DocumentSubTypeId === 0 ? Swal.fire({ title: 'Success', text:"Added Successfully", icon:'success' }) : Swal.fire({ title: 'Success', text:"Updated Successfully", icon:'success' });
                            //toggle();
                            setdocumentsubtype("");

                            setdocumentTypeId("0");
                        }
                    }
                    else {
                        //alert("Error");
                        Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon:'error' });
        
                    }
                }
                else
                {
Swal.fire({ title: 'Error', text: "Enter Document Sub Type Name.", icon:'error' });
                }
            }
            else
            {
                Swal.fire({ title: 'Error', text: "Select Document Type.", icon:'error' });
            }
            setFormLoading(false)
        } catch (error) {
            
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddDocumentSubTypeLevel }>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
               
                    <Row form>
                    <Col className="px-1" md={6}>
                        <FormGroup>
                            <Label for="">Document Type</Label>
                           <Input
                          id="exampleSelect"
                          name="documenttypeid"
                          type="select"
                          value={documentTypeId}
                          //onChange={(e)=>setdocumentTypeId(e.target.value)}
                          onChange={(e) => setdocumentTypeId(e.target.value) }
                        >
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            props.DocumentTypddl.map((item, key) => (
                                <option key={item.SetupDetailName} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Document Sub Type Name</Label>
                                <Input
                                    placeholder="Document Sub Type Name"
                                    type="text"
                                    name="documentsubtype"
                                    maxLength="50"
                                    required={ true}
                                    autoComplete="off"
                                    onChange={(e) => setdocumentsubtype(AllowAlphabatic(e.target.value))}
                                    value={documentsubtype}
                                />
                            </FormGroup>
                        </Col>

                     
                    </Row>
        
            </ModalBody>
            <ModalFooter>
                    <FormGroupButton
                        title='Save'
                        type='submit'
                        loading={formLoading}
                    />
                <Button color="secondary" size="sm" onClick={toggle}>Close</Button>
                </ModalFooter>
                </form>
        </Modal>

    );
}

export default ModalDocumentSubType;