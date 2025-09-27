import React from "react";

function footer() {
  return (
    <footer className="footer">
      <div className="d-sm-flex justify-content-center justify-content-sm-between">
        <span className="text-center text-sm-left d-block d-sm-inline-block">
          Copyright ©{" "}
          <a href="https://www.bootstrapdash.com/" target="_blank">
            bootstrapdash.com
          </a>{" "}
          2020
        </span>
        <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
          Free{" "}
          <a href="https://www.bootstrapdash.com/" target="_blank">
            Bootstrap dashboard{" "}
          </a>
          templates from Bootstrapdash.com
        </span>
      </div>
    </footer>
  );
}

export default footer;
