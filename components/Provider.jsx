"use client";
import { SessionProvider } from "next-auth/react";

/**
 * The Provider component is a wrapper component that provides the session object to the session provider.
 * @param {Object} props - The props object
 * @param {Object} props.children - The children prop
 * @param {Object} props.session - The session prop
 * @returns {Object} The Provider component
 * The Provider component is used to provide session context to its children components. The SessionProvider from next-auth/react manages the session state and makes it available to any child components that need to access the session information. This is typically used for authentication purposes in a Next.js application.
 */

const Provider = ({ children, session }) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
}

export default Provider;