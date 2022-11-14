import React, { useState, useEffect } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { gql, useQuery, useMutation } from '@apollo/client';


export default function Thermometer() {

  const [progress, setProgress] = useState(0)

  const user_items = gql`
  query {
    UserContentItems {
      id
    }
  }`

  const get_ceus = gql`
  query UserCourseAwardCounts($courseId: ID!) {
    UserCourseAwardCounts(courseId: $courseId) {
      count
      icon
      id
      label
    }
  }`

  const { data: user_items_data } = useQuery(user_items);

  if (user_items_data) {
    let response = user_items_data.UserContentItems
    let ids = []
    let total = 0
    for (let i = 0; i < response.length; i++ ) {
      ids.push(response[i].id)
    }

    const string = gql`
    query User {
      ${
        ids.map((id, index) => {
          return `
          query${index}: UserCourseAwardCounts(courseId: "${id}") {
            count
            label
          }
          `
        })
      }
    }
    `

    const { data: ceus_data, error: ceus_error } = useQuery(string);

    if (ceus_data) {
      console.log(ceus_data)
      let totals = Object.values(ceus_data)
      console.log(totals)

      for (let j = 0; j < totals.length; j++) {
        total += totals[j][0].count
      }
      useEffect(() => {
        setProgress(total)
      }, [])

    } else if (ceus_error){
      console.log(ceus_error)
    }
    
  }


  return (
    <div
      className='p-4'
    >
        <h1 
          className='text-3xl text-center'
        >
          CEU's Progress
        </h1>
        
          <div
            className='px-10 pt-4 flex flex-row justify-center'>
            <ProgressBar
              className='mt-8'
              animateOnRender={true}
              height="30px"
              transitionDuration="2s"
              transitionTimingFunction='ease-in-out'
              completed={progress}
              customLabel={`${progress} CEU's`}
              width='1000px'/>
          <img 
            className='h h-24 w-24 -ml-10 mb-6'
            src='../renderer/star.png'/>
          </div>
    </div>
  );
}