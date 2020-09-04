import React, { useState, useEffect } from "react"
import { Row, Col, Table, Input } from "reactstrap"
import HistoryModal from "./HistoryModal"
import HistoryRow from "./HistoryRow"
import PaginationComp from "../PaginationComp"
import { getHistory } from "../APIOperations/HTTPOperations"
import EditHistory from "./EditHistory"

const DeviceHistory = ({ id, staffs }) => {
  const [history, setHistory] = useState([])
  const [currentHistory, setCurrentHistory] = useState({})

  // Pagination states
  const [historyPerPage] = useState([10])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getHistory(setHistory, id, () => {})
  }, [])

  let indexLast = currentPage * historyPerPage
  let indexFirst = indexLast - historyPerPage
  let currentHistoryPage = history.slice(indexFirst, indexLast)

  const paginate = n => setCurrentPage(n)

  return (
    <>
      <h2>Device History</h2>

      <HistoryModal id={id} setHistory={setHistory} staffs={staffs} />

      <Row>
        <Col md={6}>
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Action</th>
                <th>Operator</th>
              </tr>
            </thead>
            <tbody>
              {/* for displaying all history */}
              {currentHistoryPage.map((h, index) => (
                <HistoryRow
                  key={index}
                  h={h}
                  index={index}
                  staffs={staffs}
                  history={history}
                  setCurrentHistory={setCurrentHistory}
                />
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={6}>
          <Table>
            <thead>
              <tr>
                <th>Description</th>
              </tr>
            </thead>
          </Table>
          {/* Display history description */}
          <Input
            type='textarea'
            rows='4'
            defaultValue={
              currentHistory === undefined ? null : currentHistory.description
            }></Input>
          {/* render edit history */}
          {currentHistory !== undefined ? (
            <EditHistory
              staffs={staffs}
              history={history}
              setHistory={setHistory}
              currentHistory={currentHistory}
              setCurrentHistory={setCurrentHistory}
            />
          ) : null}
        </Col>
      </Row>
      <PaginationComp
        itemPerPage={historyPerPage}
        totalItems={history.length}
        paginate={paginate}
      />
    </>
  )
}

export default DeviceHistory
