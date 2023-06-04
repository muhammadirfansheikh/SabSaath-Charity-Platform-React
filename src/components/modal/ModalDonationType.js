import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail , AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const ModalDonationType = (props) => {


    const [donationTypeName, setdonationTypeName] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    function toggle() {
        props.closeNewmodal();
    }
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.DonationTypeId > 0) {
               
                var data=await GetSetupMaster(0, 0,"",props.DonationTypeId);
                if ( data.response===true && data.data != null) {
          //         
                    setdonationTypeName(data.data[0].SetupDetailName)
                  }
                  else {
                    //  setUserList([]);
                  }
            }
        };

        load();


    }, []);

    async function AddUpdateDonationType(e) {
        try {
            e.preventDefault();
            setFormLoading(true)
            if(donationTypeName != "")
            {
               
            var DonationTypeId = 0;
            DonationTypeId = props.DonationTypeId > 0 ? props.DonationTypeId : 0;
            var UserId = localStorage.getItem('UserId');
            var UserIp = localStorage.getItem('UserIP');
            let RequestData;
            let data;

             

            if (DonationTypeId === 0) ///Insert Operation
            {
                data=await InsertSetupDetail(SetupMasterIds.DonationType, 0, donationTypeName, "", "", "", UserId, UserIp);
            }
            else if (DonationTypeId !== 0) {
               data=await UpdateSetupDetail(SetupMasterIds.DonationType, 0, DonationTypeId, donationTypeName, "", "", "", UserId, UserIp);
            }


       //     
            if (data.response === true && data.data != null) {
                if (data.data[0].HasError === 1) {
                    //alert(data.data[0].Message);
                    Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });
                }
                else {

                    e.preventDefault();
                    
                    props.ReBindGrid(SetupMasterIds.DonationType, 0, "", 0);
                    //DonationTypeId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                    DonationTypeId === 0 ? Swal.fire({ title: 'Success', text: data.data[0].Message, icon:'success' }) : Swal.fire({ title: 'Success', text:"Updated Successfully", icon:'success' });
                    //toggle();

                    setdonationTypeName("");
                }
            }
            else {
                //alert("Error");
                Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon:'error' });
            }
            }
            else
            {
                Swal.fire({ title: 'Error', text: "Enter Donation Type.", icon:'error' });
            }
            setFormLoading(false)
        } catch (error) {
          
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateDonationType }>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
                
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Donation Type Name</Label>
                                <Input
                                    placeholder="Donation Type Name"
                                    type="text"
                                    maxLength="50"
                                    autoComplete="off"
                                    required={ true}
                                    name="donationtypename"
                                    //onChange={(e) => setdonationTypeName(e.target.value)}
                                    onChange={(e) => setdonationTypeName(AllowAlphabatic(e.target.value)) }
                                    value={donationTypeName}
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

export default ModalDonationType;