import React, { useState, useRef } from "react";
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
import {
  GetSetupMaster,
  InsertSetupDetail,
  UpdateSetupDetail,
  AllowAlphabatic,
} from "../../utils/CommonMethods.js";
import {
  ApiMethods,
  ControllerName,
  OperationTypeId,
  SetupMasterIds,
} from "../../utils/Constants.js";
import Swal from "sweetalert2";
import FormGroupButton from "../GeneralComponent/FormGroupButton.jsx";

export const Modal_Area = (props) => {
  const initialValues = {
    AreaName: "",
    CountryValue: "0",
    ProvinceValue: "0",
    CityValue: "0",
    DistrictValue: "0",
    UnionValue: "0",
  };

  const [values, setValues] = useState(initialValues);
  const [formLoading, setFormLoading] = useState(false);
  const [Modalcountryddl, setModalcountryddl] = useState([]);
  const [Modalprovinceddl, setModalprovinceddl] = useState([]);
  const [Modalcityddl, setModalcityddl] = useState([]);
  const [Modaldistrictddl, setModaldistrictddl] = useState([]);
  const [Modalunionddl, setModalunionddl] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let _values = e.target.value;

    if (e.target.getAttribute("isalphabetic") === "true") {
      _values = AllowAlphabatic(e.target.value);
    }

    setValues({
      ...values,
      [name]: _values,
    });
  };
  function toggle() {
    props.closeNewmodal();
  }

  React.useEffect(() => {
    // need to define the function and call it separately
    const load = async () => {
      if (props.AreaId > 0) {
        var data = await GetSetupMaster(0, 0, "", props.AreaId);
        if (data.response === true && data.data != null) {
          let union = await GetSetupMaster(0, 0, "", data.data[0].ParentId);
          let districtId = union.data[0].ParentId;

          let district = await GetSetupMaster(0, 0, "", districtId);
          let cityId = district.data[0].ParentId;

          let city = await GetSetupMaster(0, 0, "", cityId);
          let provinceId = city.data[0].ParentId;

          let province = await GetSetupMaster(0, 0, "", provinceId);
          let countryId = province.data[0].ParentId;

          resetModalFormelement(countryId, provinceId, cityId, districtId);

          setValues((prevState) => ({
            ...prevState,
            AreaName: data.data[0].SetupDetailName,
            CountryValue: countryId,
            ProvinceValue: provinceId,
            CityValue: cityId,
            DistrictValue: districtId,
            UnionValue: data.data[0].ParentId,
          }));
        } else {
        }
      } else {
        resetModalFormelement(-1, -1, -1, -1);
      }
    };

    load();
  }, []);
  const resetModalFormelement = async (
    loadCountryId = -1,
    loadProvinceId = -1,
    loadCityId = -1,
    loadDistrictId = -1
  ) => {
    props.ReBindGrid(SetupMasterIds.Village_Muhalla, 0, "", 0);

    let ddlCountryData = await props.GetCountry();
    let ddlProvinceData = await props.GetProvince(loadCountryId);
    let ddlCityData = await props.GetCity(loadProvinceId);
    let ddlDistrictData = await props.GetDistrict(loadCityId);
    let ddlUnionData = await props.GetUnion(loadDistrictId);

    setModalcountryddl(ddlCountryData.data);
    setModalprovinceddl(ddlProvinceData.data);
    setModalcityddl(ddlCityData.data);
    setModaldistrictddl(ddlDistrictData.data);
    setModalunionddl(ddlUnionData.data);
  };

  const handleModalCountryChangeEvent = async (e) => {
    handleInputChange(e);
    let data = await props.GetProvince(e.target.value);
    setModalprovinceddl(data.data);
  };

  const handleModalProvinceChangeEvent = async (e) => {
    handleInputChange(e);
    let data = await props.GetCity(e.target.value);
    setModalcityddl(data.data);
  };

  const handleModalCityChangeEvent = async (e) => {
    handleInputChange(e);
    let data = await props.GetDistrict(e.target.value);
    setModaldistrictddl(data.data);
  };

  const handleModalDistrictChangeEvent = async (e) => {
    handleInputChange(e);
    let data = await props.GetUnion(e.target.value);
    setModalunionddl(data.data);
  };

  async function AddUpdateArea(e) {
    try {
      setFormLoading(true);

      e.preventDefault();

      if (values.AreaName != "") {
        var AreaId = 0;
        AreaId = props.AreaId > 0 ? props.AreaId : 0;
        var UserId = localStorage.getItem("UserId");
        var UserIp = localStorage.getItem("UserIP");
        let RequestData;
        let data;

        if (AreaId === 0) {
          ///Insert Operation 
          // let union = Modalunionddl.filter(
          //   (x) => x.ParentId == values.DistrictValue
          // )[0].SetupDetailId;
          let union = values.DistrictValue;
          data = await InsertSetupDetail(
            SetupMasterIds.Village_Muhalla,
            union,
            values.AreaName,
            "",
            "",
            "",
            UserId,
            UserIp
          );
        } else if (AreaId !== 0) {
          data = await UpdateSetupDetail(
            SetupMasterIds.Village_Muhalla,
            values.UnionValue,
            AreaId,
            values.AreaName,
            "",
            "",
            "",
            UserId,
            UserIp
          );
        } 
        if (data.response === true && data.data != null) {
          if (data.data[0].HasError === 1) {
            Swal.fire({
              title: "Error",
              text: data.data[0].Message,
              icon: "error",
            });
          } else {
            e.preventDefault();
            props.ReBindGrid(SetupMasterIds.Village_Muhalla, 0, "", 0); 
            AreaId === 0
              ? Swal.fire({
                title: "Success",
                text: "Added Successfully",
                icon: "success",
              })
              : Swal.fire({
                title: "Success",
                text: "Updated Successfully",
                icon: "success",
              });

            setValues(initialValues);
            ///toggle();
          }
        } else { 
          Swal.fire({
            title: "Error",
            text: "Some Thing Went Wrong",
            icon: "error",
          });
        }
      } else { 
        Swal.fire({
          title: "Error",
          text: "Please Enter Area Name",
          icon: "warning",
        });
      }

      setFormLoading(false);
    } catch (error) { 
    }
  }
  return (
    <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
      <form onSubmit={AddUpdateArea}>
        <ModalHeader toggle={toggle}>{props.HeaderText}</ModalHeader>
        <ModalBody>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="">Country</Label>
                <Input
                  id="exampleSelect"
                  name="CountryValue"
                  type="select"
                  required={true}
                  value={values.CountryValue}
                  onChange={handleModalCountryChangeEvent}
                >
                  <option key={0} value={0}>
                    Select
                  </option>

                  {Modalcountryddl.map((item, key) => (
                    <option
                      key={item.SetupDetailName}
                      value={item.SetupDetailId}
                    >
                      {item.SetupDetailName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="">Province</Label>
                <Input
                  id="exampleSelect"
                  name="ProvinceValue"
                  type="select"
                  required={true}
                  value={values.ProvinceValue}
                  onChange={handleModalProvinceChangeEvent}
                >
                  <option key={0} value={0}>
                    Select
                  </option>

                  {Modalprovinceddl.map((item, key) => (
                    <option
                      key={item.SetupDetailName}
                      value={item.SetupDetailId}
                    >
                      {item.SetupDetailName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="">City</Label>
                <Input
                  id="exampleSelect"
                  name="CityValue"
                  type="select"
                  required={true}
                  value={values.CityValue}
                  onChange={handleModalCityChangeEvent}
                >
                  <option key={0} value={0}>
                    Select
                  </option>

                  {Modalcityddl.map((item, key) => (
                    <option
                      key={item.SetupDetailName}
                      value={item.SetupDetailId}
                    >
                      {item.SetupDetailName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="">District</Label>
                <Input
                  id="exampleSelect"
                  name="DistrictValue"
                  type="select"
                  required={true}
                  value={values.DistrictValue}
                  onChange={handleModalDistrictChangeEvent}
                >
                  <option key={0} value={0}>
                    Select
                  </option>

                  {Modaldistrictddl.map((item, key) => (
                    <option
                      key={item.SetupDetailName}
                      value={item.SetupDetailId}
                    >
                      {item.SetupDetailName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>

            <Col md={6} style={{ display: "none" }}>
              <FormGroup>
                <Label for="">Union</Label>
                <Input
                  id="exampleSelect"
                  name="UnionValue"
                  type="select"
                  value={values.UnionValue}
                  required={true}
                  onChange={handleInputChange}
                >
                  {/* <option key={0} value={0}>
                                        Select
                                    </option> */}

                  {Modalunionddl.map((item, key) => (
                    <option
                      key={item.SetupDetailName}
                      value={item.SetupDetailId}
                    >
                      {item.SetupDetailName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>

            <Col className="px-1" md="6">
              <FormGroup>
                <Label>Area Name</Label>
                <Input
                  placeholder="Area Name"
                  type="text"
                  name="AreaName"
                  isalphabetic="true"
                  onChange={handleInputChange}
                  value={values.AreaName}
                  maxLength="50"
                  autoComplete="off"
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
  );
};

export default Modal_Area;
