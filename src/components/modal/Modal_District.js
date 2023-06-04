import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail,AllowAlphabatic , InsertSetupDetail_District } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'

export const Modal_District = (props) => {

    const initialValues = {
        DistrictName: "",
        CountryValue: '0',
        ProvinceValue: '0',
        CityValue: '0',
    };


    const [values, setValues] = useState(initialValues);
    const [Modalcountryddl, setModalcountryddl] = useState([]);
    const [Modalprovinceddl, setModalprovinceddl] = useState([]);
    const [Modalcityddl, setModalcityddl] = useState([]);
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
            if (props.DistrictId > 0) {

                var data = await GetSetupMaster(0, 0, "", props.DistrictId);
                if (data.response === true && data.data != null) {


                    let city = await GetSetupMaster(0, 0, "", data.data[0].ParentId);
                    let provinceId = city.data[0].ParentId;



                    let country = await GetSetupMaster(0, 0, "", provinceId);
                    let countryId = country.data[0].ParentId;




                    resetModalFormelement(countryId, provinceId);

                    setValues((prevState) => ({
                        ...prevState,
                        DistrictName: data.data[0].SetupDetailName,
                        CountryValue: countryId,
                        ProvinceValue: provinceId,
                        CityValue: data.data[0].ParentId,


                    }))


                }
                else {

                }
            }
            else {

                resetModalFormelement(-1, -1);
            }

        };

        load();


    }, []);
    const resetModalFormelement = async (loadCountryId = -1, loadProvinceId = -1) => {
        props.ReBindGrid(SetupMasterIds.District, 0, "", 0);

        let ddlCountryData = await props.GetCountry();
        let ddlProvinceData = await props.GetProvince(loadCountryId);
        let ddlCityData = await props.GetCity(loadProvinceId);

        setModalcountryddl(ddlCountryData.data);
        setModalprovinceddl(ddlProvinceData.data);
        setModalcityddl(ddlCityData.data);
    }

    const handleModalCountryChangeEvent = async (e) => {

        handleInputChange(e);
        let data = await props.GetProvince(e.target.value);
        setModalprovinceddl(data.data);

    }


    const handleModalProvinceChangeEvent = async (e) => {

        handleInputChange(e);
        let data = await props.GetCity(e.target.value);
        setModalcityddl(data.data);

    }
    async function AddUpdateDistrict(e) {
        try {
            e.preventDefault();

            setFormLoading(true);
            if (values.CityValue != "0") {
                if (values.DistrictName != "") {

                    var DistrictId = 0;
                    DistrictId = props.DistrictId > 0 ? props.DistrictId : 0;
                    var UserId = localStorage.getItem('UserId');
                    var UserIp = localStorage.getItem('UserIP');
                    let RequestData;
                    let data;



                    if (DistrictId === 0) ///Insert Operation
                    {
                        data = await InsertSetupDetail_District(SetupMasterIds.District, values.CityValue, values.DistrictName, "", "", "", UserId, UserIp);
                    }
                    else if (DistrictId !== 0) {
                        data = await UpdateSetupDetail(SetupMasterIds.District, values.CityValue, DistrictId, values.DistrictName, "", "", "", UserId, UserIp);
                    }  
                    if (data.response === true && data.data != null) {
                        if (data.data[0].HasError === 1) { 
                            Swal.fire({ title: 'Error', text: data.data[0].Message, icon: 'error' });
                        }
                        else {

                            e.preventDefault();
                            props.ReBindGrid(SetupMasterIds.District, 0, "", 0); 
                            DistrictId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });

                            setValues(initialValues); 
                        }
                    }
                    else { 
                        Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon: 'error' });
                    }
                }
                else {
                    Swal.fire({ title: 'Error', text: "Enter District Name.", icon: 'error' });
                }
            }
            else {
                Swal.fire({ title: 'Error', text: "Select City.", icon: 'error' });
            }
            setFormLoading(false);
        } catch (error) { 
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateDistrict}>
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
                                    onChange={handleModalProvinceChangeEvent}>
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

                        <Col md={6}>
                            <FormGroup>
                                <Label for="">City</Label>
                                <Input
                                    id="exampleSelect"
                                    name="CityValue"
                                    type="select"
                                    value={values.CityValue}
                                    onChange={handleInputChange}>
                                    <option key={0} value={0}>
                                        Select
                                    </option>

                                    {
                                        Modalcityddl.map((item, key) => (
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
                                <Label>District Name</Label>
                                <Input
                                    placeholder="District Name"
                                    type="text"
                                    name="DistrictName"
                                    maxLength="50"
                                    autoComplete="off"
                                    autoFocus={true}
                                    isalphabetic="true"
                                    required={true}
                                    onChange={handleInputChange}
                                    value={values.DistrictName}
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

export default Modal_District;