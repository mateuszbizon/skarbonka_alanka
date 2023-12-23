import React from 'react'
import SumItem from './SumItem';

interface SumProps {
    peopleList: any[]
}

function Sum({ peopleList }: SumProps) {
  return (
    <div className='sum'>
        {peopleList.map((person, index) => (
            <SumItem key={index} person={person} />
        ))}
    </div>
  )
}

export default Sum