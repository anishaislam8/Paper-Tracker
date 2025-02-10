import { connectToDB } from "@utils/database";

import Paper from "@models/paper";

export const POST = async (req) => {
    const { creator, title, authors, publicationYear, publicationVenue, paperSummary, paperAbstract, paperKeywords, citation, paperUrl } = await req.json();

    try {
        await connectToDB();
        const newPaper = new Paper({
            creator,
            title,
            authors,
            publicationYear,
            publicationVenue,
            paperSummary,
            paperAbstract,
            paperKeywords,
            citation,
            paperUrl
        });

        await newPaper.save();
        return new Response("Paper created successfully!", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Paper creation failed!", { status: 500 });
    }
};
