import { connectToDB } from "@utils/database";

import Paper from "@models/paper";

export const GET = async (req, {params}) => {

    try{
        await connectToDB();
        const { id } = await params

        // The populate() method is used to replace the specified field in the document with the actual document from another collection. In this case, the creator field in each Paper document is replaced with the corresponding User document from the User collection. This is useful for retrieving related data from different collections in a single query.

        

        const papers = await Paper.find({creator: id}).populate('creator');
        return new Response(JSON.stringify(papers), { status: 200 });

    } catch(error){
        console.log(error);
        return new Response("Paper fetch failed!", { status: 500 });
    }
}