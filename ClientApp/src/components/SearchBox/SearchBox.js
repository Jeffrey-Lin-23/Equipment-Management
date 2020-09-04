import React from "react"
import { Input } from "reactstrap"

const SearchBox = ({ devices, setFiltered, setSearchString, type }) => {
  const search = ({ target: { value } }) => {
    const filtered = devices.filter(
      item => item[type] !== null && item[type].toLowerCase().includes(value)
    )
    setFiltered(filtered)
    setSearchString(value)
  }

  // filter devices on each key press
  return <Input onChange={search}></Input>
}

export default SearchBox
