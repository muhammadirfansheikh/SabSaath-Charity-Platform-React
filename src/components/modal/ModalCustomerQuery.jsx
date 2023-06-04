import React, { useState } from "react"
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
} from "reactstrap"
import { fetchData } from "../../utils/Api.js"
import {
  GetSetupMaster,
  InsertSetupDetail,
  UpdateSetupDetail,
  AllowAlphabatic,
  NGOController,
} from "../../utils/CommonMethods.js"
import {
  ApiMethods,
  ControllerName,
  OperationTypeId,
  SetupMasterIds,
} from "../../utils/Constants.js"
import Swal from "sweetalert2"
import FormGroupButton from "../GeneralComponent/FormGroupButton.jsx"

export const ModalCustomerQuery = (props) => {
  const UserID = localStorage.getItem("UserId")
  const initialValues = {
    NGOName: "",
    NGODescription: "",
    BankName: "",
    AccountNo: "",
  }

  const [state, setState] = useState(initialValues)
  const [formLoading, setFormLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let values = e.target.value
    if (e.target.getAttribute("isalphabetic") === "true") {
      values = AllowAlphabatic(e.target.value)
    }

    setState({
      ...state,
      [name]: values,
    })
  }
  function toggle() {
    props.closeNewmodal()
  }

  React.useEffect(() => {
    // need to define the function and call it separately
    const load = async () => {
      if (props.NGOId) {
        var data = await NGOController(
          0,
          4,
          null,
          0,
          null,
          null,
          null,
          props.NGOId,
          UserID
        )
        if (data && data.length > 0) {
          resetModalFormelement()
          setState((prevState) => ({
            ...prevState,
            BankName: data[0].BankName,
            NGODescription: data[0].Description,
            NGOName: data[0].Heading,
            AccountNo: data[0].AccountNo,
            ...data[0],
          }))
        } else {
        }
      } else {
        resetModalFormelement()
      }
    }

    load()
  }, [])
  const resetModalFormelement = async () => {
    // props.ReBindGrid(SetupMasterIds.NGO, 0, "", 0)
  }

  async function AddUpdateNGO(e) {
    try {
      e.preventDefault()
      setFormLoading(true)
      if (
        !state.NGOName ||
        !state.NGODescription ||
        !state.BankName ||
        !state.AccountNo
      ) {
        return Swal.fire({
          title: "Error",
          text: "Please fill all fields.",
          icon: "error",
        })
      }

      var NGOId = props.NGOId ? props.NGOId : 0
      let data

      if (!NGOId) {
        ///Insert Operation
        data = await NGOController(
          0,
          1,
          state.NGOName,
          0,
          state.NGODescription,
          state.BankName,
          state.AccountNo,
          0,
          UserID
        )
      } else if (NGOId !== 0) {
        data = await NGOController(
          0,
          2,
          state.NGOName,
          0,
          state.NGODescription,
          state.BankName,
          state.AccountNo,
          state.NGOFeatureID,
          UserID
        )
      }

      if (data && data.length > 0 && data[0].haserror === 0) {
        if (!NGOId) {
          setFormLoading(false)

          return Swal.fire({
            title: "Success",
            text: "Added Successfully",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              setState(initialValues)
              toggle()
            }
          })
        } else {
          setFormLoading(false)
          return Swal.fire({
            title: "Success",
            text: "Updated Successfully",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              setState(initialValues)
              toggle()
            }
          })
        }
      }

      if (data && data.length > 0 && data[0].haserror === 1) {
        if (data.data[0].haserror === 1) {
          // alert(data.data[0].Message);
          Swal.fire({
            title: "Error",
            text: data.data[0].Message,
            icon: "error",
          })
        } else {
          e.preventDefault()

          // props.ReBindGrid(SetupMasterIds.Category, 0, "", 0)
          //ReligionId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;

          setState(initialValues)
          //toggle();
        }
      } else {
        //alert("Error");
        Swal.fire({
          title: "Error",
          text: "Some Thing Went Wrong",
          icon: "error",
        })
      }

      setFormLoading(false)
    } catch (error) {}
  }
  return (
    <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
      <form onSubmit={AddUpdateNGO}>
        <ModalHeader toggle={toggle}>{props.HeaderText}</ModalHeader>
        <ModalBody>
          <Row form>
            <Col className="px-1" md="12">
              <FormGroup>
                <Label>NGO Name</Label>
                <Input
                  placeholder="NGO Name"
                  type="text"
                  name="NGOName"
                  maxLength="50"
                  autoComplete="off"
                  isalphabetic="true"
                  onChange={handleInputChange}
                  value={state.NGOName}
                  required={true}
                />
              </FormGroup>
            </Col>
            <Col className="px-1" md="12">
              <FormGroup>
                <Label>NGO Description</Label>
                <Input
                  placeholder="NGO Description"
                  type="textarea"
                  name="NGODescription"
                  maxLength="400"
                  autoComplete="off"
                  isalphabetic="true"
                  onChange={handleInputChange}
                  value={state.NGODescription}
                  required={true}
                />
              </FormGroup>
            </Col>
            <Col className="px-1" md="12">
              <FormGroup>
                <Label>Bank Name</Label>
                <Input
                  placeholder="Bank Name"
                  type="text"
                  name="BankName"
                  autoComplete="off"
                  onChange={handleInputChange}
                  value={state?.BankName}
                  required={true}
                />
              </FormGroup>
            </Col>
            <Col className="px-1" md="12">
              <FormGroup>
                <Label>Account No.</Label>
                <Input
                  placeholder="Account No."
                  type="number"
                  name="AccountNo"
                  maxLength="16"
                  autoComplete="off"
                  isalphabetic="false"
                  onChange={handleInputChange}
                  value={state?.AccountNo}
                  required={true}
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <FormGroupButton title="Save" type="submit" loading={formLoading} />
          <Button color="secondary" size="sm" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default ModalCustomerQuery
