import React from "react";
import "../styles/NoteView.Module.css";
import NoteHeader from "./NoteHeader";
import Input from "./Input";

const NoteView = ({ name, color, id, isMobile, display, setDisplay }) => {
  const [notes, setNotes] = React.useState([]);
  const [groupId, setGroupId] = React.useState("");
  const [newNote, setNewNote] = React.useState({});
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const noteGroups = JSON.parse(localStorage.getItem("noteGroups"));
    const groupIndex = noteGroups.findIndex((group) => group.id === id);
    if (groupIndex === -1) {
      console.error(`Group with ID ${id} not found`);
      return;
    }
    const group = noteGroups[groupIndex];
    setGroupId(group.id);
    setNotes(group.notes || []);
  }, [id, newNote]);

  const handleNewNote = (value) => {
    setNewNote(value);
    setNotes([...notes, value]);
  };

  // Function to format the date
  const formatDate = (dateStr) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };

  // Share individual note
  const shareNote = (note) => {
    const shareData = {
      title: 'Note',
      text: note.content,
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      console.log("Share API not supported");
    }
  };

  // Share entire group of notes
  const shareGroup = () => {
    const notesContent = notes.map(note => note.content).join('\n\n');
    const shareData = {
      title: 'Notes Group',
      text: notesContent,
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      console.log("Share API not supported");
    }
  };

  // Export notes as a text file
  const exportNotesAsFile = () => {
    const notesContent = notes.map(note => note.content).join('\n\n');
    const blob = new Blob([notesContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="note-view-container"
      style={{ display: isMobile && !display ? "none" : "" }}
    >
      <NoteHeader
        name={name}
        color={color}
        isMobile={isMobile}
        display={display}
        setDisplay={setDisplay}
      />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <button onClick={shareGroup} className="share-group-button">Share Group</button>
      <button onClick={exportNotesAsFile} className="export-group-button">Export Group as File</button>
      <div className="notes-list">
        {groupId === id &&
          filteredNotes.length > 0 &&
          filteredNotes.map((note, index) => (
            <div className="note-box" key={index}>
              <div className="note-content">{note.content}</div>
              <div className="note-footer">
                <div className="note-date-time">
                  <span className="note-date">{formatDate(note.date)}</span>
                  <span className="bullet">•</span>
                  <span className="note-time">{note.time}</span>
                </div>
                <button onClick={() => shareNote(note)} className="share-note-button">Share Note</button>
              </div>
            </div>
          ))}
        {groupId === id && filteredNotes.length === 0 && (
          <p className="example-txt">No notes found matching your search!</p>
        )}
        {notes.length <= 0 && (
          <p className="example-txt">Start Writing Notes Here!</p>
        )}
      </div>
      <Input id={id} handleNewNote={handleNewNote} />
    </div>
  );
};

export default NoteView;
