import React, { useState } from "react"
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
} from "reactstrap"
import { AllowAlphabatic, NGOController } from "../utils/CommonMethods.js"

import Swal from "sweetalert2"
import Modal_NGO from "components/modal/ModalNGO.jsx"

const NGOs = (props) => {
  const initialValues = {
    NGOName: "",
  }

  const [values, setValues] = useState(initialValues)
  const [ngoList, setNGOList] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [NGOEditID, setNGOEditId] = useState(0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let values = e.target.value

    if (e.target.getAttribute("isalphabetic") === "true") {
      values = AllowAlphabatic(e.target.value)
    }

    setValues({
      ...values,
      [name]: values,
    })
  }

  React.useEffect(() => {
    // need to define the function and call it separately
    const load = async () => {
      resetFormelement()
    }
    load()
  }, [])

  const onEdit = ({ NGOFeatureID }) => {
    openNewmodal(NGOFeatureID)
  }

  const resetFormelement = async () => {
    ReBindGrid()
  }
  const onDelete = async ({ NGOFeatureID }) => {
    var UserId = localStorage.getItem("UserId")
    var deleteData = await NGOController(
      0,
      3,
      null,
      null,
      null,
      null,
      null,
      NGOFeatureID,
      UserId
    )
    if (deleteData) {
      if (deleteData[0].haserror === 1) {
        Swal.fire({
          title: "Error",
          text: deleteData[0].Message,
          icon: "error",
        })
      } else {
        Swal.fire({
          title: "Success",
          text: "Deleted Successfully",
          icon: "success",
        })
      }
    }
    resetFormelement()
  }

  const handleSearchClick = async (e) => {
    e.preventDefault()
    ReBindGrid(values.NGOName)
  }

  const handleCancelClick = async (e) => {
    e.preventDefault()
    resetFormelement()
    setValues(initialValues)
  }

  const ReBindGrid = async (NGOName = null) => {
    var data = await NGOController(0, 4, NGOName)

    setNGOList(data)
  }
  const openNewmodal = (NGOFeatureID) => {
    setNGOEditId(NGOFeatureID)
    setOpenModal(true)
  }
  const closeNewmodal = () => {
    setOpenModal(false)
    setNGOEditId(0)
    resetFormelement()
    setValues(initialValues)
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col lg={12} md={12}>
            <Card className="card-user">
              <CardBody>
                <Form onSubmit={handleSearchClick}>
                  <Row form>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="">NGO Name</Label>
                        <Input
                          type="text"
                          onChange={handleInputChange}
                          name="NGOName"
                          value={values.NGOName}
                          maxLength="50"
                          autoComplete="off"
                          isalphabetic="true"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={12} className="text-right">
                      <Button
                        color="primary"
                        size="sm"
                        className="mr-2"
                        onClick={handleSearchClick}
                      >
                        Search
                      </Button>
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </Button>
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
                    NGO List
                  </Col>
                  <Col lg={6} md={6} className="text-right">
                    <Button
                      color="primary2"
                      size="sm"
                      className="m-0"
                      onClick={() => openNewmodal(0)}
                    >
                      Add New
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Bank</th>
                      <th>Account #</th>
                      <th className="text-center" style={{ width: 150 }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ngoList &&
                      ngoList.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.Heading}</td>
                          <td>{item.Description}</td>
                          <td>{item.BankName}</td>
                          <td>{item.AccountNo}</td>

                          <td className="text-center">
                            <Button
                              color="primary"
                              className="btn-circle"
                              size="sm"
                              onClick={(e) =>
                                onEdit({ NGOFeatureID: item.NGOFeatureID })
                              }
                            >
                              <i className="nc-icon nc-ruler-pencil"></i>
                            </Button>
                            <Button
                              color="danger"
                              className="btn-circle"
                              size="sm"
                              onClick={() =>
                                onDelete({ NGOFeatureID: item.NGOFeatureID })
                              }
                            >
                              <i className="nc-icon nc-simple-remove"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {openModal && (
          <Modal_NGO
            {...props}
            HeaderText="Add/Edit NGO"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            NGOId={NGOEditID}
            ReBindGrid={ReBindGrid}
          />
        )}
      </div>
    </>
  )
}

export default NGOs
