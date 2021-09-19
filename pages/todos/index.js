import React from 'react'
import Layout from '../../components/Layout'
import Footer from '../../components/Footer'
import { useAuthStatus } from '../../hooks/useAuthStatus'
const Todos = () => {
  
  useAuthStatus()
  return (
    <>
      <Layout title="TODO一覧">
        todos一覧
      </Layout>
      <Footer />
    </>
  )
}

export default Todos
