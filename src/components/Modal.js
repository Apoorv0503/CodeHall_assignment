import React from 'react';

const Modal = ({ showModal, authorDetails, closeModal }) => {

    console.log("modal clicked with: ",authorDetails)
  if (!showModal) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>X</button>
        <img src={authorDetails.photo_url} alt="Author" className="author-photo" />
        <h2>{authorDetails.name}</h2>
        <p>{authorDetails.bio}</p>
      </div>
    </div>
  );
};

export default Modal;
