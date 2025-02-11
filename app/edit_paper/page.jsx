"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import Form from "@components/Form"

const EditPaperContent = () => {


    const router = useRouter();
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const paperId = searchParams.get("id");
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
    }, [paperId]); // By including paperId in the dependency array, the useEffect hook will re-run its effect whenever the value of paperId changes. This ensures that the component fetches the latest paper details whenever the paperId changes.

    const handleEdit = async (e) => {
        e.preventDefault();
        if (!paperId) return;

        try {
            const response = await fetch(`/api/paper/${paperId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    creator: session.user.id,
                    title: paper.title,
                    authors: paper.authors,
                    publicationYear: paper.publicationYear,
                    publicationVenue: paper.publicationVenue,
                    paperSummary: paper.paperSummary,
                    paperAbstract: paper.paperAbstract,
                    paperKeywords: paper.paperKeywords,
                    citation: paper.citation,
                    paperUrl: paper.paperUrl,

                })
            });

            if (response.ok) {
                console.log("Paper edited successfully");
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (



        <Form
            paper={paper}
            setPaper={setPaper}
            handleSubmit={handleEdit}
        />

    )
}


const EditPaper = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditPaperContent />
        </Suspense>
    );
};

export default EditPaper;
