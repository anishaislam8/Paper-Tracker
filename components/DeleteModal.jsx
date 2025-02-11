import React from 'react'

const DeleteModal = ({ paper, onClose, handleDelete}) => {

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Paper</h5>
                        {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button> */}
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete {paper.title}?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={()=>handleDelete(paper)}>Yes, Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal