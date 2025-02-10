import React from 'react'
import Link from 'next/link'

const Form = ({ paper, setPaper, handleSubmit }) => {
    return (
        <section className="container mt-5 p-4 border rounded shadow bg-light">
            <h2 className="text-center mb-4">Add a New Paper</h2>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Title*</label>
                        <input
                            value={paper.title}
                            onChange={(e) => setPaper({ ...paper, title: e.target.value })}
                            className="form-control"
                            id="title"
                            placeholder="Enter the paper title"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Authors*</label>
                        <input
                            value={paper.authors}
                            onChange={(e) => setPaper({ ...paper, authors: e.target.value })}
                            className="form-control"
                            id="authors"
                            placeholder="Enter author names (comma-separated)"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Publication Year*</label>
                        <input
                            value={paper.publicationYear}
                            onChange={(e) => setPaper({ ...paper, publicationYear: e.target.value })}
                            className="form-control"
                            id="publicationYear"
                            placeholder="Enter publication year"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Publication Venue*</label>
                        <input
                            value={paper.publicationVenue}
                            onChange={(e) => setPaper({ ...paper, publicationVenue: e.target.value })}
                            className="form-control"
                            id="publicationVenue"
                            placeholder="Enter publication venue"
                            required
                        />
                    </div>

                    <div className="col-md-12 mb-3">
                        <label className="form-label">Paper Summary</label>
                        <textarea
                            value={paper.paperSummary}
                            onChange={(e) => setPaper({ ...paper, paperSummary: e.target.value })}
                            className="form-control"
                            id="paperSummary"
                            placeholder="Enter paper summary"
                            rows="3"
                        />
                    </div>

                    <div className="col-md-12 mb-3">
                        <label className="form-label">Paper Abstract</label>
                        <textarea
                            value={paper.paperAbstract}
                            onChange={(e) => setPaper({ ...paper, paperAbstract: e.target.value })}
                            className="form-control"
                            id="paperAbstract"
                            placeholder="Enter paper abstract"
                            rows="3"
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Paper Keywords*</label>
                        <input
                            value={paper.paperKeywords}
                            onChange={(e) => setPaper({ ...paper, paperKeywords: e.target.value })}
                            className="form-control"
                            id="paperKeywords"
                            placeholder="Keywords (comma-separated)"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Paper URL</label>
                        <input
                            type="url"
                            value={paper.paperUrl}
                            onChange={(e) => setPaper({ ...paper, paperUrl: e.target.value })}
                            className="form-control"
                            id="paperUrl"
                            placeholder="Enter paper URL"
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Citation</label>
                        <textarea
                            value={paper.citation}
                            onChange={(e) => setPaper({ ...paper, citation: e.target.value })}
                            className="form-control"
                            id="citation"
                            placeholder="Enter citation"
                            rows="2"
                        />
                    </div>

                    
                </div>

                <div className="d-flex justify-content-between mt-4">
                    <Link href="/" className="btn btn-outline-dark">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={!(paper.title && paper.authors && paper.publicationYear && paper.publicationVenue && paper.paperKeywords)}
                        className="btn btn-success"
                    >
                        Save Paper
                    </button>
                </div>
            </form>
        </section>

    )
}

export default Form