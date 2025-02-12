"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import PaperCard from '@components/PaperCard';
import { useRouter } from 'next/navigation';

const PaperCardList = ({ data, handleDelete, handleEdit, openModal, closeModal, showModal, modalPaper, onClickCard }) => {
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
            showModal={showModal && modalPaper._id === paper._id}
            onClickCard={onClickCard}
          />
        </div>
      ))}
    </div>
  );
};

const Feed = () => {
  const [papers, setPapers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalPaper, setModalPaper] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedPapers, setSearchedPapers] = useState([]);
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
    };
    if (session?.user.id) {
      fetchPapers();
    }
  }, [session?.user.id]);

  const closeModal = () => {
    setShowModal(false);
    setModalPaper(null);
  };

  const openModal = (paper) => {
    setShowModal(true);
    setModalPaper(paper);
  };

  const handleEdit = (paper) => {
    router.push(`/edit_paper?id=${paper._id}`);
  };

  const onClickCard = (paper) => {
    router.push(`/view_paper?id=${paper._id}`);
  };

  const handleDelete = async (paper) => {
    try {
      const response = await fetch(`/api/paper/${paper._id.toString()}`, {
        method: "DELETE"
      });
      if (response.ok) {
        const updatedPapers = papers.filter(p => p._id !== paper._id);
        setPapers(updatedPapers);
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    setSearchText(e.target.value);

    if (e.target.value === "") {
      setSearchedPapers([]);
    } else {

      const filteredPapers = papers.filter(paper => {
        return (
          paper.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          paper.authors.toLowerCase().includes(e.target.value.toLowerCase()) ||
          paper.paperKeywords.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });

      setSearchedPapers(filteredPapers);
    }

  };

  return (
    <section className='container my-5'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group input-group-lg shadow-sm bg-white rounded">
            <input
              type="text"
              className="form-control border-primary"
              placeholder="Search papers by title, author, or keywords..."
              aria-label="Search"
              value={searchText}
              onChange={handleSearch}
              style={{ fontSize: "1rem" }}
            />
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <h2 className='text-center my-4'>Papers in Your Library</h2>
        {searchText ? (
          <PaperCardList
            data={searchedPapers}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            openModal={openModal}
            closeModal={closeModal}
            showModal={showModal}
            modalPaper={modalPaper}
            onClickCard={onClickCard}
          />
        ) : (
          <PaperCardList
            data={papers}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            openModal={openModal}
            closeModal={closeModal}
            showModal={showModal}
            modalPaper={modalPaper}
            onClickCard={onClickCard}
          />
        )}

      </div>
    </section>
  );
};

export default Feed;