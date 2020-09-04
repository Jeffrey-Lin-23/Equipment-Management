import React, { useContext, useState, useEffect } from "react"
import { Row, Col, Button, Form, Input, Label } from "reactstrap"
import FormRow from "../FormGenerator/FormRow"
import { FormContext } from "../Context/FormContext"
import { getStaffs, post } from "../APIOperations/HTTPOperations"
import { processDataToBack } from "../APIOperations/ProcessData"

const AddItem = () => {
  const rowNumber = [1, 2, 3, 4, 5, 6]
  const [form] = useContext(FormContext)
  const [formData, setFormData] = useState({})
  const [staffState, setStaffState] = useState([])
  const [numberOfbatch, setNumberOfbatch] = useState(1)

  useEffect(() => {
    getStaffs(setStaffState)
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    // process data to be send to database
    const processeData = processDataToBack(formData, staffState)
    // loop for batch input
    for (let i = 0; i < numberOfbatch; i++) {
      post(processeData)
    }
    console.log(formData)
  }

  // control batch number
  const batchInput = e => {
    setNumberOfbatch(parseInt(e.target.value) || 1)
  }

  return (
    <div>
      <Row style={{ marginBottom: "2rem" }}>
        <Col md={9}>
          <h1>Add Item</h1>
        </Col>
        <Col md={3}>
          {/* render batch input */}
          <Label style={{ marginRight: "20px" }}>Batch Input</Label>
          <Input
            type='text'
            name='numberOfInput'
            onChange={batchInput}
            style={{ width: "80px", display: "inline" }}
          />
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        {/* render input fields */}
        {rowNumber.map((n, index) => (
          <Row form key={index}>
            <FormRow
              form={form}
              formData={formData}
              setFormData={setFormData}
              staffs={staffState}
            />
          </Row>
        ))}
        <Button>Submit</Button>
      </Form>
    </div>
  )
}

export default AddItem
