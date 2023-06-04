import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail , AllowAlphabatic} from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const ModalDocumentType = (props) => {


    const [documentTypeName, setdocumentTypeName] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    function toggle() {
        props.closeNewmodal();
    }
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.DocumentTypeId > 0) {
               
                var data=await GetSetupMaster(0, 0,"",props.DocumentTypeId);
                if ( data.response===true && data.data != null) {
             //      
                    setdocumentTypeName(data.data[0].SetupDetailName)

                  }
                  else {
                    //  setUserList([]);
                  }
            }
        };

        load();


    }, []);

    async function AddUpdateDocumentType(e) {
        try {
            e.preventDefault();
            setFormLoading(true)
            if(documentTypeName != "")
            {
                
                var DocumentTypeId = 0;
                DocumentTypeId = props.DocumentTypeId > 0 ? props.DocumentTypeId : 0;
                var UserId = localStorage.getItem('UserId');
                var UserIp = localStorage.getItem('UserIP');
                let RequestData;
                let data;
    
                 
    
                if (DocumentTypeId === 0) ///Insert Operation
                {
                    data=await InsertSetupDetail(SetupMasterIds.DocumentParentTypes, 0, documentTypeName, "", "", "", UserId, UserIp);
                }
                else if (DocumentTypeId !== 0) {
                   data=await UpdateSetupDetail(SetupMasterIds.DocumentParentTypes, 0, DocumentTypeId, documentTypeName, "", "", "", UserId, UserIp);
                }
    
    
           //     
                if (data.response === true && data.data != null) {
                    if (data.data[0].HasError === 1) {
                      //  alert(data.data[0].Message);
                      Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });
                    }
                    else {
    
                        e.preventDefault();
                        
                        props.ReBindGrid(SetupMasterIds.DocumentParentTypes, 0, "", 0);
                       // DocumentTypeId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                        DocumentTypeId === 0 ? Swal.fire({ title: 'Success', text: data.data[0].Message, icon:'success' }) : Swal.fire({ title: 'Success', text:"Updated Successfully", icon:'success' });
                        //toggle();
                        setdocumentTypeName("");
                    }
                }
                else {
                    //alert("Error");
                    Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon:'error' });
    
                }
            }
            else
            {
                Swal.fire({ title: 'Error', text: "Enter Document Type.", icon:'error' });

            }
            setFormLoading(false)
        } catch (error) {
       
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateDocumentType}>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
                
                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Document Type Name</Label>
                                <Input
                                    placeholder="Document Type Name"
                                    type="text"
                                    name="doucmenttypename"
                                    maxLength="50"
                                    autoComplete="off"
                                    required={true}
                                    //onChange={(e) => setdocumentTypeName(e.target.value)}
                                    //onChange={(e) => setdocumentTypeName(AllowAlphabatic(e.target.value)) }
                                    onChange={(e) => setdocumentTypeName(AllowAlphabatic( e.target.value)) }
                                    value={documentTypeName}
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

export default ModalDocumentType;