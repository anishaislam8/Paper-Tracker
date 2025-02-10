"use client";

import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import PaperCard from '@components/PaperCard'


const PaperCardList = ({ data }) => {
  return (
    <div className='row'>
      {data.map((paper, index) => (
        <div key={index} className='col-md-4 mb-3'>
          <PaperCard
            key={index}
            paper={paper}
            tags={paper.paperKeywords ? paper.paperKeywords.split(",").map(keyWord => keyWord.trim()) : []}
          />
        </div>
      ))}
    </div>
  )
}


const Feed = () => {
  const [papers, setPapers] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/papers`);
        const data = await response.json();

        setPapers(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPapers();
  }, []);

  return (

    <section className='container my-5'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group input-group-lg shadow-sm">
            <input
              type="text"
              className="form-control border-primary"
              placeholder="Search papers..."
              aria-label="Search"
            />
            <button className="btn btn-primary" type="button">Search</button>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">

        <h2 className='text-center my-4'>Papers in Your Library</h2>


        <PaperCardList data={papers} />
      </div>
    </section>
  )
}

export default Feed