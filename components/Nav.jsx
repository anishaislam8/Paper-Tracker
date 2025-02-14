"use client";

import React from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

const Nav = () => {
    const { data: session } = useSession();

    return (
        <>
            {session?.user && (
                <nav className="navbar navbar-expand navbar-dark bg-dark sticky-top" aria-label="Second navbar example">
                    <div className="container-fluid">
                        <a className="navbar-brand fw-bold" href="/">Paper Tracker</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarsExample02">
                            <ul className="navbar-nav me-auto">

                                <li className="nav-item">
                                    <Link href="/add_paper" className="nav-link">Add Paper</Link>
                                </li>

                                <li className="nav-item">
                                    <Link href="/statistics" className="nav-link">Dashboard</Link>
                                </li>


                            </ul>
                            <div className="d-flex align-items-center gap-3">
                                <button className="btn btn-outline-light rounded-pill px-3" type="button" onClick={() => signOut({ callbackUrl: '/' })}>
                                    Sign Out
                                </button>
                                <Image
                                    src={session?.user.image}
                                    alt="Profile"
                                    width={37}
                                    height={37}
                                    className="rounded-circle"
                                />

                            </div>





                        </div>
                    </div>
                </nav>
            )}
        </>
    )
}

export default Nav
