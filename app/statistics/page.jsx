"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CategoryChart from '@components/CategoryChart';
import AuthorChart from '@components/AuthorChart';
import VenueChart from '@components/VenueChart';


const Statistics = () => {
  const { data: session, status } = useSession();
  const [papers, setPapers] = useState([]);
  const [totalPapers, setTotalPapers] = useState(0);
  const [papersPerCategory, setPapersPerCategory] = useState([]);
  const [papersPerAuthor, setPapersPerAuthor] = useState([]);
  const [papersPerVenue, setPapersPerVenue] = useState([]);


  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/papers`);
        const data = await response.json();
        setPapers(data);

        // Calculate statistics
        setTotalPapers(data.length);

        const categoryCounts = {};
        const authorCounts = {};
        const venueCounts = {};


        data.forEach(paper => {
          const keywords = paper.paperKeywords.split(',').map(keyword => keyword.trim());
          const authors = paper.authors.split(',').map(author => author.trim());
          const venueName = paper.publicationVenue;


          keywords.forEach(keyword => {
            categoryCounts[keyword] = (categoryCounts[keyword] || 0) + 1;
          });

          authors.forEach(author => {
            authorCounts[author] = (authorCounts[author] || 0) + 1;
          });

          venueCounts[venueName] = (venueCounts[venueName] || 0) + 1;

        });

        const sortedCategories = Object.entries(categoryCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);

        const sortedAuthors = Object.entries(authorCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        const sortedVenues = Object.entries(venueCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);



        setPapersPerCategory(sortedCategories);
        setPapersPerAuthor(sortedAuthors);
        setPapersPerVenue(sortedVenues);


      } catch (error) {
        console.log(error);
      }
    };

    if (session?.user.id) {
      fetchPapers();
    }
  }, [session?.user.id]);



  return (
    <section>
      <div className="container mt-5 mb-5 p-4 border rounded shadow bg-light">
        <h2 className='text-center my-4'>Total Papers in Your Library: {totalPapers}</h2>
        <div className="row">
          <div className="col-md-6 col-sm-12 mb-4">
            <CategoryChart data={papersPerCategory} />
            <VenueChart data={papersPerVenue} />
          </div>
          <div className="col-md-6 col-sm-12 mb-4">
            <AuthorChart data={papersPerAuthor} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;