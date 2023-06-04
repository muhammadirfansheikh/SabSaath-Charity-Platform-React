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


const Report_Patient_List = (props) => {
    const searchingValues = {
        ApplicantCaseCode: "",
        ApplicantName: "",
        CNIC: "",
        PatientName: "",
        PatientContactNumber: "",
        DisabilityId: -1,
        DiseaseId: -1,
        HospitalName: '',
        DoctorName: ''


    };

    const [searchValues, setSearchVlues] = useState(searchingValues);
    const [reportList, setreportList] = useState([]);



    const [disabilityddl, setdisabilityddl] = useState([]);
    const [diseaseddl, setdiseaseddl] = useState([]);
    const [finalData, setFinalData] = useState({});
    const columns = [{
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
            name: 'Applicant CNIC',
            selector: 'CnicNo',
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
            name: 'Relation',
            selector: 'Relation',
            sortable: true
        },
        {
            name: 'PatientName',
            selector: 'PatientName',
            sortable: true
        },
        {
            name: 'Patient CNIC',
            selector: 'PatientCNIC',
            sortable: true
        },
        {
            name: 'PatientPhoneNumber',
            selector: 'PatientPhoneNumber',
            sortable: true
        },
        {
            name: 'Disability',
            selector: 'Disability',
            sortable: true
        },
        {
            name: 'Disease',
            selector: 'DiseaseName',
            sortable: true
        },
        {
            name: 'HospitalName',
            selector: 'HospitalName',
            sortable: true
        },
        {
            name: 'HospitalContactNo',
            selector: 'HospitalContactNo',
            sortable: true
        },
        {
            name: 'HospitalAddress',
            selector: 'HospitalAddress',
            sortable: true
        },
        {
            name: 'DoctorName',
            selector: 'DoctorName',
            sortable: true
        },
        {
            name: 'DoctorContactNo',
            selector: 'DoctorContactNo',
            sortable: true
        },
        {
            name: 'IsEligibleForSehatSahulatCard',
            selector: 'IsEligibleForSehatSahulatCard',
            sortable: true
        }];

    const handleInputChange = (e) => {



    
        const { name, value } = e.target;
        let _values = e.target.value;


        if (e.target.getAttribute("isalphabetic") === "true") {
    
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



        let ddlDisability = await GetDisability();
        let ddlDisease = await GetDisease();



        setdisabilityddl(ddlDisability.data);
        setdiseaseddl(ddlDisease.data);



        ReBindGrid();


    }






    const GetDisability = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.Disability, 0, "", 0);

        return data;
    }

    const GetDisease = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.Diseases, 0, "", 0);

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
       
            searchValues.DisabilityId = searchValues.DisabilityId == -1 ? null : searchValues.DisabilityId;
            searchValues.DiseaseId = searchValues.DiseaseId == -1 ? null : searchValues.DiseaseId; 
            const data = await fetchData(
                ControllerName.Reporting,
                ApiMethods.Report_Patient_List,
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
                                                <Label for="">Applicant CNIC</Label>
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
                                                <Label for="">Patient Name</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Patient Name"
                                                    onChange={handleInputChange}
                                                    name="PatientName"
                                                    isalphabetic="true"
                                                    maxLength="50"
                                                    value={searchValues.PatientName}
                                                />
                                            </FormGroup>
                                        </Col>



                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Patient CNIC</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Patient Contact No"
                                                    onChange={handleInputChange}
                                                    isnumber="true"
                                                    placeholder="XXXXXXXXXXXXX"
                                                    name="PatientContactNumber"
                                                    maxLength="11"
                                                    value={searchValues.PatientContactNumber}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Hospital Name</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Hospital Name"
                                                    onChange={handleInputChange}
                                                    name="HospitalName"
                                                    isalphabetic="true"
                                                    maxLength="50"
                                                    value={searchValues.HospitalName}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Doctor Name</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Doctor Name"
                                                    onChange={handleInputChange}
                                                    name="DoctorName"
                                                    isalphabetic="true"
                                                    maxLength="50"
                                                    value={searchValues.DoctorName}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Disability</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="DisabilityId"
                                                    type="select"
                                                    value={searchValues.DisabilityId}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        disabilityddl.map((item, key) => (
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
                                                <Label for="">Disease</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="DiseaseId"
                                                    type="select"
                                                    value={searchValues.DiseaseId}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        diseaseddl.map((item, key) => (
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
                                        Report Patient List
                                    </Col>
                                    {/*<Col lg={6} md={6} className="text-right">*/}
                                    {/*    <ReactHTMLTableToExcel*/}
                                    {/*        id="test-table-xls-button"*/}
                                    {/*        className="download-table-xls-button mb-3 btn btn-secondary btn-sm"*/}
                                    {/*        table="table-to-xls"*/}

                                    {/*        filename="Report_PatientList"*/}
                                    {/*        sheet="PatientList"*/}
                                    {/*        buttonText="Export" />*/}
                                    {/*</Col>*/}
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <DataTableExtensions
                                    {...finalData}
                                    exportHeaders={true}
                                    fileName="PatientListReport"
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
                                {/*            <th>Gender</th>*/}
                                {/*            <th>Age</th>*/}
                                {/*            <th>Relation</th>*/}

                                {/*            <th>Patient Name</th>*/}
                                {/*            <th>Patient Contact</th>*/}
                                {/*            <th>Disability</th>*/}
                                {/*            <th>Disease Hospital Name</th>*/}
                                {/*            <th>Hospital Contact No</th>*/}
                                {/*            <th>Hospital Address</th>*/}
                                {/*            <th>Doctor Name</th>*/}
                                {/*            <th>Doctor Contact</th>*/}
                                {/*            <th>Eligibility Sehat Sahulat Card</th>*/}

                                {/*        </tr>*/}
                                {/*    </thead>*/}
                                {/*    <tbody>*/}
                                {/*        {reportList && reportList.map((item, key) => (*/}
                                {/*            <tr key={key}>*/}
                                {/*                <td>{key + 1}</td>*/}
                                {/*                <td>{item.ApplicantCaseCode}</td>*/}
                                {/*                <td>{item.ApplicantName}</td>*/}
                                {/*                <td>{item.CnicNo}</td>*/}
                                {/*                <td>{item.Gender}</td>*/}
                                {/*                <td>{item.AGE}</td>*/}
                                {/*                <td>{item.Relation}</td>*/}
                                {/*                <td>{item.PatientName}</td>*/}


                                {/*                <td>{item.PatientPhoneNumber}</td>*/}
                                {/*                <td>{item.Disability}</td>*/}

                                {/*                <td>{item.HospitalName}</td>*/}



                                {/*                <td>{item.HospitalContactNo}</td>*/}
                                {/*                <td>{item.HospitalAddress}</td>*/}
                                {/*                <td>{item.DoctorName}</td>*/}
                                {/*                <td>{item.DoctorContactNo}</td>*/}
                                {/*                <td>{item.IsEligibleForSehatSahulatCard}</td>*/}



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

export default Report_Patient_List