import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
    Button,
    FormGroup,
    Form,
    Label,
    Input
} from "reactstrap";
import { fetchData } from '../utils/Api.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../utils/Constants.js'
import { GetSetupMaster, DeleteSetupDetail, AllowAlphabatic } from '../utils/CommonMethods.js'
import ModalProvince from '../components/modal/ModalProvince.js'
import Swal from "sweetalert2";


const Province = (props) => {
    const initialValues = {
        searchProvinceName: "",
        searchCountryValue: '0'
    };
    const [values, setValues] = useState(initialValues);
    const [provinceList, setprovinceList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [provinceEditId, setprovinceEditId] = useState(0);
    const [countryddl, setcountryddl] = useState([]);

    const handleInputChange = (e) => {
 
        const { name, value } = e.target;
        let values = e.target.value;


        if (e.target.getAttribute("isalphabetic") === "true") {
   //       
            values = AllowAlphabatic(e.target.value);
        }
           




       
        setValues({
            ...values,
            [name]: values,
        });
    };

    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            ReBindGrid(SetupMasterIds.Province, 0, "", 0);

            let setCountry = await GetCountry();

            setcountryddl(setCountry.data);
        };
        load();
    }, []);

    const onEdit = ({ ProvinceId }) => {
        openNewmodal(ProvinceId);
    }

    const onDelete = async ({ ProvinceId }) => {

        var UserId = localStorage.getItem('UserId');
        var UserIp = localStorage.getItem('UserIP');
        var deleteData = await DeleteSetupDetail(ProvinceId, UserId, UserIp);
        if (deleteData.response === true && deleteData.data != null) {
            if (deleteData.data[0].HasError === 1) {
                //alert(deleteData.data[0].Message);
                Swal.fire({ title: 'Error', text: deleteData.data[0].Message, icon: 'error' });
            }
            else {


                // alert("Deleted Successfully");
                Swal.fire({ title: 'Success', text: "Deleted Successfully", icon: 'success' });

            }
        }
        ReBindGrid(SetupMasterIds.Province, 0, "", 0);

    }
    const GetCountry = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.Country, 0, "", 0);
        return data;

    }
    const handleSearchClick = async (e) => {
        e.preventDefault();

        ReBindGrid(SetupMasterIds.Province, values.searchCountryValue, values.searchProvinceName, 0);

    }

    const handleCancelClick = async (e) => {

        e.preventDefault();


        ReBindGrid(SetupMasterIds.Province, 0, "", 0);
        setValues(initialValues);

    }

    const ReBindGrid = async (setupMasterId, parentId, setupDetailName, setupDetailId = 0) => {

        var data = await GetSetupMaster(setupMasterId, parentId, setupDetailName, setupDetailId);
        
        setprovinceList(data.data);

    }
    const openNewmodal = (ProvinceId) => {

        setprovinceEditId(ProvinceId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        setprovinceEditId(0);
        ReBindGrid(SetupMasterIds.Province, 0, "", 0);
        setValues(initialValues);

    }

    return (
        <>
            <div className="content">
                <Row>
                    <Col lg={12} md={12}>
                        <Card className="card-user">
                            <CardBody>
                                <Form>
                                    <Row form>

                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Country</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="searchCountryValue"
                                                    type="select"
                                                    value={values.searchCountryValue}
                                                    onChange={handleInputChange}>
                                                    <option key={0} value={0}>
                                                        Select
                                                    </option>

                                                    {
                                                        countryddl.map((item, key) => (
                                                            <option key={item.SetupDetailName} value={item.SetupDetailId}>
                                                                {item.SetupDetailName}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Province Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleInputChange}
                                                    isalphabetic="true"
                                                    name="searchProvinceName"
                                                    value={values.searchProvinceName}
                                                    autoComplete="off"
                                                    maxLength="50"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12} className="text-right">
                                            <Button color="primary" size="sm" className="mr-2" onClick={handleSearchClick}>Search</Button>
                                            <Button color="secondary" size="sm" onClick={handleCancelClick}>Cancel</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} md={12}>
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col lg={6} md={6}>
                                        Province List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" size="sm" className="m-0" onClick={() => openNewmodal({ ProvinceId: 0 })}>Add New</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Name</th>
                                            <th>Country</th>
                                            {/* <th>Active</th>
                                            <th>CreatedBy</th>
                                            <th>Last Modified By</th> */}
                                            <th className="text-center" style={{ width: 150 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {provinceList && provinceList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.SetupDetailName}</td>
                                                <td>{item.ParentName}</td>

                                                {/* <td>{item.IsActive ? "Yes" : "No"}</td>
                                                <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                                                <td>{item.ModifiedBy + " " + (item.ModifiedDate == '' ? "" : "on" + item.ModifiedDate)}</td> */}
                                                <td className="text-center">
                                                    <Button color="primary" className="btn-circle" size="sm" onClick={(e) => onEdit({ ProvinceId: item.SetupDetailId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" className="btn-circle" size="sm" onClick={() => onDelete({ ProvinceId: item.SetupDetailId })}><i className="nc-icon nc-simple-remove"></i></Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {
                    openModal &&
                    <ModalProvince {...props}
                        HeaderText="Add/Edit Document Sub Type"
                        Ismodalshow={openModal}
                        closeNewmodal={closeNewmodal}
                        ProvinceId={provinceEditId}
                        Countryddl={countryddl}
                        ReBindGrid={ReBindGrid}
                    />

                }
            </div>

        </>
    );
}

export default Province