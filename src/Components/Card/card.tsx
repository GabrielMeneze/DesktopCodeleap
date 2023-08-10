// Import necessary React components and hooks
import React from "react";
import { useSelector } from 'react-redux'
import { ModalDelete } from "../Modals/deleteModal/delete";
import { ModalPath } from "../Modals/editModal/path";
// Import Bootstrap CSS and icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// Import CSS file for card component
import "./card.css";

interface CardProps {
  key: number;
  content: string;
  username: string;
  title: string;
  cardid: number;
  attGetList: (value: boolean) => void;
}

// Define Card component
export const Card: React.FC<CardProps> = ({ content, username, title, cardid, attGetList }) => {

  // Define state for delete and edit modals
  const [deletemodal, setDeletemodal] = React.useState(false)
  const [pathmodal, setPathmodal] = React.useState(false)
  // Get current user's ID using useSelector hook
  const userid = useSelector((state: any) => state.id)

  // Render card component
  return (
    <article className="card col-12 col-md-8 mx-auto mb-4 bg-dark">
  <div className="card-body">
    <div className="d-flex align-items-center justify-content-between mb-3">
      <div className="d-flex align-items-center">
        <img
          src="https://via.placeholder.com/48"
          className="rounded-circle me-3"
        />
        <div>
          <h5 className="card-title m-0 colors">{title}</h5>
          <small className="text-muted">@{username}</small>
        </div>
      </div>
      {/* Show edit and delete buttons only if user's ID matches card's ID */}
      {userid.includes(cardid) &&
        <div>
          {/* Edit button opens edit modal */}
          <button className="btn btn-link me-3" onClick={() => {setPathmodal(true);}}>
            <i className="bi bi-pencil" style={{ fontSize: "1.2rem" }}></i>
          </button>
           {/* Edit modal passes necessary props to ModalPath component */}
          <ModalPath show={pathmodal} onHide={() => setPathmodal(false)} userid={userid} title={title} content={content} cardid={cardid} attGetList={attGetList}/>

          {/* Delete button opens delete modal */}
          <button className="btn btn-link" onClick={() => { setDeletemodal(true) }}>
            <i className="bi bi-trash" style={{ fontSize: "1.2rem" }}></i>
          </button>
          {/* Delete modal passes necessary props to ModalDelete component */}
          <ModalDelete show={deletemodal} onHide={() => setDeletemodal(false)} cardid={cardid} attGetList={attGetList} />
        </div>
      }
    </div>
    <p className="card-text colors">{content}</p>
  </div>
</article>
  );
};