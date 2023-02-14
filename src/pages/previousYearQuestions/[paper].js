import { useRouter } from 'next/router'
import React from 'react'

function Paper() {
    const router = useRouter()
    const {paper} = router.query
  return (
    <div>{paper}</div>
  )
}

export default Paper