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
import { GetSetupMaster, DeleteSetupDetail,AllowAlphabatic } from '../utils/CommonMethods.js'
import Modal_Fund_Category from "components/modal/ModalFundCategory.js";
import Swal from "sweetalert2";


const FundCategory = (props) => {
    const initialValues = {
        searchFundCategoryName: "",
        searchCategoryValue: '0'
    };
    const [values, setValues] = useState(initialValues);
    const [fundCategoryList, setfundCategoryList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [fundCategoryEditId, setfundCategoryEditId] = useState(0);
    const [categoryddl, setcategoryddl] = useState([]);

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

    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            ReBindGrid(SetupMasterIds.FundCategory, 0, "", 0);

            let setCategory = await GetCategory();

            setcategoryddl(setCategory.data);
        };
        load();
    }, []);

    const onEdit = ({ FundCategoryId }) => {
        openNewmodal(FundCategoryId);
    }

    const onDelete = async ({ FundCategoryId }) => {

        var UserId = localStorage.getItem('UserId');
        var UserIp = localStorage.getItem('UserIP');
        var deleteData = await DeleteSetupDetail(FundCategoryId, UserId, UserIp);
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
        ReBindGrid(SetupMasterIds.FundCategory, 0, "", 0);

    }
    const GetCategory = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.Category, 0, "", 0);
        return data;

    }
    const handleSearchClick = async (e) => {
        e.preventDefault();
      
        ReBindGrid(SetupMasterIds.FundCategory, values.searchCategoryValue, values.searchFundCategoryName, 0);

    }

    const handleCancelClick = async (e) => {
     
        e.preventDefault();


        ReBindGrid(SetupMasterIds.FundCategory, 0, "", 0);
        setValues(initialValues);

    }

    const ReBindGrid = async (setupMasterId, parentId, setupDetailName, setupDetailId = 0) => {

        var data = await GetSetupMaster(setupMasterId, parentId, setupDetailName, setupDetailId);
       
        setfundCategoryList(data.data);

    }
    const openNewmodal = (FundCategoryId) => {
     
        setfundCategoryEditId(FundCategoryId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        setfundCategoryEditId(0);
        ReBindGrid(SetupMasterIds.FundCategory, 0, "", 0);
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
                                                <Label for="">Category</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="searchCategoryValue"
                                                    type="select"
                                                    value={values.searchCategoryValue}
                                                    onChange={handleInputChange}>
                                                    <option key={0} value={0}>
                                                        Select
                                                    </option>

                                                    {
                                                        categoryddl.map((item, key) => (
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
                                                <Label for="">Fund Category Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleInputChange}
                                                    name="searchFundCategoryName"
                                                    value={values.searchFundCategoryName}
                                                    maxLength="50"
                                                    isalphabetic="true"
                                                    autoComplete="off"
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
                                        Fund Category List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" size="sm" className="m-0" onClick={() => openNewmodal({ FundCategoryId: 0 })}>Add New</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Name</th>
                                            <th>Category</th>
                                            {/* <th>Active</th>
                                            <th>CreatedBy</th>
                                            <th>Last Modified By</th> */}
                                            <th className="text-center" style={{ width: 150 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fundCategoryList && fundCategoryList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.SetupDetailName}</td>
                                                <td>{item.ParentName}</td>

                                                {/* <td>{item.IsActive ? "Yes" : "No"}</td>
                                                <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                                                <td>{item.ModifiedBy + " " + (item.ModifiedDate == '' ? "" : "on" + item.ModifiedDate)}</td> */}
                                                <td className="text-center">
                                                    <Button color="primary" className="btn-circle" size="sm" onClick={(e) => onEdit({ FundCategoryId: item.SetupDetailId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" className="btn-circle" size="sm" onClick={() => onDelete({ FundCategoryId: item.SetupDetailId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
                    <Modal_Fund_Category {...props}
                        HeaderText="Add/Edit Fund Category"
                        Ismodalshow={openModal}
                        closeNewmodal={closeNewmodal}
                        FundCategoryId={fundCategoryEditId}
                        categoryddl={categoryddl}
                        ReBindGrid={ReBindGrid}
                        
                    />

                }
            </div>

        </>
    );
}

export default FundCategory