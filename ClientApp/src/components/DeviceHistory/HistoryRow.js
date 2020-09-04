import React from "react"
import { formatDate, idToName } from "../APIOperations/Operations"

const HistoryRow = ({ h, index, staffs, history, setCurrentHistory }) => {
  // set description to be displayed
  const showDescription = e => {
    const index = parseInt(e.target.parentNode.id)
    setCurrentHistory(history[index])
  }

  return (
    <>
      <tr key={index} id={index} onClick={showDescription}>
        <td>{formatDate(h.action_date)}</td>
        <td>{h.action}</td>
        <td>{idToName(h.operator, staffs)}</td>
      </tr>
    </>
  )
}

export default HistoryRow
