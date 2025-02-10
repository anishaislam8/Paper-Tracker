"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form"

const AddPaper = () => {


  const { data: session } = useSession();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/paper/new", {
        method: "POST",
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
        console.log("Paper added successfully");
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
      handleSubmit={handleSubmit}
    />

  )
}

export default AddPaper