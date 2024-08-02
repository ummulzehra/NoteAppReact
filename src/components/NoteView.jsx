import React from "react";
import "../styles/NoteView.Module.css";

import NoteHeader from "./NoteHeader";
import Input from "./Input";

const NoteView = ({ name, color, id, isMobile, display, setDisplay }) => {
  const [notes, setNotes] = React.useState([]);
  const [groupId, setGroupId] = React.useState("");
  const [newNote, setNewNote] = React.useState({});

  React.useEffect(() => {
    const noteGroups = JSON.parse(localStorage.getItem("noteGroups"));
    const groupIndex = noteGroups.findIndex((group) => group.id === id);
    if (groupIndex === -1) {
      console.error(`Group with ID ${id} not found`);
      return;
    }
    const group = noteGroups[groupIndex];
    setGroupId(group.id);
    setNotes([...group.notes], newNote);
    console.log(group.notes);
  }, [id, newNote, setNewNote]);

  const handleNewNote = (value) => {
    console.log("new note");
    setNewNote(value);
    setNotes([...notes], newNote);
  };

  return (
    <div
      className="note-view-container flex  justify-start"
      style={{ display: isMobile && !display ? "none" : "" }}
    >
      <NoteHeader
        name={name}
        color={color}
        isMobile={isMobile}
        display={display}
        setDisplay={setDisplay}
      />
      {groupId === id &&
        notes &&
        notes.map((note, index) => {
          return (
            <div className="note-view flex flex-row justify-start " key={index}>
              <div className="time-contatiner">
                <p className="date">
                  {note &&
                    note.time.substring(0, 4) + note.time.substring(7, 11)}
                </p>
                <p className="time">{note && note.date}</p>
              </div>
              <div className="note">{note.content}</div>
            </div>
          );
        })}
        {notes && notes.length<=0 ? <p className="example-txt">Start Writing Notes Here!</p> : ""}

      <Input id={id} handleNewNote={handleNewNote} />
    </div>
  );
};

export default NoteView;
