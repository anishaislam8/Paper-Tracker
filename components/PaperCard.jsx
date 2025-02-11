import React from 'react'

import DeleteModal from '@components/DeleteModal';




const PaperCard = ({ paper, tags, showModal, handleDelete, handleEdit, openModal, closeModal, onClickCard }) => {

    return (
        <section
            className="d-flex justify-content-center my-3"
            onClick={() => onClickCard(paper)}
            style={{ cursor: 'pointer' }} 
        >
            <div className="card shadow-lg border-0 rounded-3" style={{ width: "22rem" }}>
                <div className="card-body">
                    {/* Paper Title */}
                    <h5 className="card-title fw-bold">{paper.title}</h5>

                    {/* Authors */}
                    <h6 className="card-subtitle mb-3 text-muted">{paper.authors}</h6>

                    {/* Tags Section */}
                    <div className="mb-3">
                        {tags.length > 0 ? (
                            tags.map((tag, index) => (
                                <span key={index} className="badge bg-primary me-1">{tag}</span>
                            ))
                        ) : (
                            <span className="text-muted">No tags available</span>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(paper)}>Edit</button>
                        <button className="btn btn-outline-danger btn-sm" onClick={openModal}>Delete</button>
                    </div>

                    {/* Delete Modal */}
                    {showModal && <DeleteModal paper={paper} onClose={closeModal} handleDelete={handleDelete} />}
                </div>
            </div>
        </section>

    )
}

export default PaperCard