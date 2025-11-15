import React from "react";

const Modal = ({ message, onYes, onNo, hideNo, noBtnScale }) => (
  <div className="modal">
    <div className="modal-content">
      <h2 dangerouslySetInnerHTML={{ __html: message }} />
      <div className="modal-buttons">
        <button id="yes-btn" onClick={onYes}>🎉 Yes</button>
        {!hideNo && (
          <button
            id="no-btn"
            onClick={onNo}
            style={{
              transform: `scale(${noBtnScale})`,
              transition: "transform 0.3s ease"
            }}
          >
            🙅 No
          </button>
        )}
      </div>
    </div>
  </div>
);

export default Modal;