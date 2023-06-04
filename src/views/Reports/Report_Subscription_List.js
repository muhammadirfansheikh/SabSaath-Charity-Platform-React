

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

const Report_Subscription_List = (props) => {
    const searchingValues = {
        OperationID: 1,
        UserId: localStorage.getItem("UserId"),
        CategoryWise: 0,
        SubscriptionDate: "",
        PostingFreq: "",
        DonationType: 0,
      
    };

    const [searchValues, setSearchVlues] = useState(searchingValues);
    const [reportList, setreportList] = useState([]);
    const [donationTypeddl, setdonationTypeddl] = useState([]);
    const [paymentTypeddl, setpaymentTypeddl] = useState([]);
    const [finalData, setFinalData] = useState({});
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

    const resetFormelement = async () => {
        setSearchVlues(searchingValues);
        let ddlDonationType = await GetDonationType();
       // setdonationTypeddl(ddlDonationType.data);
         ReBindGrid();
    }
    const GetDonationType = async (e) => {
        var data = await GetSetupMaster(SetupMasterIds.GeneralDonation, 0, "", 0);
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
    const GetSubscription_List = async () => {
    
        try {
          
            var RequestData = {
                OperationID: 1,
                UserId: localStorage.getItem("UserId"),
                CategoryWise: 0,
                SubscriptionDate: null,
                PostingFreq: "",
                DonationType: 0,
              };
            const data = await fetchData(
                ControllerName.Reporting,
                ApiMethods.Report_Subscription_List,
                RequestData
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
       var data = await GetSubscription_List();
        setreportList(data);
        setFinalData({ columns, data });

    }
   return (
           <>
              <div className="content"> 
                <Row>
                    <Col lg={12} md={12}>
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col lg={6} md={6}>
                                    Subscription Detail
                                    </Col>
                                 </Row>
                            </CardHeader>
                            <CardBody>
                            <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Donation Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>PKR Rate</th>
                      <th>Invoice Number</th>
                      <th>Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportList &&
                      reportList.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.DonationDate}</td>
                          <td>{item.Amount}</td>
                          <td>{item.Status}</td>
                          <td>{item.PKRRate}</td>
                          <td>{item.InvoiceNo}</td>
                          <td>
                          <a href={baseImageUrl + item.Receipt} target="_blank"> <i className="fa fa-file" /></a>
                          </td>
                          </tr>
                      ))}

                 </tbody>
                </Table> 
                              </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div>

        </>
    );
}

export default Report_Subscription_List
