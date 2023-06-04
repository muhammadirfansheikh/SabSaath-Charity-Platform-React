import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import Swal from "sweetalert2";
import FormGroupButton from "components/GeneralComponent/FormGroupButton";

import * as api from "../../utils/Api.js";
import FormGroupCheckbox from "components/GeneralComponent/FormGroupCheckbox.jsx";
import { useHistory } from "react-router-dom";



const ManageEmailNotification = (props) => {

  const initialValues = {
    EmailRecive: 0,
  };
  const history = useHistory();
  const [formFields, setFormFields] = useState({ ...initialValues });
  const [countryddl, setCountryddl] = useState([]);

  useEffect(() => {  
    api
      .fetchData("WebSite", "Managed_EmailNotifications", {
        OperationID: "2",
        Userid: localStorage.getItem('UserId'),
        UserIP: localStorage.getItem('UserIP'),
      })
      .then((result) => { 
        if (result?.DataSet?.Table[0]?.haserror > 0) {
          Swal.fire({
            title: "Error",
            text: result.DataSet.Table[0].Message,
            icon: "error",
          });
          return;
        }
        else { 
          localStorage.removeItem("_emailrecieve")
           
            if(result?.DataSet?.Table[0].ReciveEmail == true){
              setFormFields({
                ...formFields,
                EmailRecive: 1
              })
            }
            else{
              setFormFields({
                ...formFields,
                EmailRecive: 0
              })
            } 
           
         
        }
      });
  }, []);

  const handleInputChange = (event) => {

    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };


  const Save_Record = async (e) => {
    e.preventDefault();
    api
      .fetchData("WebSite", "Managed_EmailNotifications", {
        OperationID: "1",
        EmailRecive: formFields.EmailRecive == true ? 1 : 0,
        Userid: localStorage.getItem('UserId'),
        UserIP: localStorage.getItem('UserIP'),
      })
      .then((result) => {
        if (result?.DataSet?.Table[0]?.haserror > 0) {
          Swal.fire({
            title: "Error",
            text: result.DataSet.Table[0].Message,
            icon: "error",
          });
          return;
        }
        else {
          Swal.fire({
            title: "Success",
            text: result.DataSet.Table[0].Message,
            icon: "success",
          });
        }
      });
  }

  return (
    <div>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Manage Email Notifications</h6>
        </CardHeader>
        <CardBody>
          <form>
            <Row>
              <Col md={3}>
                <FormGroupCheckbox
                  label="Receive Emails"
                  name="EmailRecive"
                  value={formFields.EmailRecive}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <FormGroupButton
                  title="Update Preference "
                  type="submit"
                  className="p-2"
                  onClick={(e) => Save_Record(e)}
                />
              </Col>

              {/* <Col md={6}>
                    <FormGroupButton
                      title="Cancel"
                      type="submit"
                      className="p-2"
                  />
                </Col> */}
            </Row>
          </form>
        </CardBody>
      </Card>


    </div>
  );
};

export default ManageEmailNotification;
