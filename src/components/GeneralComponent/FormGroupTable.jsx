import React from "react"
import { Button, Table } from "reactstrap"
import { element, array, bool, string } from "prop-types"

const FormGroupTable = (props) => {
  return (
    <>
      <Table bordered striped responsive>
        <thead>
          <tr>
            <th>Sr.</th>
            {props?.columns &&
              props.columns.map((column, index) => (
                <th key={index}>{column.name}</th>
              ))}
            {props.hideAction === true ? null : (
              <th className="text-center" style={{ width: 150 }}>
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {props?.rows &&
            props?.rows?.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {props?.columns &&
                  props.columns.map((column, ind) => (
                    <td key={ind}>{row[column.field]}</td>
                  ))}
                {props.hideAction === true ? null : (
                  <td className="text-center">
                    {props.onView && (
                      <Button
                        color="danger"
                        className="btn-circle"
                        size="sm"
                        onClick={() => props.onView(index, row)}
                      >
                        <i className="nc-icon nc-zoom-split"></i>
                      </Button>
                    )}
                    {props.onDownload && (
                      <Button
                        color="primary"
                        className="btn-circle"
                        size="sm"
                        onClick={() => props.onDownload(index, row)}
                      >
                        {props.customDownloadIcon ? (
                          props.customDownloadIcon
                        ) : (
                          <i class="nc-icon nc-cloud-download-93"></i>
                        )}
                      </Button>
                    )}
                    {props.onEdit && (
                      <Button
                        color="primary"
                        className="btn-circle"
                        size="sm"
                        onClick={() => props.onEdit(index, row)}
                      >
                        <i className="nc-icon nc-ruler-pencil"></i>
                      </Button>
                    )}
                    {props.onDelete && (
                      <Button
                        color="danger"
                        className="btn-circle"
                        size="sm"
                        onClick={() => props.onDelete(index)}
                      >
                        <i className="nc-icon nc-simple-remove"></i>
                      </Button>
                    )}
                    {
                      props.customField && props.customField(row, index)
                      // <Button
                      //   color="warning"
                      //   outline
                      //   size="sm"
                      //   onClick={() => props.onDynamic1(index, row)}
                      // >
                      //   {props.ButtonText1}
                      // </Button>
                    }
                    {props.onDynamic && (
                      <Button
                        color="danger"
                        outline
                        size="sm"
                        onClick={() => props.onDynamic(index, row)}
                      >
                        {props.ButtonText}
                      </Button>
                    )}
                    {props.onDynamic1 && (
                      <Button
                        color="warning"
                        outline
                        size="sm"
                        onClick={() => props.onDynamic1(index, row)}
                      >
                        {props.ButtonText1}
                      </Button>
                    )}
                  </td>
                )}
                {props.action && <td>{props.action}</td>}
              </tr>
            ))}
        </tbody>
      </Table>
      {props?.rows && props.rows.length === 0 && (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            background: "#e9e9e9",
            marginTop: -30,
            padding: 20,
            fontWeight: "bold",
          }}
        >
          No Data Available
        </div>
      )}
    </>
  )
}

FormGroupTable.propTypes = {
  rows: array,
  columns: array,
  action: element,
  hideAction: bool,
  customDownloadIcon: element,
}

export default FormGroupTable
