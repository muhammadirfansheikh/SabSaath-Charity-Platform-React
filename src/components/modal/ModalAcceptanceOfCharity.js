import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail,AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const ModalAcceptanceOfCharity = (props) => {


    const [acceptanceOfCharityName, setacceptanceOfCharityName] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    function toggle() {
        props.closeNewmodal();
    }
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.AcceptanceOfCharityId > 0) {
               
                var data=await GetSetupMaster(0, 0,"",props.AcceptanceOfCharityId);
                if ( data.response===true && data.data != null) {
                    
                    setacceptanceOfCharityName(data.data[0].SetupDetailName)
                  }
                  else {
                    //  setUserList([]);
                  }
            }
        };

        load();


    }, []);

    async function AddUpdateAcceptanceOfCharity(e) {
        try {
            e.preventDefault();
            setFormLoading(true);
            if(acceptanceOfCharityName != "")
            {

                var AcceptanceOfCharityId = 0;
                AcceptanceOfCharityId = props.AcceptanceOfCharityId > 0 ? props.AcceptanceOfCharityId : 0;
                var UserId = localStorage.getItem('UserId');
                var UserIp = localStorage.getItem('UserIP');
                let RequestData;
                let data;
    
                 
    
                if (AcceptanceOfCharityId === 0) ///Insert Operation
                {
                    data=await InsertSetupDetail(SetupMasterIds.AcceptanceOfCharity, 0, acceptanceOfCharityName, "", "", "", UserId, UserIp);
                }
                else if (AcceptanceOfCharityId !== 0) {
                   data=await UpdateSetupDetail(SetupMasterIds.AcceptanceOfCharity, 0, AcceptanceOfCharityId, acceptanceOfCharityName, "", "", "", UserId, UserIp);
                }
    
    
             
                if (data.response === true && data.data != null) {
                    if (data.data[0].HasError === 1) {
                        //alert(data.data[0].Message);
                        Swal.fire({ title: 'Error', text:data.data[0].Message, icon:'error' });
    
                    }
                    else {
    
                        e.preventDefault();
                        
                        props.ReBindGrid(SetupMasterIds.AcceptanceOfCharity, 0, "", 0);
                       // AcceptanceOfCharityId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                        AcceptanceOfCharityId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });

                        setacceptanceOfCharityName("");
                       // toggle();
                    }
                }
                else {
                    //alert("Error");
                    Swal.fire({ title: 'Error', text:"Some Thing Went Wrong", icon:'error' });
    
                }
            }
            else
            {
                Swal.fire({ title: 'Error', text:"Enter Acceptance Of Charity Name.", icon:'error' });
            }
            setFormLoading(false);
        } catch (error) { 
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateAcceptanceOfCharity}>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
               
                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Acceptance Of Charity Name</Label>
                                <Input
                                    placeholder="Acceptance Of Charity Name"
                                    type="text"
                                    maxLength="50"
                                    autoComplete="off"
                                    name="acceptanceofcharityname"
                                    onChange={(e) => setacceptanceOfCharityName(AllowAlphabatic(e.target.value))}
                                    value={acceptanceOfCharityName}
                                    required={true }
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

export default ModalAcceptanceOfCharity;