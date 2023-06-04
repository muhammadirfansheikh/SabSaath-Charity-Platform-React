import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody, Card, CardBody, CardHeader, Table } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { FindAndGetNewArrayFromArray, GetCompanies, GetSetupMaster, GetUniqueStringValue, Get_CompanyData, InsertSetupDetail, RemoveItemOfArrayAndGetNewObject, UpdateSetupDetail, AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";


export const Modal_Company = (props) => {



    const objcompanyBankValues =
    {
        GuidId: '',
        ID: 0,
        CompanyID: 0,
        BankBranchName: '',
        BankID: 0,
        BankName: '',
        IBAN: '',
        AccountNo: '',
        SwiftCode: '',
        AccountTitle: '',
        BranchAddress: '',
        IsActive: true
    }


    const objcompanyValues = {
        OperationId: 0,
        CompanyID: 0,
        ParentId: 0,
        FamilyId: 0,

        Company: '',
        Block_UnblockReason: '',
        Address: '',

        PhoneNo: '',
        Ext: '',
        IsSuperCompanyBool: false,
        IsTrustedBool: false,
        IsBlockBool: false,
        IsActiveBool: true,
        CreatedBy: 0,
        ModifiedBy: 0,
        UserIP: 0,
        BankId: 0,
        CompanyBankInfoList: [],

    };
    const [comapnyBankvalues, setcomapnyBankvalues] = useState([]);

    const [GetBankValues, setGetBankValues] = useState([]);
    const [GetCompValue, setGetCompValue] = useState();
    const [isDisabled, setisDisabled] = useState(true);


    const [bankValues, setbankValues] = useState(objcompanyBankValues);
    const [comapnyvalues, setcomapnyvalues] = useState(objcompanyValues);

    const [ModalParentCompanyddl, setModalParentCompanyddl] = useState([]);

    const [Modalbankddl, setModalbankddl] = useState([]);
    const [ModalCompanyFamilyddl, setModalCompanyFamilyddl] = useState([]);



    const handleInputChange = (e) => { 
        const { name, value } = e.target;
        let values = e.target.value;


        if (e.target.type === "checkbox") {
            values = e.target.checked;

            if (e.target.getAttribute("isBlock") == "true") {

                if (e.target.checked)
                    setisDisabled(false)
                else
                    setisDisabled(true);
            }
        }
        else if (e.target.getAttribute("isnumber") == "true")
            values = e.target.value.replace(/\D/g, "");

        else if (e.target.getAttribute("isalphabetic") === "true") { 
            values = AllowAlphabatic(e.target.value);
        }

        setcomapnyvalues({
            ...comapnyvalues,
            [name]: values,
        });



    };

    const handleCompanyBankInputChange = (e) => { 
        const { name, value } = e.target;

        let values = e.target.value;


        if (e.target.type === "checkbox")
            values = e.target.checked;
        else if (e.target.getAttribute("isnumber") == "true")
            values = e.target.value.replace(/\D/g, "");

        else if (e.target.getAttribute("isalphabetic") === "true") { 
            values = AllowAlphabatic(e.target.value);
        }
        if (e.target.type === "select-one") {

            if (name == "BankID") {
                setbankValues({
                    ...bankValues,
                    ["BankName"]: e.target.options[e.target.selectedIndex].text,
                    ["BankID"]: e.target.value,
                });
            }

        }
        else {
            setbankValues({
                ...bankValues,
                [name]: values,
            });
        }



    };



    function toggle() {
        props.closeNewmodal();
    }

    React.useEffect(() => { 
        // need to define the function and call it separately 
        setGetCompValue(props.CompanyId)
        const load = async () => {
            if (props.CompanyId > 0) { 
                var data = await Get_CompanyData(5, props.CompanyId); 
                if (data.response === true && data.data != null) { 
                    let _tempData = await loadModalDropDown();
                    SetEditModeValues(data.data[0], data.data[1]);
                } 
            }
            else {

                let _tempData = await loadModalDropDown();
            } 
        }; 
        load(); 
    }, []); 
    const SetEditModeValues = (data, bankData = []) => {  
        setcomapnyvalues((prevState) => ({
            ...prevState,
            CompanyID: data[0].companyID,
            ParentId: data[0].parentId === null ? "0" : data[0].parentId,
            FamilyId: data[0].familyId === null ? "0" : data[0].familyId,

            Company: data[0].company,
            Block_UnblockReason: data[0].block_UnblockReason,
            Address: data[0].address,

            PhoneNo: data[0].phoneNo,
            Ext: data[0].ext,
            IsSuperCompanyBool: data[0].isSuperCompanyBool,
            IsTrustedBool: data[0].isTrustedBool,
            IsBlockBool: data[0].isBlockBool,
            IsActiveBool: data[0].isActiveBool 

        }));

        if (data[0].isBlockBool)
            setisDisabled(false);
        if (bankData.length > 0) {
            for (var i = 0; i < bankData.length; i++) {
                let objBankData = {
                    CompanyId: bankData[i].companyId,
                    GuidId: GetUniqueStringValue(),
                    BankBranchName: bankData[i].bankBranchName,
                    BankName: bankData[i].bankName,
                    SwiftCode: bankData[i].swiftCode,
                    AccountTitle: bankData[i].accountTitle,
                    BranchAddress: bankData[i].branchAddress,
                    BankID: bankData[i].bankID,
                    IBAN: bankData[i].iban,
                    ID: bankData[i].id,
                    AccountNo: bankData[i].accountNo,
                    IsActive: bankData[i].isActive
                };
                comapnyBankvalues.push(objBankData);
            }
            let newBankArray = [...comapnyBankvalues]
            setcomapnyBankvalues(newBankArray);

        }
        else {
            setcomapnyBankvalues([]);
        }
    }

    const GetBank = async () => {

        var data = await GetSetupMaster(SetupMasterIds.Bank, 0, "", 0);

        return data;

    }
    const resetElements = () => {


        setcomapnyvalues(objcompanyValues);
        setcomapnyBankvalues([]);


        props.ReBindGrid();

        loadModalDropDown();


    }
    const loadModalDropDown = async () => { 
        //props.ReBindGrid();

        let ddlCompanyFamilyData = await props.GetCompanyFamily();
        let ddlParentCompanyData = await GetCompanies();
        let ddlBankData = await GetBank();



        setModalCompanyFamilyddl(ddlCompanyFamilyData.data);
        setModalParentCompanyddl(ddlParentCompanyData.data);
        setModalbankddl(ddlBankData.data);
        setcomapnyvalues(comapnyvalues);
        props.ReBindGrid();
        return "";

    }



    const isBankAccountAlreadyExist = (bankId, accountNo, GuidId) => {

        return comapnyBankvalues.some(element => {

            if (element.BankID === bankId && element.AccountNo === accountNo && element.GuidId !== GuidId) {
                return true;
            }
        });
    }

    const EditBankDetail = (GuidValue) => { 
        let getFilterData = FindAndGetNewArrayFromArray(comapnyBankvalues, "GuidId", GuidValue.GuidValue);


        setbankValues((prevState) => ({
            ...prevState,

            AccountNo: getFilterData[0].AccountNo,
            SwiftCode: getFilterData[0].SwiftCode,
            AccountTitle: getFilterData[0].AccountTitle,
            BranchAddress: getFilterData[0].BranchAddress,
            BankBranchName: getFilterData[0].BankBranchName,
            BankID: getFilterData[0].BankID,
            BankName: getFilterData[0].BankName,
            GuidId: getFilterData[0].GuidId,
            IBAN: getFilterData[0].IBAN,
            IsActive: getFilterData[0].IsActive


        }));
    }

    const DeleteBankDetailFromDB = async (CompanyID, BankID) => {

        var UserId = localStorage.getItem('UserId');
        var UserIp = localStorage.getItem('UserIP');
        let RequestData;
        let data;


        //setcomapnyvalues((prevState) => ({
        //    ...prevState,
        //    OperationId: OperationTypeId.CompanyOperation.Delete,
        //    CompanyID: CompanyID,
        //    BankId: BankId,
        //    CreatedBy: UserId,
        //    ModifiedBy: UserId,
        //    UserIP: UserIp,



        //}));
        let obj = {
            OperationId: OperationTypeId.CompanyOperation.Delete,
            CompanyID: CompanyID,
            BankId: BankID,
            CreatedBy: UserId,
            ModifiedBy: UserId,
            UserIP: UserIp
        } 
        RequestData = [obj];
        data = await fetchData(ControllerName.Company, ApiMethods.Company_Operation, RequestData);



        if (data != null) {
            if (data.response === true && data.data != null) {
                return data;
            }
            else {
                return [];
            }
        }
        else {
            return [];

            Swal.fire({ title: 'Error', text: "Error", icon: 'error' });

        }
    }

    const DeleteDetail = async (obj) => { 

        let data;
        let newArray = [];
        let deleteBankDetail;

        if (obj.GuidId != "") { /*Check This For Edit Detail Time*/

            if (props.CompanyId > 0 && parseInt(obj.BankId) > 0)
                deleteBankDetail = await DeleteBankDetailFromDB(props.CompanyId,obj.BankId);

            data = RemoveItemOfArrayAndGetNewObject(comapnyBankvalues, "GuidId", obj.GuidId);


            newArray = [...data];


            setcomapnyBankvalues(newArray);

            setbankValues(objcompanyBankValues);

        }


    }


    const cancelDetail = () => {

        setbankValues(objcompanyBankValues);
    }
    const addBankDetail = () => { 
        if (bankValues.BankID != 0) {

            if (bankValues.BankBranchName != "") {

                if (bankValues.IBAN != "") {
                    if (bankValues.IBAN.length === 24) {
                        if (bankValues.AccountNo != "") {
                            if (bankValues.AccountNo.length === 24) {
                                if (bankValues.AccountTitle != "") {
                                    let isExist = isBankAccountAlreadyExist(bankValues.BankID, bankValues.AccountNo, bankValues.GuidId);
                                    if (!isExist) {
                                        let data;
                                        let newArray = [];


                                        let objectDataBank = {
                                            GuidId: GetUniqueStringValue(),
                                            BankBranchName: bankValues.BankBranchName,
                                            SwiftCode: bankValues.SwiftCode,
                                            AccountTitle: bankValues.AccountTitle,
                                            BranchAddress: bankValues.BranchAddress,
                                            BankName: bankValues.BankName,
                                            BankID: bankValues.BankID === "0" ? null : bankValues.BankID,
                                            IBAN: bankValues.IBAN,
                                            AccountNo: bankValues.AccountNo,
                                            IsActive: bankValues.IsActive
                                        };

                                        if (bankValues.GuidId != "") { /*Check This For Edit Detail Time*/
                                            data = RemoveItemOfArrayAndGetNewObject(comapnyBankvalues, "GuidId", bankValues.GuidId);


                                            newArray = [...data, objectDataBank];

                                        }
                                        else {
                                            newArray = [...comapnyBankvalues, objectDataBank];
                                        }

                                        setcomapnyBankvalues(newArray);

                                        setbankValues(objcompanyBankValues);
                                    }
                                    else {
                                        Swal.fire({ title: 'Error', text: "Account No Alreday Aded Against Selected Bank", icon: 'error' });
                                    }
                                }
                                else {
                                    Swal.fire({ title: 'Error', text: "Enter Account Title", icon: 'error' });
                                }
                            }
                            else {
                                Swal.fire({ title: 'Error', text: "Account No Must Be Equal To 24 Digit.", icon: 'error' });
                            }

                        }
                        else {
                            Swal.fire({ title: 'Error', text: "Enter Account No.", icon: 'error' });
                        }
                    }
                    else {
                        Swal.fire({ title: 'Error', text: "IBAN No Must Be Equal To 24 Digit.", icon: 'error' });
                    }

                }
                else {
                    Swal.fire({ title: 'Error', text: "Enter IBAN.", icon: 'error' });
                }
            }
            else {
                Swal.fire({ title: 'Error', text: "Enter Bank Branch.", icon: 'error' });
            }
        }
        else {
            Swal.fire({ title: 'Error', text: "Select Bank.", icon: 'error' });
        }

    }
    async function AddUpdateCompany(e) {
        try { 

            e.preventDefault(); 

            if (comapnyvalues.Company !== "") {

                var CompanyId = 0;
                CompanyId = props.CompanyId > 0 ? props.CompanyId : 0;
                var UserId = localStorage.getItem('UserId');
                var UserIp = localStorage.getItem('UserIP');
                let RequestData;
                let data;
                comapnyvalues.CompanyBankInfoList = comapnyBankvalues;
                comapnyvalues.OperationId = OperationTypeId.CompanyOperation.Insert_Update; 
                comapnyvalues.CompanyID = CompanyId;
                comapnyvalues.CreatedBy = UserId;
                comapnyvalues.ModifiedBy = UserId;
                comapnyvalues.UserIP = UserIp;
                comapnyvalues.ParentId = comapnyvalues.ParentId === "0" ? null : comapnyvalues.ParentId;
                comapnyvalues.FamilyId = comapnyvalues.FamilyId === "0" ? null : comapnyvalues.FamilyId;
                RequestData = [comapnyvalues]; 
                data = await fetchData(ControllerName.Company, ApiMethods.Company_Operation, RequestData);
                if (data != null) { 
                    if (data.response === true && data.data != null) {
                        CompanyId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });
                       
                        toggle();
                        //return data;
                    }
                    else {
                        Swal.fire({ title: 'Error', text: data.data[0].Message, icon: 'error' });
                        return [];
                    }
                }
                else {
                    return [];

                    Swal.fire({ title: 'Error', text: "Error", icon: 'error' });

                }
            }
            else {
                Swal.fire({ title: 'Error', text: "Enter Company Name.", icon: 'warning' });
            }



        }
        catch (error) { 
        }
    }
    function toggle() {
        props.closeNewmodal();
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} size="xl" backdrop="off">
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
                <Form>
                    <Row form>
                        <Col className="px-1" md="3">
                            <FormGroup>
                                <Label>Company Name</Label>
                                <Input
                                    placeholder="Company Name"
                                    type="text"
                                    name="Company"
                                    isalphabetic="true"
                                    autoComplete="off"
                                    onChange={handleInputChange}
                                    value={comapnyvalues.Company}
                                    maxLength="50"

                                />
                            </FormGroup>
                        </Col>

                        <Col className="px-1" md="3">
                            <FormGroup>
                                <Label>Phone No</Label>
                                <Input
                                    placeholder="XXXXXXXXXXX"
                                    type="text"
                                    name="PhoneNo"

                                    autoComplete="off"
                                    onChange={handleInputChange}
                                    value={comapnyvalues.PhoneNo}
                                    isnumber="true"
                                    maxLength="11"

                                />
                            </FormGroup>
                        </Col>
                        <Col className="px-1" md="3">
                            <FormGroup>
                                <Label>Ext</Label>
                                <Input
                                    placeholder="Ext"
                                    type="text"
                                    name="Ext"

                                    autoComplete="off"
                                    onChange={handleInputChange}
                                    value={comapnyvalues.Ext}
                                    maxLength="5"
                                    isnumber="true"

                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="">Parent Company</Label>
                                <Input
                                    id="exampleSelect"
                                    name="ParentId"
                                    type="select"
                                    value={comapnyvalues.ParentId}
                                    onChange={handleInputChange}>
                                    <option key={0} value={0}>
                                        Select
                                    </option>

                                    {
                                        ModalParentCompanyddl.map((item, key) => (
                                            <option key={item.Company} value={item.CompanyId}>
                                                {item.Company}
                                            </option>
                                        ))
                                    }
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>








                        <Col md={3}>
                            <FormGroup>
                                <Label for="">Company Family</Label>
                                <Input
                                    id="exampleSelect"
                                    name="FamilyId"
                                    type="select"
                                    value={comapnyvalues.FamilyId}
                                    onChange={handleInputChange}>
                                    <option key={0} value={0}>
                                        Select
                                    </option>

                                    {
                                        ModalCompanyFamilyddl.map((item, key) => (
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
                                <div className="form-check-inline mt-3">
                                    <Label className="form-check-Label">
                                        <Input
                                            type="checkbox"
                                            className="form-check-Input"
                                            name="IsActiveBool"
                                            checked={comapnyvalues.IsActiveBool}
                                            onChange={handleInputChange} />
                                        Is Active ?
                                    </Label>
                                </div>
                            </FormGroup>
                        </Col>

                        <Col md={3}>
                            <FormGroup>
                                <div className="form-check-inline mt-3">
                                    <Label className="form-check-Label">
                                        <Input
                                            type="checkbox"
                                            className="form-check-Input"
                                            name="IsSuperCompanyBool"
                                            checked={comapnyvalues.IsSuperCompanyBool}
                                            onChange={handleInputChange} />
                                        Is Super Company ?
                                    </Label>
                                </div>
                            </FormGroup>
                        </Col>

                        <Col md={3}>
                            <FormGroup>
                                <div className="form-check-inline mt-3">
                                    <Label className="form-check-Label">
                                        <Input
                                            type="checkbox"
                                            className="form-check-Input"
                                            name="IsBlockBool"
                                            isBlock="true"
                                            checked={comapnyvalues.IsBlockBool}
                                            onChange={handleInputChange} />

                                        Is Block ?
                                    </Label>
                                </div>
                            </FormGroup>
                        </Col>

                    </Row>

                    <Row form>

                    </Row>
                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Address</Label>
                                <Input
                                    placeholder="Company Address"
                                    type="text"
                                    name="Address"

                                    autoComplete="off"
                                    onChange={handleInputChange}
                                    value={comapnyvalues.Address}
                                    maxLength="100"

                                />
                            </FormGroup>
                        </Col>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Block Or Un Block Reason</Label>
                                <Input
                                    placeholder="Block Or Un Block Reason"
                                    type="text"
                                    name="Block_UnblockReason"

                                    autoComplete="off"
                                    onChange={handleInputChange}
                                    value={comapnyvalues.Block_UnblockReason}
                                    maxLength="100"
                                    disabled={isDisabled}
                                />
                            </FormGroup>
                        </Col>

                    </Row>
                    <Card>
                        <CardHeader>Company Bank Details</CardHeader>
                        <CardBody>
                            <Row form>

                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="">Banks</Label>
                                        <Input
                                            id="exampleSelect"
                                            name="BankID"
                                            type="select"
                                            value={bankValues.BankID}
                                            onChange={handleCompanyBankInputChange}>
                                            <option key={0} value={0}>
                                                Select
                                            </option>

                                            {
                                                Modalbankddl.map((item, key) => (
                                                    <option key={item.SetupDetailName} value={item.SetupDetailId}>
                                                        {item.SetupDetailName}
                                                    </option>
                                                ))
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>

                                <Col className="px-1" md="3">
                                    <FormGroup>
                                        <Label>Bank Branch Name</Label>
                                        <Input
                                            placeholder="Bank Branch Name"
                                            type="text"
                                            name="BankBranchName"
                                            isalphabetic="true"
                                            autoComplete="off"
                                            onChange={handleCompanyBankInputChange}
                                            value={bankValues.BankBranchName}
                                            maxLength="50"

                                        />
                                    </FormGroup>
                                </Col>



                                <Col className="px-1" md="3">
                                    <FormGroup>
                                        <Label>IBAN</Label>
                                        <Input
                                            placeholder="XXXXXXXXXXXXXXXXXXXXXXXX"
                                            type="text"
                                            name="IBAN"
                                            onChange={handleCompanyBankInputChange}
                                            value={bankValues.IBAN}
                                            maxLength="24"

                                            autoComplete="off"
                                            isnumber="true"

                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="px-1" md="3">
                                    <FormGroup>
                                        <Label>Account No</Label>
                                        <Input
                                            placeholder="XXXXXXXXXXXXXXXXXXXXXXXX"
                                            type="text"
                                            name="AccountNo"

                                            autoComplete="off"
                                            onChange={handleCompanyBankInputChange}
                                            value={bankValues.AccountNo}
                                            maxLength="24"
                                            isnumber="true"

                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col className="px-1" md="3">
                                    <FormGroup>
                                        <Label>Account Title</Label>
                                        <Input
                                            placeholder="Account Title"
                                            type="text"
                                            isalphabetic="true"
                                            autoComplete="off"
                                            name="AccountTitle"
                                            onChange={handleCompanyBankInputChange}
                                            value={bankValues.AccountTitle}
                                            maxLength="50"
                                        />
                                    </FormGroup>
                                </Col>

                                <Col className="px-1" md="3">
                                    <FormGroup>
                                        <Label>Swift Code</Label>
                                        <Input
                                            placeholder="Swift Code"
                                            type="text"

                                            autoComplete="off"
                                            name="SwiftCode"
                                            onChange={handleCompanyBankInputChange}
                                            value={bankValues.SwiftCode}
                                            maxLength="50"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="px-1" md="6">
                                    <FormGroup>
                                        <Label>Branch Address</Label>
                                        <Input
                                            placeholder="Branch Address"
                                            type="text"

                                            autoComplete="off"
                                            name="BranchAddress"
                                            onChange={handleCompanyBankInputChange}
                                            value={bankValues.BranchAddress}
                                            maxLength="50"
                                        />
                                    </FormGroup>
                                </Col>



                            </Row>
                            <Row form>

                                <Col lg={12} md={12} className="text-right">
                                    <Button color="primary" size="sm" onClick={cancelDetail} >Cancel</Button>
                                    <Button color="secondary" size="sm" onClick={addBankDetail} >Add Bank</Button>
                                </Col>
                            </Row>

                            <Row className="mt-2">
                                <Col lg={12} md={12}>
                                    <Card>
                                        <CardHeader className="pt-2 pb-2">
                                            <Row>
                                                <Col lg={6} md={6}>
                                                    Bank Detail List
                                                </Col>

                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            <Table bordered striped>
                                                <thead>
                                                    <tr>
                                                        <th>Sr #</th>
                                                        <th>Bank Name</th>
                                                        <th>Bank Branch Name</th>
                                                        <th>IBAN</th>

                                                        <th>Account No</th>
                                                        <th>Account Title</th>
                                                        <th>Swift Code</th>
                                                        <th>Branch Address</th>

                                                        {/*<th>Is Active</th>*/}

                                                        <th className="text-center" style={{ width: 150 }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {comapnyBankvalues && comapnyBankvalues.map((item, key) =>
                                                    (
                                                        <tr key={key}>
                                                            <td>{key + 1}</td>
                                                            <td>{item.BankName}</td>
                                                            <td>{item.BankBranchName}</td>
                                                            <td>{item.IBAN}</td>
                                                            <td>{item.AccountNo}</td>
                                                            <td>{item.AccountTitle}</td>
                                                            <td>{item.SwiftCode}</td>
                                                            <td>{item.BranchAddress}</td>

                                                            {/*<td>{item.IsActive ? "Yes" : "No"}</td>*/}

                                                            <td className="text-center">
                                                                <Button color="primary" className="btn-circle" size="sm" onClick={(e) => EditBankDetail({ GuidValue: item.GuidId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                                <Button color="danger" className="btn-circle" size="sm" onClick={(e) => DeleteDetail({ BankId: item.BankID === undefined ? 0 : item.BankID, GuidId: item.GuidId })}><i className="nc-icon nc-simple-remove"></i></Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>



                                            </Table>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={AddUpdateCompany}>Save</Button>
                <Button color="secondary" size="sm" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>

    );
}

export default Modal_Company;