import { connectToDB } from "@/utils/database";

import Paper from "@/models/paper";

// Get
export const GET = async (req, { params }) => {
    try {

        await connectToDB();

        const { id } = await params;

        const paper = await Paper.findById(id);

        if (!paper) {
            return new Response("Paper not found!", { status: 404 });
        }

        return new Response(JSON.stringify(paper), { status: 200 });

    } catch (error) {
        console.log("Error fetching paper: ", error);
        return new Response("Failed to fetch paper!", { status: 500 });
    }
}


// Patch


export const PATCH = async (req, { params }) => {
    const { creator, title, authors, publicationYear, publicationVenue, paperSummary, paperAbstract, paperKeywords, citation, paperUrl } = await req.json();
    try {

        await connectToDB();

        const { id } = await params;

        const paper = await Paper.findById(id);

        if (!paper) {
            return new Response("Paper not found!", { status: 404 });
        }

        paper.creator = creator;
        paper.title = title;
        paper.authors = authors;
        paper.publicationYear = publicationYear;
        paper.publicationVenue = publicationVenue;
        paper.paperSummary = paperSummary;
        paper.paperAbstract = paperAbstract;
        paper.paperKeywords = paperKeywords;
        paper.citation = citation;
        paper.paperUrl = paperUrl;

        await paper.save();

        return new Response(JSON.stringify(paper), { status: 200 });



    } catch (error) {
        console.log("Error updating paper: ", error);
        return new Response("Failed to update paper!", { status: 500 });
    }
}

// delete

export const DELETE = async (req, { params }) => {
    try {

        await connectToDB();

        const { id } = await params;
        await Paper.findByIdAndDelete(id);

        return new Response("Paper deleted successfully!", { status: 200 });

    } catch (error) {
        console.log("Error deleting paper: ", error);
        return new Response("Failed to delete paper!", { status: 500 });
    }
}

