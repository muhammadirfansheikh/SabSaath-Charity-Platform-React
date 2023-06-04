import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail, AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'

export const Modal_Bank = (props) => {

    const initialValues = {
        BankName: "",
        BankType: ""

    };


    const [values, setValues] = useState(initialValues);
    const [formLoading, setFormLoading] = useState(false);

    const handleInputChange = (e) => { 
        const { name, value } = e.target;
        let _values = e.target.value;


        if (e.target.getAttribute("isalphabetic") === "true") { 
            _values = AllowAlphabatic(e.target.value);
        } 
        setValues({
            ...values,
            [name]: _values,
        });
    };
    function toggle() {
        props.closeNewmodal();
    }

    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.BankId > 0) {

                var data = await GetSetupMaster(0, 0, "", props.BankId);
                if (data.response === true && data.data != null) {


                    resetModalFormelement("");

                    setValues((prevState) => ({
                        ...prevState,
                        BankName: data.data[0].SetupDetailName,
                        BankType: data.data[0].Flex1,
                    }))


                }
                else {

                }
            }
            else {

                resetModalFormelement("");
            }

        };

        load();


    }, []);
    const resetModalFormelement = async (BankType = "") => {


        props.ReBindGrid(SetupMasterIds.Bank, 0, "", 0, BankType);


    }





    async function AddUpdateBank(e) {
        try {



            e.preventDefault();
            setFormLoading(true)

            if (values.BankType != "") {
                if (values.BankName != "") {

                    var BankId = 0;
                    BankId = props.BankId > 0 ? props.BankId : 0;
                    var UserId = localStorage.getItem('UserId');
                    var UserIp = localStorage.getItem('UserIP');
                    let RequestData;
                    let data;



                    if (BankId === 0) ///Insert Operation
                    {
                        data = await InsertSetupDetail(SetupMasterIds.Bank, "0", values.BankName, values.BankType, "", "", UserId, UserIp);
                    }
                    else if (BankId !== 0) {
                        data = await UpdateSetupDetail(SetupMasterIds.Bank, "0", BankId, values.BankName, values.BankType, "", "", UserId, UserIp);
                    } 
                    if (data.response === true && data.data != null) {
                        if (data.data[0].HasError === 1) {
                            // alert(data.data[0].Message);
                            Swal.fire({ title: 'Error', text: data.data[0].Message, icon: 'error' });
                        }
                        else {

                            e.preventDefault();

                            props.ReBindGrid(SetupMasterIds.Bank, 0, "", 0, "");
                            // BankId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                            BankId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });
                            setValues(initialValues);
                            // toggle();
                        }
                    }
                    else {
                        // alert("Error");
                        Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon: 'error' });
                    }

                }
                else {
                    //alert("Enter Bank Name");
                    Swal.fire({ title: 'Error', text: "Please Enter Bank Name", icon: 'warning' });

                }
            }
            else {
                //alert("Select Bank Type");
                Swal.fire({ title: 'Error', text: "Please Select Bank Type", icon: 'warning' });
            }





            setFormLoading(false)




        } catch (error) { 
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateBank} >
                <ModalHeader
                    toggle={toggle}>{props.HeaderText}</ModalHeader>
                <ModalBody>

                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="">Bank Type</Label>
                                <Input
                                    id="exampleSelect"
                                    name="BankType"
                                    type="select"
                                    value={values.BankType}
                                    onChange={handleInputChange}>
                                    <option key="" value="">
                                        Select
                                    </option>
                                    <option key="0" value="0">
                                        Non Micro Finance Bank
                                    </option>
                                    <option key="1" value="1">
                                        Micro Finance Bank
                                    </option>
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Bank Name</Label>
                                <Input
                                    placeholder="Bank Name"
                                    type="text"
                                    name="BankName"
                                    maxLength="50"
                                    autoComplete="off"
                                    isalphabetic="true"
                                    onChange={handleInputChange}
                                    value={values.BankName}
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

export default Modal_Bank;