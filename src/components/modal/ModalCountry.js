import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail, AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const ModalCountry = (props) => {
    //ebugger;

    const [countryname, setcountryname] = useState("");
    const [countryDialCode, setcountryDialCode] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    function toggle() {
        props.closeNewmodal();
    }

    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.CountryId > 0) {

                var data = await GetSetupMaster(0, 0, "", props.CountryId);
                if (data.response === true && data.data != null) {
                    //         
                    setcountryname(data.data[0].SetupDetailName)

                    setcountryDialCode(data.data[0].Flex1)
                }
                else {
                    //  setUserList([]);
                }
            }
        };

        load();


    }, []);

    async function AddUpdateCountry(e) {
        try {
            e.preventDefault();
            setFormLoading(true)
            if (countryname != "") {


                var CountryId = 0;
                CountryId = props.CountryId > 0 ? props.CountryId : 0;
                var UserId = localStorage.getItem('UserId');
                var UserIp = localStorage.getItem('UserIP');
                let RequestData;
                let data;



                if (CountryId === 0) ///Insert Operation
                {
                    data = await InsertSetupDetail(SetupMasterIds.Country, 0, countryname, countryDialCode, "", "", UserId, UserIp);
                }
                else if (CountryId !== 0) {
                    data = await UpdateSetupDetail(SetupMasterIds.Country, 0, CountryId, countryname, countryDialCode, "", "", UserId);
                }


                //     
                if (data.response === true && data.data != null) {
                    if (data.data[0].HasError === 1) {
                        // alert(data.data[0].Message);
                        Swal.fire({ title: 'Error', text: data.data[0].Message, icon: 'error' });
                    }
                    else {

                        e.preventDefault();
                        props.ReBindGrid(SetupMasterIds.Country, 0, "", 0);

                        // CountryId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                        CountryId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });

                        setcountryname("");
                        setcountryDialCode("");
                        //toggle();
                    }
                }
                else {
                    //alert("Error");
                    Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon: 'error' });
                }
            }
            else {
                Swal.fire({ title: 'Error', text: "Enter Country Name.", icon: 'error' });
            }
            setFormLoading(false)
        } catch (error) {
          
        }
    }
    //  function AllowAlphabatic(inputtxt)
    //  {
    //       if (/^[a-zA-z\s]+$/.test(inputtxt))
    //       {
    //           //console.log(!/[^a-zA-Z]/.test(inputtxt));
    //           return inputtxt;
    //       }else{
    //           return inputtxt.splice(-1,1);
    //       }
    //  }

    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateCountry}>
                <ModalHeader
                    toggle={toggle}>{props.HeaderText}</ModalHeader>
                <ModalBody>

                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Country Name</Label>
                                <Input
                                    placeholder="Country Name"
                                    type="text"
                                    required={true}
                                    name="countryname"
                                    onChange={(e) => setcountryname(AllowAlphabatic(e.target.value))}
                                    value={countryname}
                                    autoComplete="off"
                                    maxLength="50"
                                //pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
                                />
                            </FormGroup>
                        </Col>

                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Country Dialing Code</Label>
                                <Input
                                    placeholder="Country Dialing Code"
                                    type="text"
                                    required={true}
                                    name="countryCode"
                                    onChange={(e) => setcountryDialCode(e.target.value)}
                                    value={countryDialCode}
                                    autoComplete="off"
                                    maxLength="4"
                                //pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
                                />
                            </FormGroup>
                        </Col>


                    </Row>

                </ModalBody>
                <ModalFooter>
                    <FormGroupButton
                        title='Save'
                        type='submit'
                        loading={formLoading}
                    />
                    <Button color="secondary" size="sm" onClick={toggle}>Close</Button>
                </ModalFooter>
            </form>
        </Modal>

    );
}

export default ModalCountry;