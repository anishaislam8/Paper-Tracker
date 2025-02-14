"use client";

import React, { useState, useEffect, use } from 'react';
import { useSession } from 'next-auth/react';
import PaperCard from '@components/PaperCard';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
  const [showFilter, setShowFilter] = useState(false);

  const [filterAuthors, setFilterAuthors] = useState([]);
  const [filterConferences, setFilterConferences] = useState([]);
  const [filterKeywords, setFilterKeywords] = useState([]);


  const [allConferences, setAllConferences] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const [allKeywords, setAllKeywords] = useState([]);

  const [filteredPapers, setFilteredPapers] = useState([]);


  const { data: session } = useSession();
  const router = useRouter();


  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/papers`);
        const data = await response.json();
        setPapers(data);

        // for all papers in data, get all authors, paperKeywords, and publicationVenues
        let authors = new Set();
        let conferences = new Set();
        let keywords = new Set();

        data.forEach(paper => {
          paper.authors.split(",").forEach(author => authors.add(author.trim()));
          conferences.add(paper.publicationVenue);
          paper.paperKeywords.split(",").forEach(keyword => keywords.add(keyword.trim()));
        });


        authors = new Set(Array.from(authors).sort((a, b) => a.localeCompare(b)));
        conferences = new Set(Array.from(conferences).sort((a, b) => a.localeCompare(b)));
        keywords = new Set(Array.from(keywords).sort((a, b) => a.localeCompare(b)));

        setAllAuthors(Array.from(authors));
        setAllConferences(Array.from(conferences));
        setAllKeywords(Array.from(keywords));

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

      const tempSearchedPapers = papers.filter(paper => {
        return (
          paper.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          paper.authors.toLowerCase().includes(e.target.value.toLowerCase()) ||
          paper.paperKeywords.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });

      setSearchedPapers(tempSearchedPapers);
    }

  };

  const handleConferenceFilterChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setFilterConferences((prev) => [...prev, value]);
    } else {
      setFilterConferences((prev) =>
        prev.filter((conference) => conference !== value)
      );
    }


    
  };

  const handleKeyWordFilterChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setFilterKeywords((prev) => [...prev, value]);
    } else {
      setFilterKeywords((prev) =>
        prev.filter((keyword) => keyword !== value)
      );
    }


    
  };

  const handleAuthorFilterChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setFilterAuthors((prev) => [...prev, value]);
    } else {
      setFilterAuthors((prev) =>
        prev.filter((author) => author !== value)
      );
    }



  };

  const applyFilters = () => {
    setShowFilter(false);
    setSearchText("");


    let filPapers = papers.filter(paper => {
      let authors = paper.authors.split(",").map(author => author.trim());
      let conference = paper.publicationVenue;
      let keywords = paper.paperKeywords.split(",").map(keyword => keyword.trim());

      let authorFilter = filterAuthors.length > 0 ? filterAuthors.some(author => authors.includes(author)): false;
      let conferenceFilter = filterConferences.length > 0 ? filterConferences.includes(conference): false;
      let keywordFilter = filterKeywords.length > 0 ? filterKeywords.some(keyword => keywords.includes(keyword)): false;

      return authorFilter || conferenceFilter || keywordFilter;
    });

    setFilteredPapers(filPapers);

  };


  const clearFilters = () => {
    setFilterAuthors([]);
    setFilterConferences([]);
    setFilterKeywords([]);
    setFilteredPapers([]);
    setShowFilter(false);
    setSearchText("");
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
        <h2 className='text-center my-4'>
          Papers in Your Library
          <Image
            src="/assets/icons/funnel.svg"
            alt="Filter"
            width={37}
            height={37}
            onClick={() => setShowFilter(!showFilter)}
            style={{ marginLeft: "1rem", cursor: "pointer" }}
          />
        </h2>



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
            data={filteredPapers.length > 0 ? filteredPapers : papers}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            openModal={openModal}
            closeModal={closeModal}
            showModal={showModal}
            modalPaper={modalPaper}
            onClickCard={onClickCard}
          />


        )}




        {/* Sidebar (Sidenav) */}
        <div
          className={`sidenav ${showFilter ? "sidenav-open" : ""}`}
          onClick={() => setShowFilter(false)} // Clicking outside closes the sidebar
        >
          <div className="sidenav-content" onClick={(e) => e.stopPropagation()}>

          <Image
            src="/assets/icons/x.svg"
            alt="Close Filter"
            width={37}
            height={37}
            onClick={() => setShowFilter(false)}
            style={{ cursor: "pointer", filter: "invert(1)" , alignSelf: "flex-end"}}
          />

            <h4>Filter Options</h4>
            

            <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Venues
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
                style={{ maxHeight: '300px', overflowY: 'auto' }}
              >
                {allConferences.map((conference, index) => (
                  <li key={index}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={conference}
                        id={`conference-${index}`}
                        onChange={handleConferenceFilterChange}
                      />
                      <label className="form-check-label" htmlFor={`conference-${index}`}>
                        {conference}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>



            <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle"
                type="button"
                id="dropdownMenuButtonAuthor"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Authors
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButtonAuthor"
                style={{ maxHeight: '300px', overflowY: 'auto' }}
              >
                {allAuthors.map((author, index) => (
                  <li key={index}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={author}
                        id={`author-${index}`}
                        onChange={handleAuthorFilterChange}
                      />
                      <label className="form-check-label" htmlFor={`author-${index}`}>
                        {author}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>


            <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle"
                type="button"
                id="dropdownMenuButtonKeywords"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Keywords
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButtonKeywords"
                style={{ maxHeight: '300px', overflowY: 'auto' }}
              >
                {allKeywords.map((keyword, index) => (
                  <li key={index}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={keyword}
                        id={`keyword-${index}`}
                        onChange={handleKeyWordFilterChange}
                      />
                      <label className="form-check-label" htmlFor={`keyword-${index}`}>
                        {keyword}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>


            <button className='btn btn-success mt-3' onClick={applyFilters}>Apply</button>
            <button className='btn btn-danger mt-3' onClick={clearFilters}>Clear All Filters</button>


          </div>
        </div>

      </div>
    </section>
  );
};

export default Feed;