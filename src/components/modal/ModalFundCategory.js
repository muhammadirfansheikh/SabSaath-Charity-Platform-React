import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail ,AllowAlphabatic} from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'

export const Modal_Fund_Category = (props) => {

    const initialValues = {

    };


    const [values, setValues] = useState(initialValues);
    const [fundCategory, setfundCategory] = useState("");
    const [categoryId, setcategoryId] = useState('0');
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
            if (props.FundCategoryId > 0) {

                var data = await GetSetupMaster(0, 0, "", props.FundCategoryId);
                if (data.response === true && data.data != null) {
                    
                    setfundCategory(data.data[0].SetupDetailName);
                    setcategoryId(data.data[0].ParentId);
                }
                else {
                    //  setUserList([]);
                }
            }
        };

        load();


    }, []);

    async function AddUpdateFundCategory(e) {
        try {
            e.preventDefault();

            setFormLoading(true)

            if (fundCategory != "") {
                if (categoryId != "0") {

                    var FundCategoryId = 0;
                    FundCategoryId = props.FundCategoryId > 0 ? props.FundCategoryId : 0;
                    var UserId = localStorage.getItem('UserId');
                    var UserIp = localStorage.getItem('UserIP');
                    let RequestData;
                    let data;



                    if (FundCategoryId === 0) ///Insert Operation
                    {
                        data = await InsertSetupDetail(SetupMasterIds.FundCategory, categoryId, fundCategory, "", "", "", UserId, UserIp);
                    }
                    else if (FundCategoryId !== 0) {
                        data = await UpdateSetupDetail(SetupMasterIds.FundCategory, categoryId, FundCategoryId, fundCategory, "", "", "", UserId, UserIp);
                    }


                    
                    if (data.response === true && data.data != null) {
                        if (data.data[0].HasError === 1) {
                            // alert(data.data[0].Message);
                            Swal.fire({ title: 'Error', text: data.data[0].Message, icon: 'error' });
                        }
                        else {

                            e.preventDefault();

                            props.ReBindGrid(SetupMasterIds.FundCategory, 0, "", 0);
                            //  ProvinceId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                            FundCategoryId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });
                            // toggle();

                            setcategoryId("0");
                            setfundCategory("");
                        }
                    }
                    else {
                        // alert("Error");
                        Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon: 'error' });

                    }
                }
                else {
                    Swal.fire({ title: 'Error', text: "Select Category", icon: 'error' })
                }
            }
            else { Swal.fire({ title: 'Error', text: "Enter Fund Category Name", icon: 'error' }) }
            setFormLoading(false)
        } catch (error) {
            
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateFundCategory}>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
       
                    <Row form>


                        <Col className="px-1" md={6}>
                            <FormGroup>
                                <Label for="">Category</Label>
                                <Input
                                    id="exampleSelect"
                                    name="categoryId"
                                    type="select"
                                    value={categoryId}
                                    onChange={(e) => setcategoryId(e.target.value)}
                                >
                                    <option key={0} value={0}>
                                        Select
                                    </option>

                                    {
                                        props.categoryddl.map((item, key) => (
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
                                <Label>Fund Category Name</Label>
                                <Input
                                    placeholder="Fund Category Name"
                                    type="text"
                                    required={true }
                                    maxLength="50"
                                    autoComplete="off"
                                    
                                    name="fundCategory"
                                    onChange={(e) => setfundCategory(AllowAlphabatic(e.target.value))}
                                    value={fundCategory}
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

export default Modal_Fund_Category;