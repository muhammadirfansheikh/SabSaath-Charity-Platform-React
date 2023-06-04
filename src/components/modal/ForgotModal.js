import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  FormGroup,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { fetchData } from "../../utils/Api.js";
import { ApiMethods, ControllerName } from "../../utils/Constants.js";
import Swal from "sweetalert2";
import { validateEmail } from "utils/CommonMethods.js";
import * as api from "../../utils/Api.js";

export const ForgotModal = (props) => {
  const [userName, setuserName] = useState("");
  const [error, seterror] = useState(null);
  function toggle() {
    setuserName("");
    props.closeForgotmodal();
  }

  
 const requestCall = async (e) => { 
      if(userName   != "")
      {
        let checkEmail =  validateEmail(userName)
        if(checkEmail === null)
            {
                Swal.fire({ title: 'Error', text: "Invalid Email format", icon: 'error' });
            return;
        }
        // Swal.fire({
        //   customClass: {
        //     container: "my-swal",
        //   },
        //   text: "Are you sure to reset the password?",
        //   icon: "success",
        //   showCancelButton: true,
        //   cancelButtonText: `Cancel`,
        //   cancelButtonColor: "#2f4050",
        //   confirmButtonText: `Confirm`,
        //   confirmButtonColor: "#bf1e2e",
        // }).then((result) => {
        //   if (result.isConfirmed) {
       api 
            .fetchData("WebSite", "Donor_WebSite_Register", {
                 OperationID: "3", //Forget Password 
                 FirstName:    "",
                 LastName:     "",
                 EmailAddress: userName,
                 PhoneNo: "",
                 Address:"",
                 CityId : "0",
                 CountryId : "0",
                 NewPassword:    "",
                 DonorId:    "0",
                 UserIP:  localStorage.getItem('UserIP'), 
                URL: api.baseApplicationUrl +"/ResetPassword"

                
            })
            .then((result) => { 
              if (result?.DataSet?.Table[0]?.haserror > 0){ 
                Swal.fire({ title: 'Error', text:  result?.DataSet?.Table[0]?.ERRORMESSAGE, icon: 'error' });
                
                return;
              }
              else
              {
                 Swal.fire({ title: 'Success', text:  result.DataSet.Table[0]?.MESSAGE, icon: 'success' });
              }
           });
        //   }
        // });

      }
      else
      {
        Swal.fire({ title: "Error", text: "Enter your email address", icon: "error" });
      }




   
  };

  async function SendPasswordToEmail() {
    requestCall();
    // if (userName != "") 
    // {
    //   let checkEmail =  validateEmail(userName)
    //   if(checkEmail === null)
    //       {
    //           Swal.fire({ title: 'Error', text: "Invalid Email format", icon: 'error' });
    //       return;
    //   }
    //   var data = { Name: userName, UserIP: "sdf" };
    //   var result = await fetchData(
    //     ControllerName.User,
    //     ApiMethods.ForgetPasswordAutoGenerated,
    //     data
    //   );
    //   //var result = await fetchData(ApiMethods.ForgotPassword, data);

    //   if (result.response === true) {
    //     if (result.data[0].haserror === 0) {
    //       toggle();
    //       Swal.fire({
    //         title: "Success",
    //         text: result.data[0].MESSAGE,
    //         icon: "success",
    //       });
    //     } else {
    //       Swal.fire({
    //         title: "Error",
    //         text: result.data[0].MESSAGE,
    //         icon: "error",
    //       });
    //     }
    //   } else {
    //     seterror(result);

    //     Swal.fire({
    //       title: "Error",
    //       text: result.responseMessage,
    //       icon: "error",
    //     });
    //   }
    // } else {
    //   Swal.fire({ title: "Error", text: "Enter your email address", icon: "error" });
    // }
  }

  const  handleKeyPress = (event) => {
   if(event.key === 'Enter'){
      event.preventDefault();
      requestCall()
    }
  }

  return (
    <Modal isOpen={props.Ismodalshow} toggle={toggle}>
      <ModalHeader toggle={toggle}>{props.HeaderText}</ModalHeader>
      <ModalBody>
        <Form>
          {error && <p>{error.ResponseMessage}</p>}
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Input
                  type="email"
                  name="userName"
                  placeholder="Enter Username"
                  className="form-control"
                  onChange={(e) => setuserName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" size="sm" onClick={SendPasswordToEmail}>
        Send Password Reset Email
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ForgotModal;