import React, { useState } from "react"
import { Card, CardHeader, CardBody, Table, Row, Col, Button } from "reactstrap"
import {
  AdsController,
  AllowAlphabatic,
  MarketingContentController,
  NGOController,
} from "utils/CommonMethods.js"

import Swal from "sweetalert2"
import useApiCallOnMount from "hooks/useApiCallOnMount"
import ApiStateHandler from "components/GeneralComponent/ApiStatusHandler"
import ModalAds from "components/modal/ModalAds"
import { useEffect } from "react"
import moment from "moment"

const AdsModule = (props) => {
  var UserId = localStorage.getItem("UserId")
  var UserIp = localStorage.getItem("UserIP")
  const initialValues = {
    ActiveModule: "",
  }
  const GetAds = async () => {
    try {
      var { data } = await MarketingContentController(
        2,
        0,
        props.activeModule.SetupDetailId
      )
      if (data) {
        return data.DataSet.Table
      } else {
        return []
      }
    } catch (error) {
      throw new Error("Something went wrong")
    }
  }
  const [refresh, setRefresh] = useState(false)
  let [loading, data, error] = useApiCallOnMount(GetAds, refresh)
  const [ads, setAds] = useState([])
  const [maxOrder, setMaxOrder] = useState(0)
  const [values, setValues] = useState(initialValues)
  const [openModal, setOpenModal] = useState(false)
  const [editItem, setEditItem] = useState(0)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    setAds(data)
  }, [data])

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

  const onEdit = (item) => {
    openNewmodal(item)
    setIsEdit(true)
  }

  useEffect(() => {
    if (data) {
      var maxOrder = Math.max.apply(
        Math,
        data.map(function (o) {
          return o.Content_Position
        })
      )

      // Check if maxorder is infinity then set it to 1
      if (maxOrder === Infinity || maxOrder === -Infinity) {
        maxOrder = 1
      } else {
        maxOrder = maxOrder + 1
      }

      setMaxOrder(maxOrder)
    }
  }, [data])

  const resetFormelement = async () => {
    ReBindGrid()
    setRefresh(!refresh)
  }
  const onDelete = async ({ Content_ID }) => {
    var { status } = await MarketingContentController(
      5,
      Content_ID,
      0,
      null,
      null,
      0,
      false,
      false,
      false,
      UserId,
      UserIp
    )
    if (status === 200) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        confirmButtonText: "Ok",
      })
    }
    resetFormelement()
  }

  const ReBindGrid = async () => {
    // window.location.reload()
    const res = await GetAds()
    setAds(res)
  }
  const openNewmodal = (item) => {
    if (item) {
      setEditItem(item)
      setIsEdit(true)
    } else {
      setEditItem(null)
      setIsEdit(false)
    }
    setOpenModal(true)
  }
  const closeNewmodal = () => {
    setOpenModal(false)
    setEditItem(null)
    setIsEdit(false)
    resetFormelement()
    setValues(initialValues)
  }

  return (
    <>
      <Row>
        <Col lg={12} md={12}>
          <Card>
            <CardHeader>
              <Row>
                <Col lg={6} md={6}>
                  Ads Content List
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
            <ApiStateHandler loading={loading} error={error}>
              <CardBody>
                <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Order</th>
                      <th>Content Code</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Type</th>
                      <th>Display</th>
                      <th>Updated on</th>
                      <th className="text-center" style={{ width: 150 }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ads &&
                      ads.length > 0 &&
                      ads.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item?.Content_Position}</td>
                          <td>{item?.Content_Code}</td>
                          <td>{item?.Content_Title}</td>
                          <td>
                            {
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item?.Content_Description.substring(
                                    0,
                                    50
                                  ),
                                }}
                              />
                            }
                          </td>
                          <td>
                            {item?.Content_MediaType
                              ? item?.VideoURL
                                ? "Video"
                                : "Image"
                              : "Text"}
                          </td>
                          <td>
                            {item?.Content_Display ? "Active" : "Inactive"}
                          </td>
                          <td>
                            {item?.ModifiedDate
                              ? moment(item?.ModifiedDate).format("DD/MM/YYYY")
                              : ""}
                          </td>

                          <td className="text-center">
                            <Button
                              color="primary"
                              className="btn-circle"
                              size="sm"
                              onClick={(e) => onEdit(item)}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i>
                            </Button>
                            {/* <Button
                              color="danger"
                              className="btn-circle"
                              size="sm"
                              onClick={() =>
                                onDelete({ Content_ID: item.Content_ID })
                              }
                            >
                              <i className="nc-icon nc-simple-remove"></i>
                            </Button> */}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </ApiStateHandler>
          </Card>
        </Col>
      </Row>
      {openModal && (
        <ModalAds
          {...props}
          HeaderText="Add/Edit"
          Ismodalshow={openModal}
          closeNewmodal={closeNewmodal}
          editItem={editItem}
          ReBindGrid={ReBindGrid}
          isEdit={isEdit}
          activeModule={props.activeModule}
          maxOrder={maxOrder}
        />
      )}
    </>
  )
}

export default AdsModule
