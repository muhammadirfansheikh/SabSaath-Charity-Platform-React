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
import { GetSetupMaster, AllowAlphabatic } from 'utils/CommonMethods'
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import Swal from "sweetalert2";


const Report_Institute_Wise = (props) => {
    const searchingValues = {
        ApplicantCaseCode: "",
        ApplicantName: "",
        CNIC: "",
        NameOfStudent: "",
        NameOfInstitute: "",
        ClassSemesterId: -1,
        DegreeId: -1,
        ProgrammeName: ''


    };

    const [searchValues, setSearchVlues] = useState(searchingValues);
    const [reportList, setreportList] = useState([]);



    const [classSemesterddl, setclassSemesterddl] = useState([]);
    const [degreedlld, setdegreedlld] = useState([]);
    const [finalData, setFinalData] = useState({});

    const columns = [

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
            name: 'CNIC',
            selector: 'CnicNo',
            sortable: true
        },
        {
            name: 'PhoneNo',
            selector: 'PhoneNo',
            sortable: true
        },
        {
            name: 'PermanentAddress',
            selector: 'PermanentAddress',
            sortable: true
        },
        {
            name: 'Relation',
            selector: 'Relation',
            sortable: true
        },
        {
            name: 'NameOfStudent',
            selector: 'NameOfStudent',
            sortable: true
        },
        {
            name: 'Gender',
            selector: 'Gender',
            sortable: true
        },
        {
            name: 'AGE',
            selector: 'AGE',
            sortable: true
        },
        {
            name: 'Class_Year_Semester',
            selector: 'Class_Year_Semester',
            sortable: true
        },
        {
            name: 'Grade_Percentage_CGPA_Marks',
            selector: 'Grade_Percentage_CGPA_Marks',
            sortable: true
        },
        {
            name: 'NameOfInstitute',
            selector: 'NameOfInstitute',
            sortable: true
        },
        {
            name: 'ContactNoInstitute',
            selector: 'ContactNoInstitute',
            sortable: true
        },
        {
            name: 'InstituteLocation',
            selector: 'InstituteLocation',
            sortable: true
        },
        {
            name: 'FundAmount',
            selector: 'FundAmount',
            sortable: true
        },
        {
            name: 'JobStatus',
            selector: 'JobStatus',
            sortable: true
        },
        {
            name: 'Degree',
            selector: 'Degree',
            sortable: true
        },
        {
            name: 'ProgramName',
            selector: 'ProgramName',
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



        let ddlClassSemester = await GetClassSemester();
        let dddlDegree = await GetDegree();

        

        setclassSemesterddl(ddlClassSemester.data);
        setdegreedlld(dddlDegree.data);



        ReBindGrid();


    }






    const GetClassSemester = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.CurrentClassSemester, 0, "", 0);

        return data;
    }

    const GetDegree = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.Degree, 0, "", 0);

        return data;
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
    const GetReport = async () => {
        try {
    
            searchValues.DegreeId = searchValues.DegreeId == -1 ? null : searchValues.DegreeId;
            searchValues.ClassSemesterId = searchValues.ClassSemesterId == -1 ? null : searchValues.ClassSemesterId;
            
            const data = await fetchData(
                ControllerName.Reporting,
                ApiMethods.Report_Institute_Wise_List,
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
   
        var data = await GetReport(); 
        setreportList(data);
        setFinalData({ columns, data });
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
                                                <Label for="">Name Of Student</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Name Of Student"
                                                    onChange={handleInputChange}
                                                    name="NameOfStudent"
                                                    isalphabetic="true"
                                                    maxLength="50"
                                                    value={searchValues.NameOfStudent}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Name Of Institute</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Name Of Institute"
                                                    onChange={handleInputChange}
                                                    name="NameOfInstitute"
                                                    isalphabetic="true"
                                                    maxLength="50"
                                                    value={searchValues.NameOfInstitute}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Programme Name</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Programme Name"
                                                    onChange={handleInputChange}
                                                    name="ProgrammeName"
                                                    isalphabetic="true"
                                                    maxLength="50"
                                                    value={searchValues.ProgrammeName}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Class/Semester</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="ClassSemesterId"
                                                    type="select"
                                                    value={searchValues.ClassSemesterId}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        classSemesterddl.map((item, key) => (
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
                                                <Label for="">Degree</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="DegreeId"
                                                    type="select"
                                                    value={searchValues.DegreeId}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        degreedlld.map((item, key) => (
                                                            <option key={key} value={item.SetupDetailId}>
                                                                {item.SetupDetailName}
                                                            </option>
                                                        ))
                                                    }
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
                                        Report Applicant Education Detail
                                    </Col>
                                    {/*<Col lg={6} md={6} className="text-right">*/}
                                    {/*    <ReactHTMLTableToExcel*/}
                                    {/*        id="test-table-xls-button"*/}
                                    {/*        className="download-table-xls-button mb-3 btn btn-secondary btn-sm"*/}
                                    {/*        table="table-to-xls"*/}

                                    {/*        filename="Report_EducationalDetailList"*/}
                                    {/*        sheet="EducationalDetailList"*/}
                                    {/*        buttonText="Export" />*/}
                                    {/*</Col>*/}
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <DataTableExtensions
                                    {...finalData}
                                    exportHeaders={true}
                                    fileName="EducationalDetailReportList"
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

                                {/*<Table id="table-to-xls" bordered striped responsive >*/}
                                {/*    <thead>*/}
                                {/*        <tr>*/}
                                {/*            <th>Sr #</th>*/}
                                {/*            <th>Applicant Case code</th>*/}
                                {/*            <th>Applicant Name </th>*/}
                                {/*            <th>CNIC</th>*/}
                                {/*            <th>Applicant Contact No</th>*/}
                                {/*            <th>Applicant Address</th>*/}
                                {/*            <th>Relation</th>*/}
                                {/*            <th>Name Of Student</th>*/}
                                {/*            <th>Gender</th>*/}
                                           
                                {/*            <th>Age</th>*/}
                                {/*            <th>Class/Semester</th>*/}
                                {/*            <th>Grade/CGP/Marks/Percentage</th>*/}
                                {/*            <th>Name Of Institute</th>*/}
                                {/*            <th>Contact No Of Institute</th>*/}
                                {/*            <th>Location Of Institute</th>*/}
                                {/*            <th>Fund Amount</th>*/}
                                {/*            <th>Job Status</th>*/}
                                {/*            <th>Degree</th>*/}
                                {/*            <th>Programme Name</th>*/}


                                {/*        </tr>*/}
                                {/*    </thead>*/}
                                {/*    <tbody>*/}
                                {/*        {reportList && reportList.map((item, key) => (*/}
                                {/*            <tr key={key}>*/}
                                {/*                <td>{key + 1}</td>*/}
                                {/*                <td>{item.ApplicantCaseCode}</td>*/}
                                {/*                <td>{item.ApplicantName}</td>*/}
                                {/*                <td>{item.CnicNo}</td>*/}
                                {/*                <td>{item.PhoneNo}</td>*/}
                                {/*                <td>{item.PermanentAddress}</td>*/}
                                {/*                <td>{item.Relation}</td>*/}
                                {/*                <td>{item.NameOfStudent}</td>*/}
                                {/*                <td>{item.Gender}</td>*/}
                                                
                                {/*                <td>{item.AGE}</td>*/}
                                {/*                <td>{item.Class_Year_Semester}</td>*/}
                                {/*                <td>{item.Grade_Percentage_CGPA_Marks}</td>*/}
                                {/*                <td>{item.NameOfInstitute}</td>*/}
                                {/*                <td>{item.ContactNoInstitute}</td>*/}
                                {/*                <td>{item.InstituteLocation}</td>*/}
                                {/*                <td>{item.FundAmount}</td>*/}
                                {/*                <td>{item.JobStatus}</td>*/}
                                {/*                <td>{item.Degree}</td>*/}
                                {/*                <td>{item.ProgramName}</td>*/}

                                              

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

export default Report_Institute_Wise