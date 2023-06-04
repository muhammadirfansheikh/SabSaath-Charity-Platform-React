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
    Input,
    BreadcrumbItem,
    Breadcrumb
} from "reactstrap";

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { baseImageUrl, fetchData } from 'utils/Api'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from 'utils/Constants'
import { GetSetupMaster, AllowAlphabatic } from 'utils/CommonMethods'
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import HomeHeader from '../../components/Header/HomeHeader.js'
import HomeFooter from '../../components/Footer/HomeFooter.js'
import Swal from "sweetalert2";
import FormGroupTable from "components/GeneralComponent/FormGroupTable";
import { CSVLink } from "react-csv";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import * as api from "../../utils/Api.js";
import { Link } from "react-router-dom";

const Report_Subscription_List_Info_List = (props) => {
    const subsId = localStorage.getItem('subsId');
    const searchingValues = {
        OperationID: 1,
        UserId: localStorage.getItem("UserId"),
        CategoryWise: 0,
        SubscriptionDate: "",
        PostingFreq: "",
        DonationType: 0,

    };

    const [tableView, setTableView] = useState(false)
    const [searchValues, setSearchVlues] = useState(searchingValues);
    const [reportList, setreportList] = useState([]);
    const [reportListdetail, setreportListdetail] = useState([]);
    const [donationTypeddl, setdonationTypeddl] = useState([]);
    const [paymentTypeddl, setpaymentTypeddl] = useState([]);
    const [finalData, setFinalData] = useState({});
    const [finalDatadetail, setFinalDatadetail] = useState({});
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
            GetSubscription_List_detail(subsId);
            //resetFormelement();
        };
        load();
    }, []);

    const columnsdetails = [

        {
            name: 'CreatedDate',
            selector: 'CreatedDate',
            sortable: true
        },
        {
            name: 'PostingDate',
            selector: 'PostingDate',
            sortable: true
        },
        {
            name: 'Amount',
            selector: 'Amount',
            sortable: true
        },
        {
            name: 'ActualPostingDate',
            selector: 'ActualPostingDate',
            sortable: true
        },
        {
            name: 'Status',
            selector: 'Status',
            sortable: true
        },
        {
            name: 'PKRRate',
            selector: 'PKRRate',
            sortable: true
        },
        {
            name: 'InvoiceNo',
            selector: 'InvoiceNo',
            sortable: true
        },
        {
            name: 'Receipt',
            selector: 'Receipt',
            sortable: true
        },
        {
            name: 'SubscriptionDetailId',
            selector: 'SubscriptionDetailId',
            sortable: true
        },
    ]

    // detail
    const GetSubscription_List_detail = async (obj) => {
        try {
            var RequestData = {
                OperationID: 1,
                SubscriptionId: obj,
            };
            const data = await fetchData(
                ControllerName.Reporting,
                ApiMethods.Report_Subscription_List_Detail,
                RequestData
            );
            if (data != null) {
                if (data.Response === true && data.DataSet != null) { 
                    var detaildata = await data.DataSet.Table;
                    setreportListdetail(detaildata);
                    setFinalDatadetail({ columnsdetails, detaildata });
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
    //end
    async function funCancel(e) { 
        Swal.fire({
            customClass: {
                container: "my-swal",
            },
            text: "Are you sure you want to cancel this donation?",
            icon: "success",
            showCancelButton: true,
            cancelButtonText: `Cancel`,
            cancelButtonColor: "#2f4050",
            confirmButtonText: `Confirm`,
            confirmButtonColor: "#bf1e2e",
        }).then((result) => {
            if (result.isConfirmed) {
                api
                    .fetchData(
                        ControllerName.Reporting,
                        "Report_SubscriptionCancel", {
                        OperationID: 3,
                        SubscriptionDetailId: e
                    }
                    )
                    .then((result) => { 
                      
                        if (result?.DataSet?.Table[0].haserror > 0) {
                            Swal.fire({
                                title: "error",
                                text: result?.DataSet?.Table[0].Error_Message,
                                icon: "error",
                            });
                            return;
                        }
                        Swal.fire({
                            // title: "Your donation is canceled",
                            title: result.ResponseMessage,
                            text: result?.DataSet?.Table[0].Message,
                            icon: "success",
                        });
                        setTableView(false)
                    })
            }
            else {
                Swal.fire({
                    title: "",
                    text: "Thankyou for continuing with your donation",
                    icon: "success",
                });
            }
        })
    }


    return (
        <div className="maincontent">
            <HomeHeader isShow={false} />
            <div className="content">

                <section id="inner-banner" className="section">
                    <div className="container">
                        <h1 className="mb-0">Subscription List Details</h1>
                    </div>
                </section>
                <section className="section p-0 mt-5 mb-4">
                    {/* <Row>
                        <Col lg={12} md={12}>
                            <Card className="card-user">
                                <CardBody>
                                    <Form>
                                        <Row form>

                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row> */}
                    {/* detail */}
                    {

                        <Row>
                            <Col lg={12} md={12}>
                                <Card>
                                    <CardHeader>
                                        <Row>
                                            <Col lg={6} md={6}>
                                                Detail Subscription Info
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Table bordered striped>
                                            <thead>
                                                <tr>
                                                    <th>Sr #</th>
                                                    <th>Subscription ID</th>
                                                    <th>Created Date</th>
                                                    <th>Posting Date</th>
                                                    <th>Amount - Currency</th>
                                                    <th>Actual Posting Date</th>
                                                    <th>Status - Reason</th>
                                                    <th>PKR Rate</th>
                                                    <th>Invoice Number</th>
                                                    <th>Receipt</th>
                                                    <th>Options</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reportListdetail &&
                                                    reportListdetail.map((item, key) => (
                                                        <tr key={key}>
                                                            <td>{key + 1}</td>
                                                            <td>{item.SubscriptionDetailId}</td>
                                                            <td>{item.CreatedDate}</td>
                                                            <td>{item.PostingDate}</td>
                                                            <td>{item.Amount}</td>
                                                            <td>{item.ActualPostingDate}</td>
                                                            <td>{item.Status}</td>
                                                            <td>{item.PKRRate}</td>
                                                            <td>{item.InvoiceNo}</td>
                                                            
                                                            <td>
                                                            {item.Status === "Pending" || item.Status === "Canceled" ? (
                                                               ""
                                                            ) : (
                                                                <a href={baseImageUrl + item.Receipt} target="_blank"> <i className="fa fa-file" /></a>
                                                            )}
                                                            </td>
                                                            <td>
                                                            {item.Status === "Pending" ? (
                                                              <a onClick={(e) => funCancel(item.SubscriptionDetailId)} href="#">
                                                              Cancel
                                                          </a>
                                                            ) : (
                                                               ""
                                                            )}                                                                
                                                            </td>
                                                        </tr>
                                                    ))}

                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    }



                    {/* end */}
                </section>



            </div>
            <HomeFooter />
        </div>
    );
}

export default Report_Subscription_List_Info_List
