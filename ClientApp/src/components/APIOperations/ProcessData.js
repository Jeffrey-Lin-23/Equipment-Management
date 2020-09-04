import { nameToId, formatDate } from "./Operations"

export const processToDisplay = (data, type) => {
  if (type === "date") {
    console.log("ptd: " + data)
    return formatDate(data)
  } else return data
}

export const processDataToBack = (formData, staffs) => {
  const propName = ["order_staff", "for_staff", "approved_by"]
  propName.forEach(name => {
    if (formData[name]) formData[name] = nameToId(formData[name], staffs)
  })
  for (var [key, value] of Object.entries(formData)) {
    if (value === null || value === "" || value === undefined)
      delete formData[key]
  }
  if (formData["price"]) formData["price"] = parseInt(formData["price"]) || 0
  console.log(formData)
  return formData
}

export const processHistoryData = (historyInput, staffs) => {
  historyInput["operator"] = nameToId(historyInput["operator"], staffs)
  historyInput["action_date"] = formatDate(historyInput["action_date"])
  return historyInput
}
