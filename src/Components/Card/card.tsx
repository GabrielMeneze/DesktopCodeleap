// Import necessary React components and hooks
import React from "react";
import { useSelector } from 'react-redux';
import { ModalDelete } from "../Modals/deleteModal/delete";
import { ModalPath } from "../Modals/editModal/path";
// CSS and icons imports
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./card.css";

// Interface defining the types of the props for the Card component
interface CardProps {
  key: number;
  content: string;
  username: string;
  title: string;
  cardid: number;
  attGetList: (value: boolean) => void;
}

const Card: React.FC<CardProps> = ({ content, username, title, cardid, attGetList }) => {
  // State for controlling the visibility of delete and edit modals
  const [deletemodal, setDeletemodal] = React.useState(false);
  const [pathmodal, setPathmodal] = React.useState(false);
  // Fetching the current user's ID from the Redux store
  const userid = useSelector((state: any) => state.id);

  return (
    <article className="card col-12 col-md-8 mx-auto mb-4 bg-dark">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            {/* User avatar */}
            <img src="https://via.placeholder.com/48" className="rounded-circle me-3" alt="User avatar"/>
            <div>
              {/* Displaying card's title and username */}
              <h5 className="card-title m-0 colors">{title}</h5>
              <small className="text-muted">@{username}</small>
            </div>
          </div>
          {/* Display edit and delete buttons only if the current user's ID matches card's ID */}
          {userid.includes(cardid) && (
            <div>
              {/* Button to open the edit modal */}
              <button className="btn btn-link me-3" onClick={() => setPathmodal(true)}>
                <i className="bi bi-pencil" style={{ fontSize: "1.2rem" }}></i>
              </button>
              {/* Edit modal */}
              <ModalPath show={pathmodal} onHide={() => setPathmodal(false)} title={title} content={content} cardid={cardid} attGetList={attGetList}/>

              {/* Button to open the delete modal */}
              <button className="btn btn-link" onClick={() => setDeletemodal(true)}>
                <i className="bi bi-trash" style={{ fontSize: "1.2rem" }}></i>
              </button>
              {/* Delete modal */}
              <ModalDelete show={deletemodal} onHide={() => setDeletemodal(false)} cardid={cardid} attGetList={attGetList} />
            </div>
          )}
        </div>
        {/* Displaying card's content */}
        <p className="card-text colors">{content}</p>
      </div>
    </article>
  );
};

export default Card;