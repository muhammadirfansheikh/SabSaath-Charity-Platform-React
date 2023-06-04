import React, { useEffect, useState } from "react"
import { Card, CardBody, Row, Col, Form } from "reactstrap"
import {
  AllowAlphabatic,
  MarketingContentController,
  NGOController,
} from "../utils/CommonMethods.js"
import Swal from "sweetalert2"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx"
import AdsModule from "components/MarketinContentModule/AdsModule.jsx"
import useApiCallOnMount from "hooks/useApiCallOnMount.js"
import ApiStateHandler from "components/GeneralComponent/ApiStatusHandler.jsx"
import { MarketingContentModules } from "utils/Constants.js"
import ImpactStripModule from "components/MarketinContentModule/ImpactStripModule.jsx"

const NoModule = () => {
  return (
    <div className="text-center">
      <h3>No Module Selected</h3>
    </div>
  )
}

const GetModules = async () => {
  var { data } = await MarketingContentController(1)
  return data.DataSet.Table
}

const MarketingContentModule = (props) => {
  const [loading, data, error] = useApiCallOnMount(GetModules)
  const initialValues = {
    ActiveModule: 0,
  }

  const [values, setValues] = useState(initialValues)
  const [activeModule, setActiveModule] = useState(null)

  const ActiveComponent = {
    0: <NoModule />,
    [MarketingContentModules.AdsModule] : <AdsModule activeModule={activeModule} />,
    [MarketingContentModules.ImpactStrip] : <ImpactStripModule activeModule={activeModule} />,
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target
    const activeModule = data.find((x) => x.SetupDetailId == value)

    setActiveModule(activeModule)
    setValues({
      ...values,
      [name]: value,
    })
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col lg={12} md={12}>
            <Card className="card-user">
              <CardBody>
                <ApiStateHandler loading={loading} error={error}>
                  {data && (
                    <Form>
                      <Row form>
                        <Col md={3}>
                          <FormGroupSelect
                            label="Web Module"
                            name="ActiveModule"
                            value={values.ActiveModule}
                            onChange={(e) => {
                              handleInputChange(e)
                            }}
                            list={data}
                            fieldId="SetupDetailId"
                            fieldName="SetupDetailName"
                            required={true}
                          />
                        </Col>
                      </Row>
                    </Form>
                  )}
                </ApiStateHandler>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {!values.ActiveModule ? (
          <NoModule />
        ) : (
          ActiveComponent[activeModule?.SetupDetailId]
        )}
      </div>
    </>
  )
}

export default MarketingContentModule
