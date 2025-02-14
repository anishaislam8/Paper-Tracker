"use client";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@styles/globals.css';
import Nav from '@components/Nav';


import Provider from '@components/Provider';

const RootLayout = ({ children }) => {


    return (
      <html lang="en">
        
          <body>
              <Provider>
                   <div>
                      <Nav />
                      {children}
                  </div>
              </Provider>
          </body>
      </html>
    )
  }
  
  export default RootLayout