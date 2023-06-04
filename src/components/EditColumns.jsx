import React, { useEffect } from "react"
import { useRef } from "react"
import Draggable from "react-draggable"
import { Modal, ModalBody, ModalHeader } from "reactstrap"

const EditColumns = ({
  columnsFor,
  columns,
  editColumns,
  setEditColumns,
  setColumns,
  initialColumns,
}) => {
  const showAllColumns = () => {
    const newColumns = [...columns]
    newColumns.forEach((column) => {
      column.omit = false
    })
    localStorage.setItem(columnsFor, JSON.stringify(newColumns))
    setColumns(newColumns)
  }

  const hideAllColumns = () => {
    const newColumns = [...columns]
    newColumns.forEach((column) => {
      column.omit = true
    })
    localStorage.setItem(columnsFor, JSON.stringify(newColumns))
    setColumns(newColumns)
  }

  const resetToDefault = () => {
    const newColumns = JSON.parse(JSON.stringify(initialColumns))
    localStorage.setItem(columnsFor, JSON.stringify(newColumns))
    setColumns(newColumns)
  }

  useEffect(() => {
    if (columnsFor) {
      const storedColumns = JSON.parse(localStorage.getItem(columnsFor))
      if (storedColumns) {
        setColumns(storedColumns)
      } else {
        setColumns(columns)
      }
    }
  }, [])

  return (
    <Draggable handle=".modal-header">
      <Modal
        isOpen={editColumns}
        toggle={() => {
          setEditColumns(false)
        }}
        size="lg"
        backdrop="static"
      >
        <ModalHeader
          toggle={() => setEditColumns(false)}
          className="move-cursor"
        >
          Edit Columns
        </ModalHeader>

        <ModalBody>
          {/* Buttons to show or hide all columns */}
          <div className="d-flex ">
            <button className="btn btn-md btn-success" onClick={showAllColumns}>
              Show All
            </button>
            <button className="btn btn-md btn-danger" onClick={hideAllColumns}>
              Hide All
            </button>
            {/* <button className="btn btn-md btn-warning" onClick={resetToDefault}>
              Reset to Default
            </button> */}
          </div>

          {/* Table and Checkbox for columns to show or hide */}
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th>Column</th>
                <th>Show</th>
                <th>Width</th>
              </tr>
            </thead>
            <tbody>
              {columns &&
                columns.length &&
                columns?.map((column, index) => (
                  <tr key={index}>
                    <td style={{ width: "50%" }}>
                      <label
                        style={{
                          cursor: "pointer",
                          color: !column.omit ? "green" : "red",
                        }}
                        htmlFor={column.selector}
                      >
                        {column.name}
                      </label>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id={column.selector}
                        checked={!column.omit}
                        onChange={() => {
                          const newColumns = [...columns]
                          newColumns[index].omit = !newColumns[index].omit
                          localStorage.setItem(
                            columnsFor,
                            JSON.stringify(newColumns)
                          )
                          setColumns(newColumns)
                        }}
                      />
                    </td>
                    <td>
                      {/* Range Select for width */}
                      <label>{column.width}</label>
                      <br />
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={
                          parseInt(column.width) > 0
                            ? parseInt(column.width)
                            : 0
                        }
                        onChange={(e) => {
                          const newColumns = [...columns]
                          newColumns[index].width = e.target.value + "px"
                          localStorage.setItem(
                            columnsFor,
                            JSON.stringify(newColumns)
                          )
                          setColumns(newColumns)
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </ModalBody>
      </Modal>
    </Draggable>
  )
}

export default EditColumns
