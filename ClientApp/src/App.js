import React from "react"
import { Route } from "react-router"
import Layout from "./components/Layout"
import TotalItems from "./components/TotalItems"
import AddItem from "./components/AddItem/AddItem"
import FormProvider from "./components/Context/FormContext"
import EditItem from "./components/EditItem/EditItem"

const App = () => {
  return (
    <FormProvider>
      <Layout>
        <Route exact path='/' component={TotalItems} />
        <Route path='/TotalItems' component={TotalItems} />
        <Route path='/AddItem' component={AddItem} />
        <Route path='/EditItem/:id' component={EditItem} />
      </Layout>
    </FormProvider>
  )
}

export default App
