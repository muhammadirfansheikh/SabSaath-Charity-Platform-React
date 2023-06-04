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
import { GetSetupMaster, DeleteSetupDetail } from '../utils/CommonMethods.js'
import Modal_Fund_Sub_Category from "components/modal/Modal_Fund_Sub_Category.js";
import Swal from "sweetalert2";



const FundSubCategory = (props) => {
    const initialValues = {
        searchFundSubCategoryName: "",
        searchCategoryValue: '0',
        searchFundCategoryValue: '0',
        searchIsFixedValue: false
    };

    const [searchvalues, setsearchvalues] = useState(initialValues);
    const [fundSubCatgoryList, setfundSubCatgoryList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [fundSubCategoryEditId, setfundSubCategoryEditId] = useState(0);
    const [categoryddl, setcategoryddl] = useState([]);
    const [fundCategoryddl, setfundCategoryddl] = useState([]);

    const handleInputChange = (e) => {
        



        const { name, value } = e.target;
        const values = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setsearchvalues({
            ...searchvalues,
            [name]: values,
        });
    };

    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            resetFormelement();
        };
        load();
    }, []);

    const onEdit = ({ FundSubCategoryId }) => {
        openNewmodal(FundSubCategoryId);
    }

    const resetFormelement = async () => {
        ReBindGrid(SetupMasterIds.FundSubCategory, 0, "", 0);

        let ddlCategory = await GetCategory();
        let ddlFundSubCategory = await GetFundCategory(-1);

        setcategoryddl(ddlCategory.data);
        setfundCategoryddl(ddlFundSubCategory.data);

    }
    const onDelete = async ({ FundSubCategoryId }) => {

        var UserId = localStorage.getItem('UserId');
        var UserIp = localStorage.getItem('UserIP');
        var deleteData = await DeleteSetupDetail(FundSubCategoryId, UserId, UserIp);
        if (deleteData.response === true && deleteData.data != null) {
            if (deleteData.data[0].HasError === 1) {
                // alert(deleteData.data[0].Message);
                Swal.fire({ title: 'Error', text: deleteData.data[0].Message, icon: 'error' });
            }
            else {

                Swal.fire({ title: 'Success', text: "Deleted Successfully", icon: 'success' });
                // alert("Deleted Successfully");

            }
        }
        resetFormelement();

    }
    const GetCategory = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.Category, 0, "", 0);

        return data;
    }


    const GetFundCategory = async (CategoryId = 0) => {
        
        if (CategoryId == "0")
            CategoryId = "-1";

        var data = await GetSetupMaster(SetupMasterIds.FundCategory, CategoryId, "", 0);

        return data;

    }
    const handleSearchClick = async (e) => {
        e.preventDefault();
        
        let IsFixedValue = "0";

        if(searchvalues.searchIsFixedValue)
            IsFixedValue = "1";
        else
            IsFixedValue = "0";

        ReBindGrid(SetupMasterIds.FundSubCategory, searchvalues.searchFundCategoryValue, searchvalues.searchFundSubCategoryName,0,"",IsFixedValue);

    }

    const handleCancelClick = async (e) => {
        
        e.preventDefault();


        resetFormelement();
        setsearchvalues(initialValues);

    }

    const handleSearchCategoryChangeEvent = async (e) => {

        handleInputChange(e);
        let data = await GetFundCategory(e.target.value);
        setfundCategoryddl(data.data);

    }

    const ReBindGrid =async (setupMasterId,parentId,setupDetailName,setupDetailId = 0,felx1="",flex2="",flex3="") =>{

        var data=await GetSetupMaster(setupMasterId,parentId,setupDetailName,setupDetailId,felx1,flex2,flex3);
     
        setfundSubCatgoryList(data.data);

    }
    const openNewmodal = (FundSubCategoryId) => {
        
        setfundSubCategoryEditId(FundSubCategoryId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        setfundSubCategoryEditId(0);
        resetFormelement();
        setsearchvalues(initialValues);

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

                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="">Category</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="searchCategoryValue"
                                                    type="select"
                                                    value={searchvalues.searchCategoryValue}
                                                    onChange={handleSearchCategoryChangeEvent}>
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



                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="">Fund Category</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="searchFundCategoryValue"
                                                    type="select"
                                                    value={searchvalues.searchFundCategoryValue}
                                                    onChange={handleInputChange}>
                                                    <option key={0} value={0}>
                                                        Select
                                                    </option>

                                                    {
                                                        fundCategoryddl.map((item, key) => (
                                                            <option key={item.SetupDetailName} value={item.SetupDetailId}>
                                                                {item.SetupDetailName}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="">Fund Sub Category Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleInputChange}
                                                    name="searchFundSubCategoryName"
                                                    value={searchvalues.searchFundSubCategoryName}
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
                                                            name="searchIsFixedValue"
                                                            checked={searchvalues.searchIsFixedValue}
                                                            onChange={handleInputChange} />
                                                        Is Fixed Value ?
                                                    </Label>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={12} className="text-right">
                                            <Button color="primary" className="mr-2" onClick={handleSearchClick}>Search</Button>
                                            <Button color="secondary" onClick={handleCancelClick}>Cancel</Button>
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
                                        Fund Sub Category List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" className="m-0" onClick={() => openNewmodal({ FundSubCategoryId: 0 })}>Add New</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Name</th>
                                            <th>Fund Category</th>
                                            <th>Amount</th>
                                            <th>Is Fixed Amount</th>
                                            {/* <th>Active</th>
                                            <th>CreatedBy</th>
                                            <th>Last Modified By</th> */}
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fundSubCatgoryList && fundSubCatgoryList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.SetupDetailName}</td>
                                                <td>{item.ParentName}</td>
                                                <td>{item.Flex1}</td>
                                                <td>{item.Flex2 == "0" ? "No" : "Yes"}</td>
                                                {/* <td>{item.IsActive ? "Yes" : "No"}</td>
                                                <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                                                <td>{item.ModifiedBy + " " + (item.ModifiedDate == '' ? "" : "on" + item.ModifiedDate)}</td> */}
                                                <td>
                                                    <Button color="primary" outline size="sm" onClick={(e) => onEdit({ FundSubCategoryId: item.SetupDetailId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" outline size="sm" onClick={() => onDelete({ FundSubCategoryId: item.SetupDetailId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
                    <Modal_Fund_Sub_Category {...props}
                        HeaderText="Add/Edit Fund Sub Category"
                        Ismodalshow={openModal}
                        closeNewmodal={closeNewmodal}
                        FundSubCategoryId={fundSubCategoryEditId}
                        GetCategory={GetCategory}
                        GetFundCategory={GetFundCategory}
                        ReBindGrid={ReBindGrid}
                    />

                }
            </div>

        </>
    );
}

export default FundSubCategory