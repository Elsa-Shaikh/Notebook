import React from "react";
import Notes from "../components/Notes";

function Home({ showAlert }) {
  return (
    <>
      <div className="container mt-5">
        <Notes showAlert={showAlert} />
      </div>
    </>
  );
}
export default Home;
