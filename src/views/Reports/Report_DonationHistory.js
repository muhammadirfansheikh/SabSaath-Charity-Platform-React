

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
import { baseImageUrl, fetchData } from 'utils/Api'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from 'utils/Constants'
import { GetSetupMaster, AllowAlphabatic } from 'utils/CommonMethods'
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import Swal from "sweetalert2";
import FormGroupTable from "components/GeneralComponent/FormGroupTable";
import { CSVLink } from "react-csv";
import ReactToPrint, { useReactToPrint } from "react-to-print"; 

const Report_DonationHistory = (props) => {
    const searchingValues = {
        OperationID : 0,
        UserId : localStorage.getItem("UserId"),
      
    };

    const [searchValues, setSearchVlues] = useState(searchingValues);
    const [reportList, setreportList] = useState([]);



    const [donationTypeddl, setdonationTypeddl] = useState([]);
    const [paymentTypeddl, setpaymentTypeddl] = useState([]);
    const [finalData, setFinalData] = useState({});

    const columns1 = [
        { field: "DonatedOn", name: "DonatedOn" },
        { field: "InvoiceNo", name: "InvoiceNo" },

        { field: "Amount", name: "Amount" },
        { field: "subscribedOn", name: "subscribedOn" },


        { field: "DonationType", name: "DonationType" },
        { field: "Casewise", name: "Casewise" },

        { field: "Rate", name: "Rate" },
        { field: "PKRAmount", name: "PKRAmount" },
    ];
    const columns = [
        
            {
            name: 'DonatedOn',
            selector: 'DonatedOn',
            sortable: true
        },
        {
            name: 'InvoiceNo',
            selector: 'InvoiceNo',
            sortable: true
        },
        {
            name: 'Amount',
            selector: 'Amount',
            sortable: true
        },
        {
            name: 'subscribedOn',
            selector: 'subscribedOn',
            sortable: true
        },
        {
            name: 'DonationType',
            selector: 'DonationType',
            sortable: true
        },
        {
            name: 'Casewise',
            selector: 'Casewise',
            sortable: true
        },

        {
            name: 'Receipt',
            selector: 'Receipt',
            sortable: true
        },


        {
            name: 'Rate',
            selector: 'Rate',
            sortable: true
        },
        {
            name: 'PKRAmount',
            selector: 'PKRAmount',
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
            searchValues.OperationID = 1; 
            searchValues.UserId =  localStorage.getItem("UserId");
            
            const data = await fetchData(
                ControllerName.Reporting,
                ApiMethods.Report_DonationHistory,
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
        {/* <ReactToPrint 
        trigger={()=>{

            return <button>print</button>
        }}
        content={()=>this.componentRef}
        documentTitle="New Document"
        pageStyle="Print"
        >

        </ReactToPrint> */}
            <div className="content">
                <Row>
                    <Col lg={12} md={12}>
                        {/* <Card className="card-user"> */}
                        <Card className="">
                            <CardBody>
                                <Form>
                                    <Row form>
                             
                                        {/* <Col md={3}>
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
                                        </Col> */}

{/* 
                                        <Col md={12} className="text-right">
                                            <Button color="primary" size="sm" className="mr-2" onClick={handleSearchClick}>Search</Button>
                                            <Button color="secondary" size="sm" onClick={handleCancelClick}>Cancel</Button>
                                            <Button color="primary" size="sm" className="mr-2">print</Button>
                                        </Col> */}
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
                                        Donation history
                                    </Col>
                                 </Row>
                            </CardHeader>
                            <CardBody>
                            <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Donated On</th>
                      <th>Transaction ID</th>
                      <th>Posting Period</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Subscribed On</th>
                      <th>Donation Type</th>
                      <th>Cause</th>
                      <th>Receipt</th>
                      <th>Conversion Rate</th>
                      <th>PKR Amount</th>
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {reportList &&
                      reportList.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.DonatedOn}</td>
                          <td>{item.InvoiceNo}</td>
                          <td>{item.PaymentType}</td>
                          <td>{item.Trx_Status}</td>
                          <td>{item.Amount}</td>
                          <td>{item.subscribedOn}</td>
                          <td>{item.DonationType}</td>
                          <td>{item.Casewise}</td>
                          <td>
                          <a href={baseImageUrl + item.Receipt} target="_blank" rel="noreferrer"> <i className="fa fa-file" /></a>
                          </td>
                          <td>{item.Rate}</td>
                          <td>{item.PKRAmount}</td>
                          </tr>
                      ))}

                 </tbody>
                </Table>
                                 {/* <DataTableExtensions
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


                                        fixedHeaderScrollHeight="auto"


                                        subHeaderAlign="right"
                                        subHeaderWrap

                                    />
                                </DataTableExtensions>  */}


                             {/* <ReactToPrint>
                                <FormGroupTable
                                    columns={columns1}
                                    rows={reportList}
                                />
                              
                              </ReactToPrint> */}
                              </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div>

        </>
    );
}

export default Report_DonationHistory
