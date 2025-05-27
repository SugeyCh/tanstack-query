'use client'

import { useState } from 'react'
import { GetAPIComponent } from './posts'
import { GetID } from './posts-id'

export default function Home() {
  const [ isMounted, setIsMounted ] = useState(false)

  return(
    <>
      <button className='p-4 bg-gray-500/30 rounded-b-md' onClick={() => setIsMounted((prev) => !prev) }>Toggle</button>
      { isMounted && <GetAPIComponent /> }
      <GetID id={ 3 } />
    </>
  )
}