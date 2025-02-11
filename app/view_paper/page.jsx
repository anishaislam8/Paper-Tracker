"use client";

import { useEffect, useState } from "react";
import {  useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const ViewPaperContent = () => {

    const searchParams = useSearchParams();
    const paperId = searchParams.get("id");
    const router = useRouter();

    const [paper, setPaper] = useState({
        title: "",
        authors: "",
        publicationYear: "",
        publicationVenue: "",
        paperSummary: "",
        paperAbstract: "",
        paperKeywords: "",
        citation: "",
        paperUrl: "",
    })

    useEffect(() => {
        const fetchPaper = async () => {
            try {
                const response = await fetch(`/api/paper/${paperId}`);
                const data = await response.json();
                setPaper({
                    title: data.title,
                    authors: data.authors,
                    publicationYear: data.publicationYear,
                    publicationVenue: data.publicationVenue,
                    paperSummary: data.paperSummary,
                    paperAbstract: data.paperAbstract,
                    paperKeywords: data.paperKeywords,
                    citation: data.citation,
                    paperUrl: data.paperUrl,
                });
            } catch (error) {
                console.log(error);
            }
        }
        if (paperId) fetchPaper();
    }, [paperId]);


    const goToHomePage = () => {
        router.push("/");
    }

    return (
        <div className="container mt-5 mb-5 p-5 border rounded shadow bg-light mx-auto">
            <div className="row">
                <div className="col-md-12">
                    {/* Paper Title & Authors */}
                    <h1 className="mb-2">{paper.title}</h1>
                    <h2 className="text-muted">{paper.authors}</h2>

                    {/* Publication Year and Venue */}
                    <section className="mt-4">
                        <h3>Publication</h3>
                        <p className="text-secondary">
                            {paper.publicationYear} - {paper.publicationVenue}
                        </p>
                    </section>

                    {/* Paper Summary */}
                    {paper.paperSummary && <section className="mt-4">
                        <h3>Summary</h3>
                        <p>{paper.paperSummary}</p>
                    </section>}

                    {/* Paper Abstract */}
                    {paper.paperAbstract && <section className="mt-4">
                        <h3>Abstract</h3>
                        <p>{paper.paperAbstract}</p>
                    </section>}

                    {/* Paper Keywords */}
                    <section className="mt-4">
                        <h3>Keywords</h3>
                        <div className="mb-3">
                            {paper.paperKeywords.split(",").map((keyword, index) => (
                                <span key={index} className="badge bg-primary me-1">
                                    {keyword.trim()}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Citation */}
                    {paper.citation && <section className="mt-4">
                        <h3>Citation</h3>

                        <p className="mb-0">{paper.citation}</p>

                    </section>}

                    {/* Paper URL */}
                    {paper.paperUrl && <section className="mt-4">
                        <h3>URL</h3>
                        <a
                            href={paper.paperUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none"
                        >
                            {paper.paperUrl}
                        </a>
                    </section>}

                    <section className="mt-4">
                        <button className="btn btn-outline-dark btn-sm" onClick={goToHomePage}>Back</button>
                    </section>

                    
                </div>
            </div>
        </div>

    )
}

const ViewPaper = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ViewPaperContent />
        </Suspense>
    );
};

export default ViewPaper