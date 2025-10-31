import React from "react";
import Header from "./header.jsx";
import HeaderMini from "./headerMini";
// import Footer from "./footer";
//import { useEffect } from "react";

import Milieu from "./milieu.jsx";
function Parent() {
  // useEffect(() => {
  //   const shouldReload = sessionStorage.getItem("shouldReloadHome");

  //   if (shouldReload) {
  //     sessionStorage.removeItem("shouldReloadHome");
  //     window.location.reload();
  //   }
  // }, []);

  return (
    <>
      <Header />
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <HeaderMini />
          <div className="card-body">
            <Milieu />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Parent;

{
  /* <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <HeaderMini />
            <div className="row">
              <div className="col-lg-12 d-flex grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>

         
          </div>
          <Footer />
        </div>
      </div> */
}
