import React from 'react';
import DeleteModal from '@components/DeleteModal';

const PaperCard = ({ paper, tags, showModal, handleDelete, handleEdit, openModal, closeModal, onClickCard }) => {
    return (
        <section className="d-flex justify-content-center my-3">
            <div className="card shadow-lg border-0 rounded-3" style={{ width: "22rem" }}>
                <div className="card-body">
                    {/* Paper Title */}
                    <h5 className="card-title fw-bold" onClick={() => onClickCard(paper)} style={{ cursor: 'pointer' }}>{paper.title}</h5>

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
                    {/* In the PaperCard component, I have an onClick event handler on the h5 element that calls the onClickCard function when the card title is clicked. I also have onClick event handlers on the Edit and Delete buttons. Without e.stopPropagation(), clicking the Edit or Delete buttons would also trigger the onClick event on the parent section element, causing the onClickCard function to be called. */}
                    
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-primary btn-sm" onClick={(e) => { e.stopPropagation(); handleEdit(paper); }}>Edit</button>
                        <button className="btn btn-outline-danger btn-sm" onClick={(e) => { e.stopPropagation(); openModal(paper); }}>Delete</button>
                    </div>

                    {/* Delete Modal */}
                    {showModal && <DeleteModal paper={paper} onClose={closeModal} handleDelete={handleDelete} />}
                </div>
            </div>
        </section>
    );
};

export default PaperCard;