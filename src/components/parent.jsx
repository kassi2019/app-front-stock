import React from "react";
import Header from "./header.jsx";
import Sidebar from "./sidebar.jsx";
import HeaderMini from "./headerMini";
import Footer from "./footer";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
function Parent() {
  useEffect(() => {
    const shouldReload = sessionStorage.getItem("shouldReloadHome");

    if (shouldReload) {
      sessionStorage.removeItem("shouldReloadHome");
      window.location.reload();
    }
  }, []);
  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
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

            {/* <div className="row  mt-3">
              <div className="col-xl-5 d-flex grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                     <Outlet />
                    
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Parent;
