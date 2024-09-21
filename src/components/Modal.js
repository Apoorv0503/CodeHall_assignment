import React from 'react';

const Modal = ({ authorDetails, closeModal }) => {

    console.log("modal open with1: ",authorDetails);
    if (!authorDetails) return null; // Don't render if no author details are available
  
    console.log("modal open with: ",authorDetails);
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h2>{authorDetails.name}</h2>
          <img
            src={authorDetails.photo_url || 'https://via.placeholder.com/150?text=No+Image'}
            alt={authorDetails.name}
            className="author-photo"
          />
          <p>{authorDetails.bio}</p>
        </div>
      </div>
    );
  };
  
export default Modal;

