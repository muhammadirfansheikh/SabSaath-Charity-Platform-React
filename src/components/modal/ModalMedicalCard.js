import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail,AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'

export const ModalMedicalCardName = (props) => {


    const [MedicalCardName, setMedicalCardName] = useState("");
    const [formLoading, setFormLoading] = useState(false);


    function toggle() {
        props.closeNewmodal();
    }

    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.MedicalCardId > 0) {

                var data = await GetSetupMaster(0, 0, "", props.MedicalCardId);
                if (data.response === true && data.data != null) {
                    // 
                    setMedicalCardName(data.data[0].SetupDetailName)
                }
                else {
                    //  setUserList([]);
                }
            }
        };

        load();


    }, []);

    async function AddUpdateMedicalCard(e) {
        e.preventDefault();
        try { 
            setFormLoading(true)
            if (MedicalCardName != "") {


                var MedicalCardId = 0;
                MedicalCardId = props.MedicalCardId > 0 ? props.MedicalCardId : 0;
                var UserId = localStorage.getItem('UserId');
                var UserIp = localStorage.getItem('UserIP');
                let RequestData;
                let data;



                if (MedicalCardId === 0) ///Insert Operation
                {
                    data = await InsertSetupDetail(SetupMasterIds.MedicalCard, 0, MedicalCardName, "", "", "", UserId, UserIp);
                }
                else if (MedicalCardId !== 0) {
                    data = await UpdateSetupDetail(SetupMasterIds.MedicalCard, 0, MedicalCardId, MedicalCardName, "", "", "", UserId, UserIp);
                }


                  
                if (data.response === true && data.data != null) {
                    if (data.data[0].HasError === 1) {
                        //alert(data.data[0].Message);
                        Swal.fire({ title: 'Error', text: data.data[0].Message, icon: 'error' });
                    }
                    else {

                        e.preventDefault();
                        props.ReBindGrid(SetupMasterIds.MedicalCard, 0, "", 0);

                        // AcademicLevelId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                        MedicalCardId === 0 ? Swal.fire({ title: 'Success', text: data.data[0].Message, icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });

                        setMedicalCardName("");
                        //toggle();
                    }
                }
                else {
                    //alert("Error");
                    Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon: 'error' });

                }
            }
            else {

                Swal.fire({ title: 'Error', text: "Enter Medical Card Name.", icon: 'error' });
            }
            setFormLoading(false);

        } catch (error) {
          
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateMedicalCard}>
                <ModalHeader
                    toggle={toggle}>{props.HeaderText}</ModalHeader>
                <ModalBody>
                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Medical Card Name</Label>
                                <Input
                                    placeholder="Medical Card Name"
                                    type="text"
                                    name="MedicalCardName"
                                    maxLength="50"
                                    autoComplete="off"
                                    onChange={(e) => setMedicalCardName(AllowAlphabatic(e.target.value))}
                                    value={MedicalCardName}
                                    required={true}
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

export default ModalMedicalCardName;