import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

export default function FooterC() {
  return (
    <MDBFooter
      className="text-center text-dark py-4"
      style={{
        marginTop: "auto",
        backgroundColor: "#f5f5dc", // Beige color
      }}
    >
      <div>
        <h6>IssueTracker</h6>
        <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
      </div>
    </MDBFooter>
  );
}
