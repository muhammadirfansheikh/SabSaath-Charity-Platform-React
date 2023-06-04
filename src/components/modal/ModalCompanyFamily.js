import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail, AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const Modal_CompanyFamily = (props) => {

    const initialValues = {
        CompanyFamilyName: "",
        ParentCompanyFamily: '0',

    };


    const [values, setValues] = useState(initialValues);
    const [ModalParentCompanyFamilyddl, setModalParentCompanyFamilyddl] = useState([]);
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
            if (props.CompanyFamilyId > 0) {

                var data = await GetSetupMaster(0, 0, "", props.CompanyFamilyId);
                if (data.response === true && data.data != null) {






                    resetModalFormelement();

                    setValues((prevState) => ({
                        ...prevState,
                        CompanyFamilyName: data.data[0].SetupDetailName,
                        ParentCompanyFamily: data.data[0].ParentId

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


        props.ReBindGrid(SetupMasterIds.CompanyFamily, 0, "", 0);

        let ddlParentCompanyFamilyData = await props.GetParentCompanyFamily();



        setModalParentCompanyFamilyddl(ddlParentCompanyFamilyData.data);

    }



    async function AddUpdateCompanyFamily(e) {
        try { 
            e.preventDefault();

            setFormLoading(true)

            if (values.CompanyFamilyName != "") {

                var CompanyFamilyId = 0;
                CompanyFamilyId = props.CompanyFamilyId > 0 ? props.CompanyFamilyId : 0;
                var UserId = localStorage.getItem('UserId');
                var UserIp = localStorage.getItem('UserIP');
                let RequestData;
                let data;



                if (CompanyFamilyId === 0) ///Insert Operation
                {
                    data = await InsertSetupDetail(SetupMasterIds.CompanyFamily, values.ParentCompanyFamily, values.CompanyFamilyName, "", "", "", UserId, UserIp);
                }
                else if (CompanyFamilyId !== 0) {
                    data = await UpdateSetupDetail(SetupMasterIds.CompanyFamily, values.ParentCompanyFamily, CompanyFamilyId, values.CompanyFamilyName, "", "", "", UserId, UserIp);
                }


                
                if (data.response === true && data.data != null) {
                    if (data.data[0].HasError === 1) {
                        // alert(data.data[0].Message);
                        Swal.fire({ title: 'Error', text: data.data[0].Message, icon: 'error' });
                    }
                    else {

                        e.preventDefault();

                        props.ReBindGrid(SetupMasterIds.CompanyFamily, 0, "", 0);
                        // AreaId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                        CompanyFamilyId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });

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
                //alert("Enter Area Name");
                Swal.fire({ title: 'Error', text: "Please Enter Company Family Name", icon: 'warning' });

            }




            setFormLoading(false)



        } catch (error) {
            
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle}>
            <form onSubmit={AddUpdateCompanyFamily}>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
               
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="">Parent Company Family</Label>
                                <Input
                                    id="exampleSelect"
                                    name="ParentCompanyFamily"
                                    type="select"
                                    value={values.ParentCompanyFamily}
                                    onChange={handleInputChange}>
                                    <option key={0} value={0}>
                                        Select
                                    </option>

                                    {
                                        ModalParentCompanyFamilyddl.map((item, key) => (
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
                                <Label>Company Family Name</Label>
                                <Input
                                    placeholder="Parent Company Family Name"
                                    type="text"
                                    name="CompanyFamilyName"
                                    isalphabetic="true"
                                    onChange={handleInputChange}
                                    value={values.CompanyFamilyName}
                                    max="50"
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

export default Modal_CompanyFamily;