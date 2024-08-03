import React from "react";
import "../styles/Sidebar.Module.css";

const Sidebar = ({
  setNoteBtnClick,
  noteGroups,
  setSelectedNote,
  selectedNote,
  isMobile,
  display,
  setDisplay,
}) => {
  const handleSelect = (note) => {
    if (isMobile) {
      setDisplay(true);
    }
    setSelectedNote(note);
  };

  const getInitials = (name) => {
    const words = name.split(" ");
    if (words.length === 1) {
      // Single word
      return words[0].charAt(0).toUpperCase();
    } else if (words.length >= 2) {
      // Two or more words
      return `${words[0].charAt(0).toUpperCase()}${words[1].charAt(0).toUpperCase()}`;
    }
    return "";
  };

  return (
    <div
      className={`sidebar ${isMobile ? "mob-sidebar" : ""}`}
      style={{ display: isMobile && display ? "none" : "" }}
    >
      <div className="sidebar-heading">
        <p className="sidebar-title">Sticky Notes</p>
      </div>
      <div className="sidebar-notes-list flex justify-start">
        {noteGroups &&
          noteGroups.map((note, index) => {
            const initials = getInitials(note.name);

            return (
              <div
                className={`sidebar-note-element flex flex-row justify-start ${
                  note.id === selectedNote.id ? "note-selected" : ""
                }`}
                key={index}
                onClick={() => handleSelect(note)}
              >
                <div
                  className="circle note-list-icon flex"
                  style={{ marginRight: "0.5rem", backgroundColor: note.color }}
                >
                  {initials}
                </div>
                <p className="sidebar-note-title">{note.name}</p>
              </div>
            );
          })}
      </div>
      <button
        className="create-notes flex flex-row"
        onClick={() => setNoteBtnClick(true)}
      >
        <svg
          style={{ marginRight: "0.5rem" }}
          width="12"
          height="22"
          viewBox="0 0 21 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.1522 8.13587V12.4498H0.312071V8.13587H20.1522ZM12.5581 0.0248901V21.0975H7.92606V0.0248901H12.5581Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;
