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


const Report_Referral_List = (props) => {
    const searchingValues = {

        ReferralTypeId:-1,
        ReferralApplicantOrCompanyId: -1,
        ReferralName: ""
    };

    const [searchValues, setSearchVlues] = useState(searchingValues);
    const [reportList, setreportList] = useState([]);



    const [referralTypeddl, setreferralTypeddl] = useState([]);
    const [referralApplicantOrFamilyddl, setreferralApplicantOrFamilyddl] = useState([]);
    const [finalData, setFinalData] = useState({});

    const columns = [
        {
            name: 'ReferralType',
            selector: 'ReferralType',
            sortable: true
        },
        {
            name: 'Applicant_Company',
            selector: 'Applicant_Company',
            sortable: true
        },
        {
            name: 'ReferralName',
            selector: 'ReferralName',
            sortable: true
        },
        {
            name: 'Relation',
            selector: 'Relation',
            sortable: true
        },
        {
            name: 'ContactNo',
            selector: 'ContactNo',
            sortable: true
        },
       
    ];
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



        let ddlReferralType = await GetReferralType();


        setreferralTypeddl(ddlReferralType.data);

        ReBindGrid();


    }






    const GetReferralType = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.ReferrerType, 0, "", 0);

        return data;
    }


    const onReferrerChange = async (e) => {
        handleInputChange(e);
        let result = await fetchData(
            ControllerName.Applicant,
            ApiMethods.Get_Data_According_To_ReferrerType,
            [e.target.value]
        );
        setreferralApplicantOrFamilyddl(result.data);
    };

   
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
    const GetReferralList = async () => {
        try {
       
            searchValues.ReferralTypeId = searchValues.ReferralTypeId == -1 ? null : searchValues.ReferralTypeId;
            searchValues.ReferralApplicantOrCompanyId = searchValues.ReferralApplicantOrCompanyId == -1 ? null : searchValues.ReferralApplicantOrCompanyId;

            const data = await fetchData(
                ControllerName.Reporting,
                ApiMethods.Report_Referral_List,
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
    
        var data = await GetReferralList(); 
        setreportList(data);
        setFinalData({ columns, data })

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
                                                <Label for="">Referral Type</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="ReferralTypeId"
                                                    type="select"
                                                    value={searchValues.ReferralTypeId}
                                                    onChange={onReferrerChange}>
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
                                                <Label for="">Applicant/Company</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="ReferralApplicantOrCompanyId"
                                                    type="select"
                                                    value={searchValues.ReferralApplicantOrCompanyId}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        referralApplicantOrFamilyddl.map((item, key) => (
                                                            <option key={key} value={item.FeildValue}>
                                                                {item.FeildName}
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
                                                    isalphabetic="true"
                                                    maxLength="50"
                                                    value={searchValues.ReferralName}
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
                                        Referral Report List
                                    </Col>
                                    {/*<Col lg={6} md={6} className="text-right">*/}
                                    {/*    <ReactHTMLTableToExcel*/}
                                    {/*        id="test-table-xls-button"*/}
                                    {/*        className="download-table-xls-button mb-3 btn btn-secondary btn-sm"*/}
                                    {/*        table="table-to-xls"*/}

                                    {/*        filename="Report_ReferralList"*/}
                                    {/*        sheet="ReferralList"*/}
                                    {/*        buttonText="Export" />*/}
                                    {/*</Col>*/}
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <DataTableExtensions
                                    {...finalData}
                                    exportHeaders={true}
                                    fileName="ReferralListReport"
                                >
                                    <DataTable
                                        dense
                                        direction="auto"
                                        defaultSortField="Name"
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
                                {/*            <th>Referrer Type</th>*/}
                                {/*            <th>Applicant/Company</th>*/}
                                {/*            <th>Referrer Name</th>*/}

                                {/*            <th>Relation</th>*/}
                                {/*            <th>Contact No</th>*/}
                                            

                                {/*        </tr>*/}
                                {/*    </thead>*/}
                                {/*    <tbody>*/}
                                {/*        {reportList && reportList.map((item, key) => (*/}
                                {/*            <tr key={key}>*/}
                                {/*                <td>{key + 1}</td>*/}
                                {/*                <td>{item.ReferralType}</td>*/}

                                {/*                <td>{item.Applicant_Company}</td>*/}
                                {/*                <td>{item.ReferralName}</td>*/}
                                {/*                <td>{item.Relation}</td>*/}
                                {/*                <td>{item.ContactNo}</td>*/}

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

export default Report_Referral_List