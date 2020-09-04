export const formatDate = dateString => {
  if (dateString === undefined || dateString === null) return
  const date = dateString.split(" ")
  const split = date[0].split("/")
  if (parseInt(split[0]) < 10) split[0] = "0" + parseInt(split[0])
  if (parseInt(split[1]) < 10) split[1] = "0" + parseInt(split[1])
  if (split[2] === undefined) return dateString
  return split[2] + "-" + split[0] + "-" + split[1]
}

export const handleChange = (setInput, e) => {
  const { name, value } = e.target
  // console.log(value)
  setInput(prev => ({
    ...prev,
    [name]: checkInput(name, value) || value
  }))
}

const checkInput = (name, value) => {
  if (name === "price") return parseInt(value)
  if (name === "order_staff") return parseInt(value)
}

export const idToName = (id, staffs) => {
  if (!parseInt(id)) return id
  let name = ""
  staffs.forEach(staff => {
    if (staff.staff_id === id) name = staff.first_name
  })
  return name
}

export const nameToId = (name, staffs) => {
  if (!isNaN(name)) return name
  let id = 0
  staffs.forEach(staff => {
    if (staff.first_name === name) id = staff.staff_id
  })
  return id
}
