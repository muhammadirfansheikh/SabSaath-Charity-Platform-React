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

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { fetchData } from 'utils/Api'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from 'utils/Constants'
import { GetSetupMaster, AllowAlphabatic, dateFormatPlaceholder, dateFormat, getDate } from 'utils/CommonMethods'
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";


const Report_Applicant_Case__List = (props) => {

    let defaultFromDate = new Date()
    defaultFromDate.setDate(defaultFromDate.getDate() - 27);


    let defaultDate = new Date()
    defaultDate.setDate(defaultDate.getDate());
    const searchingValues = {
        FromDate: defaultFromDate.toLocaleDateString('en-CA'),
        ToDate: defaultDate.toLocaleDateString('en-CA'),
        ApplicantCaseCode: "",
        ApplicantName: "",
        CNIC: "",
        GenderId: -1,
        CityId: -1,
        CaseNatureId: -1,
        CategoryId: -1,
        FundCategoryId: -1,
        ReferralTypeId: -1,
        ReferralName: "",
        CaseStatusId: -1,
        IsViewBlackList: -1,

        MartialStatusId: -1

    };

    const [searchValues, setSearchVlues] = useState(searchingValues);
    const [reportList, setreportList] = useState([]);


    const [genderddl, setgenderddl] = useState([]);
    const [cityddl, setcityddl] = useState([]);
    const [casenatureddl, setcasenatureddl] = useState([]);
    const [categoryddl, setcategoryddl] = useState([]);
    const [fundCategroyddl, setfundCategroyddl] = useState([]);
    const [referralTypeddl, setreferralTypeddl] = useState([]);
    const [caseStatusddl, setcaseStatusddl] = useState([]);
    const [finalData, setFinalData] = useState({});

    const [MartialStatusddl, setMartialStatusddl] = useState([]);
    const columns = [
        {
            name: 'Date',
            selector: 'Date',
            sortable: true
        },
        {
            name: 'ApplicantCaseCode',
            selector: 'ApplicantCaseCode',
            sortable: true
        },
        {
            name: 'ApplicantName',
            selector: 'ApplicantName',
            sortable: true
        },
        {
            name: 'CnicNo',
            selector: 'CnicNo',
            sortable: true
        },
       
        {
            name: 'Gender',
            selector: 'Gender',
            sortable: true
        },
        {
            name: 'CityName',
            selector: 'CityName',
            sortable: true
        },
        {
            name: 'CaseOfNature',
            selector: 'CaseOfNature',
            sortable: true
        },
        {
            name: 'Category',
            selector: 'Category',
            sortable: true
        },
        {
            name: 'FundCategoryName',
            selector: 'FundCategoryName',
            sortable: true
        },
        {
            name: 'Duration',
            selector: 'Duration',
            sortable: true
        },
        {
            name: 'ReferralName',
            selector: 'ReferralName',
            sortable: true
        },
        {
            name: 'RefferalTypeName',
            selector: 'RefferalTypeName',
            sortable: true
        },
        {
            name: 'CaseStatus',
            selector: 'CaseStatus',
            sortable: true
        },
        {
            name: 'FundRequired',
            selector: 'FundRequired',
            sortable: true
        },
        {
            name: 'FundApproved',
            selector: 'FundApproved',
            sortable: true
        },
        {
            name: 'IsBlackList',
            selector: 'IsBlackList',
            sortable: true
        },

        {
            name: 'MartialStatus',
            selector: 'MartialStatus',
            sortable: true
        },
    ]

    const handleInputChange = (e) => {
    
        const { name, value } = e.target;
        let _values = e.target.value;


        if (e.target.getAttribute("isalphabetic") === "true") {
     //     
            _values = AllowAlphabatic(e.target.value);
        }
        else if (e.target.getAttribute("isnumber") == "true")
            _values = e.target.value.replace(/\D/g, "");






        setSearchVlues({
            ...searchValues,
            [name]: _values,
        });

        //const { name, value } = e.target;

        //seatSearchVlues({
        //  ...searchValues,
        //  [name]: value,
        //});
    };
    const [pending, setPending] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(reportList);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            resetFormelement();
        };
        load();
    }, []);



    const resetFormelement = async () => {

        setSearchVlues(searchingValues);


        let ddlGender = await GetGender();
        let ddlCity = await GetCity();
        let ddlCaseNature = await GetCaseNature();
        let ddlCategory = await GetCategory();
        let ddlReferralType = await GetReferralType();
        let ddlCaseStatus = await GetCaseStatus();
        let fundCategoryddl = await GetFundCategory(-1);

        let ddlMartialStatus = await GetMartialStatus();

        setgenderddl(ddlGender.data);
        setcityddl(ddlCity.data);
        setcasenatureddl(ddlCaseNature.data);
        setcategoryddl(ddlCategory.data);
        setreferralTypeddl(ddlReferralType.data);
        setcaseStatusddl(ddlCaseStatus.data);
        setfundCategroyddl(fundCategoryddl.data);

        setMartialStatusddl(ddlMartialStatus.data);



        ReBindGrid();


    }





    const GetGender = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.Gender, 0, "", 0);

        return data;
    }

    const GetCity = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.City, 0, "", 0);

        return data;
    }

    const GetCaseNature = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.NatureOfCase, 0, "", 0);

        return data;
    }

    const GetCategory = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.Category, 0, "", 0);

        return data;
    }

    const GetReferralType = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.ReferrerType, 0, "", 0);

        return data;
    }

    const GetCaseStatus = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.CaseStatus, 0, "", 0);

        return data;
    }
    const GetFundCategory = async (CategoryId) => {

        var data = await GetSetupMaster(SetupMasterIds.FundCategory, CategoryId == "0" ? "-1" : CategoryId, "", 0);

        return data;
    }

    const GetMartialStatus = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.MaritalStatus, 0, "", 0);

        return data;
    }
    const handleCategoryChange = async (e) => {
 
        handleInputChange(e);
        let fundCategoryddl = await GetFundCategory(e.target.value);

        setfundCategroyddl(fundCategoryddl.data);


    }

    const handleSearchClick = async (e) => {
        e.preventDefault();

        if (searchValues.FromDate != "") {
            if (searchValues.ToDate != "") {
                ReBindGrid();
            }
            else {
                Swal.fire({ title: 'Warning', text: "Select To Date", icon: 'warning' });
            }
        }
        else {
            Swal.fire({ title: 'Warning', text: "Select From Date", icon: 'warning' });
        }



    }

    const handleCancelClick = async (e) => {

        e.preventDefault();


        resetFormelement();


    }
    const GetApplicantCaseListReport = async () => {
        try {
     
            searchValues.GenderId = searchValues.GenderId == -1 ? null : searchValues.GenderId;
            searchValues.CityId = searchValues.CityId == -1 ? null : searchValues.CityId;
            searchValues.CaseNatureId = searchValues.CaseNatureId == -1 ? null : searchValues.CaseNatureId;
            searchValues.CategoryId = searchValues.CategoryId == -1 ? null : searchValues.CategoryId;
            searchValues.FundCategoryId = searchValues.FundCategoryId == -1 ? null : searchValues.FundCategoryId;
            searchValues.ReferralTypeId = searchValues.ReferralTypeId == -1 ? null : searchValues.ReferralTypeId;
            searchValues.CaseStatusId = searchValues.CaseStatusId == -1 ? null : searchValues.CaseStatusId;
            searchValues.IsViewBlackList = searchValues.IsViewBlackList == -1 ? null : searchValues.IsViewBlackList;
            searchValues.MartialStatusId = searchValues.MartialStatusId == -1 ? null : searchValues.MartialStatusId;

            const data = await fetchData(
                ControllerName.Reporting,
                ApiMethods.Report_Applicant_Case_List,
                searchValues
            );
      
            if (data != null) {

                if (data.Response === true && data.DataSet != null) {
                    return data.DataSet.Table;
                } else {
                    return [];
                }
            } else {
                return [];
                Swal.fire({ title: "Error", text: "Error", icon: "error" }); 
            }
        } catch (error) {
            return []; 
        }
    };



    const ReBindGrid = async () => {

        var data = await GetApplicantCaseListReport(); 
        setreportList(data);
        setFinalData({ columns, data })

    }
    const AllDateSet = (event, type) => {
        //...formFields,
        //CreatedDateTo: event


        if (type === "FromDate") {
         setSearchVlues({
          ...searchValues ,
           FromDate: event,
           // familyDateOfBirth: event,
         });
       }
       else if(type === "ToDate")
       {
        setSearchVlues({
            ...searchValues ,
             ToDate: event,
             // familyDateOfBirth: event,
           });
       }
     };

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
                                    <Label for="">From Date</Label>
                                    <DatePicker
                                    value={getDate(searchValues.FromDate, "/")}
                                    // value={getDate(Date.now(), "/")}
                                    dateFormat={dateFormat}
                                    onChange={(e) => AllDateSet(e, "FromDate")}
                                    className="form-control"
                                    name="FromDate"
                                    placeholderText={dateFormatPlaceholder}
                                    showYearDropdown
                                    />
                                    </FormGroup>
                                     </Col>
                                     <Col md={3}>
                                     <FormGroup>
                                                <Label for="">To Date</Label>
                                                <DatePicker
                                                value={getDate(searchValues.ToDate, "/")}
                                                // value={getDate(Date.now(), "/")}
                                                dateFormat={dateFormat}
                                                onChange={(e) => AllDateSet(e, "ToDate")}
                                                className="form-control"
                                                name="ToDate"
                                                placeholderText={dateFormatPlaceholder}
                                                showYearDropdown
                                    />
                                            </FormGroup>
                                     </Col>
                                        {/* <Col md={3}>
                                            <FormGroup>
                                                <Label for="">From Date</Label>
                                                <Input
                                                    type="date"
                                                    onChange={handleInputChange}
                                                    name="FromDate"

                                                    autoComplete="off"
                                                    value={searchValues.FromDate}
                                                />
                                            </FormGroup>
                                        </Col> */}

                                        {/* <Col md={3}>
                                            <FormGroup>
                                                <Label for="">To Date</Label>
                                                <Input
                                                    type="date"
                                                    onChange={handleInputChange}
                                                    name="ToDate"
                                                    autoComplete="off"
                                                    value={searchValues.ToDate}
                                                />
                                            </FormGroup>
                                        </Col> */}


                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Applicant Case Code</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Applicant Case Code"
                                                    onChange={handleInputChange}
                                                    name="ApplicantCaseCode"
                                                    maxLength="50"
                                                    value={searchValues.ApplicantCaseCode}
                                                />
                                            </FormGroup>
                                        </Col>



                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Applicant Name</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Applicant Name"
                                                    onChange={handleInputChange}
                                                    name="ApplicantName"
                                                    isalphabetic="true"
                                                    maxLength="50"
                                                    value={searchValues.ApplicantName}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">CNIC</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="CNIC"
                                                    onChange={handleInputChange}
                                                    isnumber="true"
                                                    placeholder="XXXXXXXXXXXXX"
                                                    name="CNIC"
                                                    maxLength="13"
                                                    value={searchValues.CNIC}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Gender</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="GenderId"
                                                    type="select"
                                                    value={searchValues.GenderId}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        genderddl.map((item, key) => (
                                                            <option key={key} value={item.SetupDetailId}>
                                                                {item.SetupDetailName}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>



                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Marital Status</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="MartialStatusId"
                                                    type="select"
                                                    value={searchValues.MartialStatusId}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        MartialStatusddl.map((item, key) => (
                                                            <option key={key} value={item.SetupDetailId}>
                                                                {item.SetupDetailName}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>


                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">City</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="CityId"
                                                    type="select"
                                                    value={searchValues.CityId}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        cityddl.map((item, key) => (
                                                            <option key={key} value={item.SetupDetailId}>
                                                                {item.SetupDetailName}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Case Nature</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="CaseNatureId"
                                                    type="select"
                                                    value={searchValues.CaseNatureId}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        casenatureddl.map((item, key) => (
                                                            <option key={key} value={item.SetupDetailId}>
                                                                {item.SetupDetailName}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>


                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Fund Category</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="CategoryId"
                                                    type="select"
                                                    value={searchValues.CategoryId}
                                                    onChange={handleCategoryChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        categoryddl.map((item, key) => (
                                                            <option key={key} value={item.SetupDetailId}>
                                                                {item.SetupDetailName}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>


                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Fund Sub Category</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="FundCategoryId"
                                                    type="select"
                                                    value={searchValues.FundCategoryId}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        fundCategroyddl.map((item, key) => (
                                                            <option key={key} value={item.SetupDetailId}>
                                                                {item.SetupDetailName}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>

                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Case Status</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="CaseStatusId"
                                                    type="select"
                                                    value={searchValues.CaseStatusId}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        caseStatusddl.map((item, key) => (
                                                            <option key={key} value={item.SetupDetailId}>
                                                                {item.SetupDetailName}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>



                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Referral Type</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="ReferralTypeId"
                                                    type="select"
                                                    value={searchValues.ReferralTypeId}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        referralTypeddl.map((item, key) => (
                                                            <option key={key} value={item.SetupDetailId}>
                                                                {item.SetupDetailName}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Referral Name</Label>
                                                <Input
                                                    type="text"

                                                    placeholder="Referral Name"
                                                    onChange={handleInputChange}
                                                    name="ReferralName"
                                                    maxLength="50"
                                                    isalphabetic="true"
                                                    value={searchValues.ReferralName}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Is View Black List</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="IsViewBlackList"
                                                    type="select"
                                                    value={searchValues.IsViewBlackList}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        All
                                                    </option>

                                                    <option key={1} value={1}>
                                                        Black List
                                                    </option>

                                                     {/* <option key={0} value={0}>
                                                       White List
                                                    </option>  */}

                                                    
                                                </Input>
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
                                        Report Applicant Case List
                                    </Col>
                                    {/*<Col lg={6} md={6} className="text-right">*/}
                                    {/*    <ReactHTMLTableToExcel*/}
                                    {/*        id="test-table-xls-button"*/}
                                    {/*        className="download-table-xls-button mb-3 btn btn-secondary btn-sm"*/}
                                    {/*        table="table-to-xls"*/}

                                    {/*        filename="Report_ApplicantCaseList"*/}
                                    {/*        sheet="ApplicantCaseList"*/}
                                    {/*        buttonText="Export" />*/}
                                    {/*</Col>*/}
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <DataTableExtensions
                                    {...finalData}
                                    exportHeaders={true}
                                    fileName="ApplicantCaseListReport"
                                >
                                    <DataTable
                                        dense
                                        direction="auto"
                                        defaultSortField="ApplicantName"
                                        fixedHeader
                                        striped
                                        defaultSortAsc={false}
                                        pagination
                                        highlightOnHover
                                        progressPending={pending}
                                        responsive


                                        fixedHeaderScrollHeight="auto"


                                        subHeaderAlign="right"
                                        subHeaderWrap

                                    />
                                </DataTableExtensions>

                                {/*<Table id="table-to-xls" bordered striped responsive>*/}
                                {/*    <thead>*/}
                                {/*        <tr>*/}
                                {/*            <th>Sr #</th>*/}
                                {/*            <th>Date</th>*/}
                                {/*            <th>Applicant Case Code </th>*/}
                                {/*            <th>Applicant Name</th>*/}

                                {/*            <th>Cnic No</th>*/}
                                {/*            <th>Gender</th>*/}
                                {/*            <th>City Name</th>*/}
                                {/*            <th>Case Of Nature</th>*/}
                                {/*            <th>Category</th>*/}
                                {/*            <th>Fund Category Name</th>*/}
                                {/*            <th>Duration</th>*/}
                                {/*            <th>Referral Name</th>*/}
                                {/*            <th>Refferal Type</th>*/}

                                {/*            <th>Case Status</th>*/}
                                {/*            <th>Fund Required</th>*/}
                                {/*            <th>Fund Approved</th>*/}

                                {/*        </tr>*/}
                                {/*    </thead>*/}
                                {/*    <tbody>*/}
                                {/*        {reportList && reportList.map((item, key) => (*/}
                                {/*            <tr key={key}>*/}
                                {/*                <td>{key + 1}</td>*/}
                                {/*                <td>{item.Date}</td>*/}
                                {/*                <td>{item.ApplicantCaseCode}</td>*/}
                                {/*                <td>{item.ApplicantName}</td>*/}
                                {/*                <td>{item.CnicNo}</td>*/}
                                {/*                <td>{item.Gender}</td>*/}

                                {/*                <td>{item.CityName}</td>*/}
                                {/*                <td>{item.CaseOfNature}</td>*/}
                                {/*                <td>{item.Category}</td>*/}
                                {/*                <td>{item.FundCategoryName}</td>*/}
                                {/*                <td>{item.Duration}</td>*/}
                                {/*                <td>{item.ReferralName}</td>*/}
                                {/*                <td>{item.RefferalTypeName}</td>*/}
                                {/*                <td>{item.CaseStatus}</td>*/}
                                {/*                <td style={{ textAlign: 'right' }}>{item.FundRequired}</td>*/}
                                {/*                <td style={{ textAlign: 'right' }}>{item.FundApproved}</td>*/}

                                {/*            </tr>*/}
                                {/*        ))}*/}
                                {/*    </tbody>*/}
                                {/*</Table>*/}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div>

        </>
    );
}

export default Report_Applicant_Case__List