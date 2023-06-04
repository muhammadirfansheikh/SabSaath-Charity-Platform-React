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
import { ApiMethods, ControllerName, DataTableCustomStyles, OperationTypeId, SetupMasterIds } from 'utils/Constants'
import { GetSetupMaster, AllowAlphabatic } from 'utils/CommonMethods'
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import Swal from "sweetalert2";


const Report_Donor_List = (props) => {
    const searchingValues = {
        ApplicantCaseCode: "",
        CaseTitle: "",
        FirstName: "",
        LastName: "",
        TypeOfDonationId: -1,
        PaymentTypeId: -1,
      
    };

    const [searchValues, setSearchVlues] = useState(searchingValues);
    const [reportList, setreportList] = useState([]);



    const [donationTypeddl, setdonationTypeddl] = useState([]);
    const [paymentTypeddl, setpaymentTypeddl] = useState([]);
    const [finalData, setFinalData] = useState({});
    const columns = [
        
            {
            name: 'FirstName',
            selector: 'FirstName',
            sortable: true
        },
        {
            name: 'LastName',
            selector: 'LastName',
            sortable: true
        },
        {
            name: 'EmailAddress',
            selector: 'EmailAddress',
            sortable: true
        },
        {
            name: 'ContactNumber',
            selector: 'ContactNumber',
            sortable: true
        },
        {
            name: 'DonationType',
            selector: 'DonationType',
            sortable: true
        },
        {
            name: 'PaymentType',
            selector: 'PaymentType',
            sortable: true
        },
        {
            name: 'ApplicantCaseCode',
            selector: 'ApplicantCaseCode',
            sortable: true
        },
        {
            name: 'CaseTitle',
            selector: 'CaseTitle',
            sortable: true
        },
        {
            name: 'Descriptions',
            selector: 'Descriptions',
            sortable: true
        },
    ]


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

        let ddlDonationType = await GetDonationType();
        setdonationTypeddl(ddlDonationType.data);

        let ddlPaymentType = await GetPaymentType();
        setpaymentTypeddl(ddlPaymentType.data);

        ReBindGrid();


    }






    const GetDonationType = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.GeneralDonation, 0, "", 0);

        return data;
    }
    const GetPaymentType = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.PaymentType, 0, "", 0);

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
    const GetDonorListReport = async () => {
        try {
          
            searchValues.TypeOfDonationId = searchValues.TypeOfDonationId == -1 ? null : searchValues.TypeOfDonationId;
            searchValues.PaymentTypeId = searchValues.PaymentTypeId == -1 ? null : searchValues.PaymentTypeId;
            const data = await fetchData(
                ControllerName.Reporting,
                ApiMethods.Report_Donor_List,
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
 
        var data = await GetDonorListReport(); 
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
                                                <Label for="">Case Title</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Case Title"
                                                    onChange={handleInputChange}
                                                    name="CaseTitle"
                                                    isalphabetic="true"
                                                    maxLength="50"
                                                    value={searchValues.CaseTitle}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">First Name</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="First Name"
                                                    onChange={handleInputChange}
                                                    name="FirstName"
                                                    isalphabetic="true"
                                                    maxLength="50"
                                                    value={searchValues.FirstName}
                                                />
                                            </FormGroup>
                                        </Col>


                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Last Name</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    onChange={handleInputChange}
                                                    name="LastName"
                                                    isalphabetic="true"
                                                    maxLength="50"
                                                    value={searchValues.LastName}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Donation Type</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="TypeOfDonationId"
                                                    type="select"
                                                    value={searchValues.TypeOfDonationId}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        donationTypeddl.map((item, key) => (
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
                                                <Label for="">Payment Type</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="PaymentTypeId"
                                                    type="select"
                                                    value={searchValues.PaymentTypeId}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        paymentTypeddl.map((item, key) => (
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
                                        Donor List
                                    </Col>
                                    {/*<Col lg={6} md={6} className="text-right">*/}
                                    {/*    <ReactHTMLTableToExcel*/}
                                    {/*        id="test-table-xls-button"*/}
                                    {/*        className="download-table-xls-button mb-3 btn btn-secondary btn-sm"*/}
                                    {/*        table="table-to-xls"*/}

                                    {/*        filename="Report_DonorList"*/}
                                    {/*        sheet="DonorList"*/}
                                    {/*        buttonText="Export" />*/}
                                    {/*</Col>*/}
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <DataTableExtensions
                                    {...finalData}
                                    exportHeaders={true}
                                    fileName="DonorListReport"
                                >
                                    <DataTable
                                        dense
                                        direction="auto"
                                        defaultSortField="FirstName"
                                        fixedHeader
                                        striped
                                        defaultSortAsc={false}
                                        pagination
                                        highlightOnHover
                                        progressPending={pending}
                                        responsive

                                                    customStyles={DataTableCustomStyles}
                                        fixedHeaderScrollHeight="auto"


                                        subHeaderAlign="right"
                                        subHeaderWrap

                                    />
                                </DataTableExtensions>
                                {/*<Table id="table-to-xls" bordered striped responsive>*/}
                                {/*    <thead>*/}
                                {/*        <tr>*/}
                                {/*            <th>Sr #</th>*/}
                                            
                                {/*            <th>First Name</th>*/}
                                {/*            <th>Last Name</th>*/}

                                {/*            <th>Email Address</th>*/}
                                {/*            <th>Contact No</th>*/}
                                {/*            <th>Donation Type</th>*/}
                                {/*            <th>Payment Type</th>*/}
                                {/*            <th>Applicant Case code</th>*/}
                                {/*            <th>Case Title</th>*/}
                                {/*            <th>Description</th>*/}
                                            

                                {/*        </tr>*/}
                                {/*    </thead>*/}
                                {/*    <tbody>*/}
                                {/*        {reportList && reportList.map((item, key) => (*/}
                                {/*            <tr key={key}>*/}
                                {/*                <td>{key + 1}</td>*/}
                                {/*                <td>{item.FirstName}</td>*/}

                                {/*                <td>{item.LastName}</td>*/}
                                {/*                <td>{item.EmailAddress}</td>*/}
                                {/*                <td>{item.ContactNumber}</td>*/}
                                {/*                <td>{item.DonationType}</td>*/}

                                {/*                <td>{item.PaymentType}</td>*/}
                                {/*                <td>{item.ApplicantCaseCode}</td>*/}
                                {/*                <td>{item.CaseTitle}</td>*/}
                                {/*                <td>{item.Descriptions}</td>*/}

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

export default Report_Donor_List