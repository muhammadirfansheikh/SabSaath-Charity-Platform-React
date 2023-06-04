import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail, AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const Modal_Frequency = (props) => {

    const initialValues = {
        FrequencyName: "",

    };


    const [values, setValues] = useState(initialValues);
    const [formLoading, setFormLoading] = useState(false);

    const handleInputChange = (e) => { 
        const { name, value } = e.target;
        let values = e.target.value;


        if (e.target.getAttribute("isalphabetic") === "true") { 
            values = AllowAlphabatic(e.target.value);
        } 
        setValues({
            ...values,
            [name]: values,
        });
    };
    function toggle() {
        props.closeNewmodal();
    }

    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.FrequencyId > 0) {

                var data = await GetSetupMaster(0, 0, "", props.FrequencyId);
                if (data.response === true && data.data != null) {


                    resetModalFormelement();

                    setValues((prevState) => ({
                        ...prevState,
                        FrequencyName: data.data[0].SetupDetailName,

                    }))


                }
                else {

                }
            }
            else {

                resetModalFormelement();
            }

        };

        load();


    }, []);
    const resetModalFormelement = async () => {


        props.ReBindGrid(SetupMasterIds.Frequency, 0, "", 0);


    }





    async function AddUpdateFrequency(e) {
        try {



            e.preventDefault();

            setFormLoading(true);

            if (values.FrequencyName != "") {

                var FrequencyId = 0;
                FrequencyId = props.FrequencyId > 0 ? props.FrequencyId : 0;
                var UserId = localStorage.getItem('UserId');
                var UserIp = localStorage.getItem('UserIP');
                let RequestData;
                let data;



                if (FrequencyId === 0) ///Insert Operation
                {
                    data = await InsertSetupDetail(SetupMasterIds.Frequency, "0", values.FrequencyName, "", "", "", UserId, UserIp);
                }
                else if (FrequencyId !== 0) {
                    data = await UpdateSetupDetail(SetupMasterIds.Frequency, "0", FrequencyId, values.FrequencyName, "", "", "", UserId, UserIp);
                }


                // 
                if (data.response === true && data.data != null) {
                    if (data.data[0].HasError === 1) {
                        // alert(data.data[0].Message);
                        Swal.fire({ title: 'Error', text: data.data[0].Message, icon: 'error' });
                    }
                    else {

                        e.preventDefault();

                        props.ReBindGrid(SetupMasterIds.Frequency, 0, "", 0);
                        //ReligionId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                        FrequencyId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });
                        //toggle();

                        setValues(initialValues);
                    }
                }
                else {
                    //alert("Error");
                    Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon: 'error' });
                }

            }
            else {
                //alert("Enter Union Name");
                Swal.fire({ title: 'Error', text: "Please Enter Frequency Name", icon: 'warning' });

            }

            setFormLoading(false);

        } catch (error) {
          
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateFrequency}>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
                
                    <Row form>


                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Frequency Name</Label>
                                <Input
                                    placeholder="Frequency Name"
                                    type="text"
                                    name="FrequencyName"
                                    maxLength="50"
                                    isalphabetic="true"
                                    autoComplete="off"
                                    required={true}
                                    onChange={handleInputChange}
                                    value={values.FrequencyName}

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

export default Modal_Frequency;