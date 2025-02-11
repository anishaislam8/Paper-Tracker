"use client";

import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import PaperCard from '@components/PaperCard'
import { useRouter } from 'next/navigation';

const PaperCardList = ({ data, showModal, handleDelete, handleEdit, openModal, closeModal, onClickCard }) => {
  return (
    <div className='row'>
      {data.map((paper, index) => (
        <div key={index} className='col-md-4 mb-3'>
          <PaperCard
            key={index}
            paper={paper}
            tags={paper.paperKeywords ? paper.paperKeywords.split(",").map(keyWord => keyWord.trim()) : []}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            openModal={openModal}
            closeModal={closeModal}
            showModal={showModal}
            onClickCard={onClickCard}

          />
        </div>
      ))}
    </div>
  )
}


const Feed = () => {
  const [papers, setPapers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();



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


  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  }

  const handleEdit = (paper) => {
    router.push(`/edit_paper?id=${paper._id}`)
  };

  const onClickCard = (paper) => {
    console.log("Clicked on paper", paper);
    router.push(`/view_paper?id=${paper._id}`)
  }

  const handleDelete = async (paper,) => {
    try {
      const response = await fetch(`/api/paper/${paper._id.toString()}`, {
        method: "DELETE"
      });
      if (response.ok) {
        console.log("Paper deleted successfully");
        const updatedPapers = papers.filter(p => p._id !== paper._id);
        setPapers(updatedPapers);

        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  }


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


        <PaperCardList
          data={papers}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          openModal={openModal}
          closeModal={closeModal}
          showModal={showModal}
          onClickCard={onClickCard}
        />
      </div>
    </section>
  )
}

export default Feed