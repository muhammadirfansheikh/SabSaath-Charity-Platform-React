import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail,AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const Modal_PaymentType = (props) => {

    const initialValues = {
        PaymentTypeName: "",

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
            if (props.PaymentTypeId > 0) {

                var data = await GetSetupMaster(0, 0, "", props.PaymentTypeId);
                if (data.response === true && data.data != null) {


                    resetModalFormelement();

                    setValues((prevState) => ({
                        ...prevState,
                        PaymentTypeName: data.data[0].SetupDetailName,

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


        props.ReBindGrid(SetupMasterIds.PaymentType, 0, "", 0);


    }





    async function AddUpdatePayment(e) {
        try {



            e.preventDefault();

            setFormLoading(true)

            if (values.PaymentTypeName != "") {

                var PaymentTypeId = 0;
                PaymentTypeId = props.PaymentTypeId > 0 ? props.PaymentTypeId : 0;
                var UserId = localStorage.getItem('UserId');
                var UserIp = localStorage.getItem('UserIP');
                let RequestData;
                let data;



                if (PaymentTypeId === 0) ///Insert Operation
                {
                    data = await InsertSetupDetail(SetupMasterIds.PaymentType, "0", values.PaymentTypeName, "", "", "", UserId, UserIp);
                }
                else if (PaymentTypeId !== 0) {
                    data = await UpdateSetupDetail(SetupMasterIds.PaymentType, "0", PaymentTypeId, values.PaymentTypeName, "", "", "", UserId, UserIp);
                }


                // 
                if (data.response === true && data.data != null) {
                    if (data.data[0].HasError === 1) {
                        // alert(data.data[0].Message);
                        Swal.fire({ title: 'Error', text: data.data[0].Message, icon: 'error' });
                    }
                    else {

                        e.preventDefault();

                        props.ReBindGrid(SetupMasterIds.PaymentType, 0, "", 0);
                        //ReligionId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                        PaymentTypeId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });
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
                Swal.fire({ title: 'Error', text: "Please Enter Payment Type Name", icon: 'warning' });

            }


            setFormLoading(false)






        } catch (error) {
          
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdatePayment}>
                <ModalHeader
                    toggle={toggle}>{props.HeaderText}</ModalHeader>
                <ModalBody>

                    <Row form>


                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Payment Type Name</Label>
                                <Input
                                    placeholder="Payment Name"
                                    type="text"
                                    name="PaymentTypeName"
                                    maxLength="50"
                                    isalphabetic="true"
                                    required={ true}
                                    autoComplete="off"
                                    onChange={handleInputChange}
                                    value={values.PaymentTypeName}

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

export default Modal_PaymentType;