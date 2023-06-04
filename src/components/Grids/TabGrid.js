import { Button, FormGroup, Table } from "reactstrap"
import React from "react"
import { Link } from "react-router-dom"
import DataTable from "react-data-table-component"
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css"
import { DataTableCustomStyles } from "utils/Constants"
import styled from "styled-components"

// Style DataTable Component

const StyledTable = styled(DataTable)`

.rdt_TableCol div div {
  overflow: visible;
  white-space: pre-wrap;
  padding-left : 20px;
}
.rdt_TableRow{
  padding-top : 10px;
}

`

const TabGrid = ({ rows, loading, onView, onAssign, onFollowUp }) => {
  const columns = [
    {
      name: "Applicant Case Code",
      width : "110px",
      selector: "ApplicantCaseCode",
      sortable: true,
      cell : (row) => <span>{row?.ApplicantCaseCode}</span>,
      omit: false,
      wrap : true,
    },
    {
      name: "Applicant Name",
      width : "88px",
      selector: "ApplicantName",
      cell : (row) => <span>{row?.ApplicantName}</span>,
      sortable: true,
      omit: false,
    },
    {
      name: "CNIC",
      width : "88px",
      selector: "CnicNo",
      sortable: true,
      cell : (row) => <span>{row?.CnicNo}</span>,
      omit: false,
    },
    {
      name: "Gender",
      width : "75px", 
      selector: "Gender",
      cell : (row) => <span>{row?.Gender}</span>,
      sortable: true,
      omit: false,
    },
    {
      name: "City",
      width : "88px",
      selector: "City",
      cell : (row) => <span>{row?.City}</span>,

      sortable: true,
      omit: false,
    },

    {
      name: "Area",
      width : "88px",
      selector: "Area",
      cell : (row) => <span>{row?.Area}</span>,
      sortable: true,
      omit: false,
    },

    {
      name: "Case Nature",
      width : "88px",
      selector: "CaseNature",
      cell : (row) => <span>{row?.CaseNature}</span>,

      sortable: true,
      omit: false,
    },
    {
      name: "Fund Category",
      width : "88px",
      selector: "FundCategory",
      cell : (row) => <span>{row?.FundCategory}</span>,
      sortable: true,
      omit: false,
    },
    {
      name: "Fund Required",
      width : "88px",
      selector: "FundAmount_Required",
      cell : (row) => <span>{row?.FundAmount_Required}</span>,
      sortable: true,
      omit: false,
    },
    {
      name: "Investigator",
      width : "88px",
      selector: "Investigator",
      cell : (row) => <span>{row?.Investigator}</span>,
      sortable: true,
      omit: false,
    },
    {
      name: "Referrer",
      width : "88px",
      selector: "ReferralName",
      cell : (row) => <span>{row?.ReferralName}</span>,
      sortable: true,
      omit: false,
    },
    {
      name: "Case Status",
      width : "88px",
      selector: "CaseStatus",
      cell : (row) => <span>{row?.CaseStatus}</span>,
      sortable: true,
      omit: false,
    },
    {
      name: "No Of Days",
      width : "60px",
      selector: "NoOfDays",
      cell : (row) => <span>{row?.NoOfDays}</span>,
      sortable: true,
      omit: false,
    },
    {
      name: "Contact No",
      width : "105px",
      selector: "ApplicantPrimaryContactNumber",
      cell : (row) => <span>{row?.ApplicantPrimaryContactNumber}</span>,
      sortable: true,
      omit: false,
    },
    {
      name: "Action",
      sortable: true,
      width : "110px",
      cell: (row) => (
        <FormGroup style={{
          width: "100%",
        }}>
          {row.IsEdit === false ? (
            <FormGroup>
              <Button
                block
                color="danger"
                outline
                size="sm"
                onClick={() => onView(row)}
              >
                View
              </Button>
            </FormGroup>
          ) : (
            <FormGroup>
              <Link
                className="btn btn-outline-danger btn-sm btn-block"
                to={
                  "/admin/ApplicantDetail/" + row.ApplicantCase_InvestigationId
                }
                target="_blank"
                onClick={() => {
                  localStorage.setItem(
                    "ACIid",
                    row.ApplicantCase_InvestigationId
                  )
                  // document.open("/admin/ApplicantDetail/" + row.ApplicantCase_InvestigationId);//, "_blank");
                  localStorage.setItem("role", row.IsEdit == true ? 1 : 0)
                }}
              >
                EDIT
              </Link>
              {/* <Button
                      color="danger"
                      outline
                      size="sm"
                      onClick={() => props.onEdit(row)}
                    >
                      Edit
                    </Button> */}
            </FormGroup>
          )}

          {row.InvestigatorId === null && row.TabName === "Unassigned" && (
            <FormGroup>
              <Button
                block
                color="warning"
                className="btn-circle"
                size="sm"
                title="Assign"
                onClick={() => onAssign(row)}
              >
                <i class="nc-icon nc-single-02"></i>
              </Button>
            </FormGroup>
          )}

          {row.IsFollowCompleted === false && (
            <FormGroup>
              <Button
                block
                color="danger"
                outline
                size="sm"
                onClick={() => onFollowUp(row)}
              >
                Follow Up
              </Button>
            </FormGroup>
          )}
        </FormGroup>
      ),
    },
  ]

  return (
    <DataTableExtensions
      columns={columns}
      data={rows}
      exportHeaders={true}
      fileName="DonationListReport"
    >
      <StyledTable
        dense
        direction="auto"
        defaultSortField="DonorName"
        fixedHeader
        striped
        defaultSortAsc={false}
        pagination
        highlightOnHover
        expandOnRowClicked
        // onRowClicked={(r) => handleRowClicked(r)}
        progressPending={loading}
        fixedHeaderScrollHeight="auto"
        subHeaderAlign="right"
        subHeaderWrap={true}
        customStyles={DataTableCustomStyles}
      />
    </DataTableExtensions>
  )
}

export default TabGrid
