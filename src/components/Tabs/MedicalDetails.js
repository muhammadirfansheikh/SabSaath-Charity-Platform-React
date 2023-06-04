import useEditRole from 'hooks/useEditRole.js'
import React from 'react'
import MedicalCardDetails from './MedicalCardDetails.js'
import MedicalDeseaseDetails from './MedicalDeseaseDetails'
import MedicalDisabilityDetails from './MedicalDisabilityDetails.js'

const MedicalDetails = (props) => {
  
  return (
    <>
    <MedicalCardDetails />
    <MedicalDisabilityDetails  />
    <MedicalDeseaseDetails  />
    </>
  )
}

export default MedicalDetails