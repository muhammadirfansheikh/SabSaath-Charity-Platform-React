import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail,AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const ModalRelation = (props) => {


    const [relationName, setrelationName] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    function toggle() {
        props.closeNewmodal();
    }
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.RelationId > 0) {
               
                var data=await GetSetupMaster(0, 0,"",props.RelationId);
                if ( data.response===true && data.data != null) {
         //          
                    setrelationName(data.data[0].SetupDetailName)
                  }
                  else {
                    //  setUserList([]);
                  }
            }
        };

        load();


    }, []);

    async function AddUpdateRelation(e) {
        try {
            e.preventDefault();
     //       
            setFormLoading(true)
     if(relationName != "")
     {
        var RelationId = 0;
        RelationId = props.RelationId > 0 ? props.RelationId : 0;
        var UserId = localStorage.getItem('UserId');
        var UserIp = localStorage.getItem('UserIP');
        let RequestData;
        let data;

         

        if (RelationId === 0) ///Insert Operation
        {
            data=await InsertSetupDetail(SetupMasterIds.Relation, 0, relationName, "", "", "", UserId, UserIp);
        }
        else if (RelationId !== 0) {
           data=await UpdateSetupDetail(SetupMasterIds.Relation, 0, RelationId, relationName, "", "", "", UserId, UserIp);
        }


 //       
        if (data.response === true && data.data != null) {
            if (data.data[0].HasError === 1) {
                //alert(data.data[0].Message);
                Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });
            }
            else {

                e.preventDefault();
                
                props.ReBindGrid(SetupMasterIds.Relation, 0, "", 0);
               // RelationId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
               RelationId === 0 ? Swal.fire({ title: 'Success', text:"Added Successfully", icon:'success' }) : Swal.fire({ title: 'Success', text:"Updated Successfully", icon:'success' });
                //toggle();

                setrelationName("");
            }
        }
        else {
           // alert("Error");
           Swal.fire({ title: 'Error', text: "Error", icon:'error' });

        }
     }
     else{
        Swal.fire({ title: 'Error', text: "Enter Relation Name.", icon:'error' });
     }
            setFormLoading(false)
        } catch (error) {
   //         
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateRelation}>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
                
                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Relation Name</Label>
                                <Input
                                    placeholder="Relation Name"
                                    type="text"
                                    name="relationname"
                                    required={true }
                                    autoComplete="off"
                                    maxLength="50"
                                    onChange={(e) => setrelationName(AllowAlphabatic(e.target.value))}
                                    value={relationName}
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

export default ModalRelation;