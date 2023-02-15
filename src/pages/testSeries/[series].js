import { useRouter } from 'next/router'
import React from 'react'

function Series() {
    const router = useRouter()
    const {series} = router.query
    console.log(series)
  return (
    <div>
      <div className=''>
        <div className='bg-violet-400 text-white text-center'>topic</div>
        <div className='flex justify-between'>
          <div className=''>list
          <ul className='p-5'>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
          </ul>
          </div>
          <div>Questions</div>
        </div>
      </div>
    </div>
  )
}

export default Series