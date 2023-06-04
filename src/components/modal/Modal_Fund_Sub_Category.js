import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import ModalFundCategory from './ModalFundCategory_bkp.js'
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const Modal_Fund_Sub_Category = (props) => {
    
    const initialValues = {
        FundSubCategoryName: "",
        FundSubCategoryAmount: "0",
        IsFixedValue: false,
        CategoryValue: '0',
        FundCategoryValue: '0',
    };


    const [modalValues, setmodalValues] = useState(initialValues);
    const [Modalcategoryddl, setModalcategoryddl] = useState([]);
    const [ModalfundCategoryddl, setModalfundCategoryddl] = useState([]);
    const [formLoading, setFormLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const values = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setmodalValues({
            ...modalValues,
            [name]: values,
        });
    };
    function toggle() {
        props.closeNewmodal();
    }

    React.useEffect(() => {
        
        // need to define the function and call it separately
        const load = async () => {
            if (props.FundSubCategoryId > 0) {

                var data = await GetSetupMaster(0, 0, "", props.FundSubCategoryId);
                if (data.response === true && data.data != null) {

                    let funCategory = await GetSetupMaster(0, 0, "", data.data[0].ParentId);
                    let categoryId = funCategory.data[0].ParentId;
                    resetModalFormelement(categoryId);

                    setmodalValues((prevState) => ({
                        ...prevState,
                        FundSubCategoryName: data.data[0].SetupDetailName,
                        FundSubCategoryAmount: data.data[0].Flex1 == "" ? "0" : data.data[0].Flex1,
                        IsFixedValue: data.data[0].Flex2 == "0" ? false : true,
                        FundCategoryValue: data.data[0].ParentId,
                        CategoryValue: categoryId


                    }))


                }
                else {

                }
            }
            else {

                resetModalFormelement(-1);
            }

        };

        load();


    }, []);
    const resetModalFormelement = async (loadCategoryId = -1) => {
        props.ReBindGrid(SetupMasterIds.FundSubCategory, 0, "", 0);

        let ddlCategoryData = await props.GetCategory();
        let ddlFundCategoryData = await props.GetFundCategory(loadCategoryId);

        setModalcategoryddl(ddlCategoryData.data);
        setModalfundCategoryddl(ddlFundCategoryData.data);

    }

    const handleModalCategoryChangeEvent = async (e) => {

        handleInputChange(e);
        let data = await props.GetFundCategory(e.target.value);
        setModalfundCategoryddl(data.data);

    }


    async function SaveData(e) {
        
        var FundSubCategoryId = 0;
        FundSubCategoryId = props.FundSubCategoryId > 0 ? props.FundSubCategoryId : 0;
        var UserId = localStorage.getItem('UserId');
        var UserIp = localStorage.getItem('UserIP');
        let RequestData;
        let data;
        let fixedValue = "0";

if(modalValues.IsFixedValue)
    fixedValue = "1"
else
fixedValue = "0";


        if (FundSubCategoryId === 0) ///Insert Operation
        {
            data = await InsertSetupDetail(SetupMasterIds.FundSubCategory, modalValues.FundCategoryValue, modalValues.FundSubCategoryName,modalValues.FundSubCategoryAmount,fixedValue, "", UserId, UserIp);
        }
        else if (FundSubCategoryId !== 0) {
            data = await UpdateSetupDetail(SetupMasterIds.FundSubCategory, modalValues.FundCategoryValue, FundSubCategoryId, modalValues.FundSubCategoryName,modalValues.FundSubCategoryAmount,fixedValue, "", UserId, UserIp);
        }
 
        if (data.response === true && data.data != null) {
            if (data.data[0].HasError === 1) { 
                Swal.fire({ title: 'Error', text: data.data[0].Message, icon: 'error' });

            }
            else {

                e.preventDefault(); 
                FundSubCategoryId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });

                setmodalValues(initialValues);
                //toggle();
            }
        }
        else { 
            Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon: 'error' });
        }
    }
    async function AddUpdateFundSubCategory(e) {
        
        try {
            e.preventDefault();
            setFormLoading(true);

            if (modalValues.FundCategoryValue != "0") {

                if (modalValues.FundSubCategoryName != "") {

                    if (modalValues.FundSubCategoryAmount != "") {
                        if (modalValues.IsFixedValue && parseInt(modalValues.FundSubCategoryAmount) > 0) {
                            SaveData(e);
                        }
                        else {
                            if (!modalValues.IsFixedValue) {
                                SaveData(e);
                            }
                            else { Swal.fire({ title: 'Error', text: "Amount Must Be Greater Then Zero If Is Fixed Amount Check.", icon: 'error' }) }
                        }
                    }
                    else {
                        Swal.fire({ title: 'Error', text: "Fund Sub Category Amount Empty.", icon: 'error' })
                    }

                }
                else {
                    Swal.fire({ title: 'Error', text: "Enter Fund Sub Category Name", icon: 'error' });
                }

            }
            else {
                Swal.fire({ title: 'Error', text: "Select Fund Category", icon: 'error' });
            }



            setFormLoading(false);
        } catch (error) { 
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateFundSubCategory }>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
               
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="">Category</Label>
                                <Input
                                    id="exampleSelect"
                                    name="CategoryValue"
                                    type="select"
                                    value={modalValues.CategoryValue}
                                    onChange={handleModalCategoryChangeEvent}>
                                    <option key={0} value={0}>
                                        Select
                                    </option>

                                    {
                                        Modalcategoryddl.map((item, key) => (
                                            <option key={item.SetupDetailName} value={item.SetupDetailId}>
                                                {item.SetupDetailName}
                                            </option>
                                        ))
                                    }
                                </Input>
                            </FormGroup>
                        </Col>



                        <Col md={6}>
                            <FormGroup>
                                <Label for="">Fund Category</Label>
                                <Input
                                    id="exampleSelect"
                                    name="FundCategoryValue"
                                    type="select"
                                    value={modalValues.FundCategoryValue}
                                    onChange={handleInputChange}>
                                    <option key={0} value={0}>
                                        Select
                                    </option>

                                    {
                                        ModalfundCategoryddl.map((item, key) => (
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
                                <Label>Fund Sub Category Name</Label>
                                <Input
                                    placeholder="Fund Sub Category Name"
                                    type="text"
                                    max="50"
                                    name="FundSubCategoryName"
                                    onChange={handleInputChange}
                                    value={modalValues.FundSubCategoryName}
                                />
                            </FormGroup>
                        </Col>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Fund Sub Category Amount</Label>
                                <Input
                                    placeholder="Fund Sub Category Amount"
                                    type="number"
                                    min="0"
                                    name="FundSubCategoryAmount"
                                    onChange={handleInputChange}
                                    value={modalValues.FundSubCategoryAmount}
                                />
                            </FormGroup>
                        </Col>



                        <Col md={12}>
                            <FormGroup>
                                <div className="form-check-inline mt-3">
                                    <Label className="form-check-Label">
                                        <Input
                                            type="checkbox"
                                            className="form-check-Input"
                                            name="IsFixedValue"
                                            checked={modalValues.IsFixedValue}
                                            onChange={handleInputChange} />
                                        Is Fixed Value ?
                                    </Label>
                                </div>
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

export default Modal_Fund_Sub_Category;