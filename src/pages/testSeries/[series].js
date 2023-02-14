import { useRouter } from 'next/router'
import React from 'react'

function Series() {
    const router = useRouter()
    const {series} = router.query
    console.log(series)
  return (
    <div>{series}</div>
  )
}

export default Series