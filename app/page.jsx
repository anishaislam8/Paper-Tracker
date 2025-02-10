'use client';
import Feed from '@components/Feed';


import Image from 'next/image'; // authomatic image optimization
import { signIn, useSession } from 'next-auth/react';

const Home = () => {

    const { data: session, status } = useSession();
    if (status === "loading") {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <h2>Please wait...</h2>
            </div>
        );
    }

    return (


        <section>
            {!session?.user?.id ? (
                <div className="px-4 py-5 my-5 text-center">
                    <Image
                        src="/assets/icons/papers.svg"
                        alt='Paper Tracker Logo'
                        width={50}
                        height={50}
                    />
                    <h1 className="display-5 fw-bold">Paper Tracker</h1>
                    <h2 className="display-6 fw-bold">Your Personal Research Library!</h2>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-4">Stay on top of your academic reading with a streamlined platform to upload,
                            summarize, and categorize research papers. Easily search, filter, and track
                            your progress with built-in stats and relevance rankings—all while keeping
                            your library organized and accessible.</p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">


                            <button type="button"
                                onClick={() => signIn('google')}
                                className='btn btn-primary btn-lg px-4 gap-3'>Log In/ Sign Up Using Google!
                            </button>



                        </div>
                    </div>
                </div>
            ) : (
                <Feed />
            )
            }
        </section>
    )

}

export default Home