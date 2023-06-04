import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail, AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const ModalCity_Village = (props) => {

    const initialValues = {
        CityName: "",
        CountryValue: '0',
        ProvinceValue: '0',
    };


    const [values, setValues] = useState(initialValues);
    const [Modalcountryddl, setModalcountryddl] = useState([]);
    const [Modalprovinceddl, setModalprovinceddl] = useState([]);
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
            if (props.CityId > 0) {

                var data = await GetSetupMaster(0, 0, "", props.CityId);
                if (data.response === true && data.data != null) {

                    let countryId = await GetSetupMaster(0, 0, "", data.data[0].ParentId);
                    countryId = countryId.data[0].ParentId;
                    resetModalFormelement(countryId);

                    setValues((prevState) => ({
                        ...prevState,
                        CityName: data.data[0].SetupDetailName,
                        ProvinceValue: data.data[0].ParentId,
                        CountryValue: countryId


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
    const resetModalFormelement = async (loadCountryId = -1) => {
        props.ReBindGrid(SetupMasterIds.City, 0, "", 0);

        let ddlCountryData = await props.GetCountry();
        let ddlProvinceData = await props.GetProvince(loadCountryId);

        setModalcountryddl(ddlCountryData.data);
        setModalprovinceddl(ddlProvinceData.data);

    }

    const handleModalCountryChangeEvent = async (e) => {

        handleInputChange(e);
        let data = await props.GetProvince(e.target.value);
        setModalprovinceddl(data.data);

    }
    async function AddUpdateCity(e) {
        try { 
            e.preventDefault();
            setFormLoading(true)
            if (values.ProvinceValue != "0") {
                if (values.CityName != "") {

                    var CityId = 0;
                    CityId = props.CityId > 0 ? props.CityId : 0;
                    var UserId = localStorage.getItem('UserId');
                    var UserIp = localStorage.getItem('UserIP');
                    let RequestData;
                    let data;



                    if (CityId === 0) ///Insert Operation
                    {
                        data = await InsertSetupDetail(SetupMasterIds.City, values.ProvinceValue, values.CityName, "", "", "", UserId, UserIp);
                    }
                    else if (CityId !== 0) {
                        data = await UpdateSetupDetail(SetupMasterIds.City, values.ProvinceValue, CityId, values.CityName, "", "", "", UserId, UserIp);
                    }


                    //      
                    if (data.response === true && data.data != null) {
                        if (data.data[0].HasError === 1) {
                            //alert(data.data[0].Message);
                            Swal.fire({ title: 'Error', text: data.data[0].Message, icon: 'error' });

                        }
                        else {

                            e.preventDefault();
                            props.ReBindGrid(SetupMasterIds.City, 0, "", 0);
                            // CityId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                            CityId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });

                            setValues(initialValues);
                            /// toggle();
                        }
                    }
                    else {
                        // alert("Error");
                        Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon: 'error' });
                    }
                }
                else {
                    Swal.fire({ title: 'Error', text: "Enter City Name.", icon: 'error' });
                }
            }
            else {
                Swal.fire({ title: 'Error', text: "Select Province.", icon: 'error' });

            }

            setFormLoading(false)
        } catch (error) {
          
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateCity }>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
               
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="">Country</Label>
                                <Input
                                    id="exampleSelect"
                                    name="CountryValue"
                                    type="select"
                                    value={values.CountryValue}
                                    onChange={handleModalCountryChangeEvent}>
                                    <option key={0} value={0}>
                                        Select
                                    </option>

                                    {
                                        Modalcountryddl.map((item, key) => (
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
                                <Label for="">Province</Label>
                                <Input
                                    id="exampleSelect"
                                    name="ProvinceValue"
                                    type="select"
                                    value={values.ProvinceValue}
                                    onChange={handleInputChange}>
                                    <option key={0} value={0}>
                                        Select
                                    </option>

                                    {
                                        Modalprovinceddl.map((item, key) => (
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
                                <Label>City Name</Label>
                                <Input
                                    placeholder="City Name"
                                    type="text"
                                    autoComplete="off"
                                    maxLength="50"
                                    name="CityName"
                                    isalphabetic="true"
                                    required={ true}
                                    onChange={handleInputChange}
                                    value={values.CityName}
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

export default ModalCity_Village;