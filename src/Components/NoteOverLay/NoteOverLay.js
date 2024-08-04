/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addPinnedNote,
	closeNote,
	updateNote,
	deleteGeneralNote,
} from "../../actions";
import "./NoteOverLay.css";

const NoteOverlay = () => {
	const dispatch = useDispatch();
	const openNote = useSelector((state) => state.openNote);
	const openNoteIndex = useSelector((state) => state.openNoteIndex);
	const openNoteIsPinned = useSelector((state) => state.openNoteIsPinned);

	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");

	useEffect(() => {
		if (openNote) {
			setTitle(openNote.title);
			setNote(openNote.note);
		}
	}, [openNote]);

	if (!openNote) {
		return null;
	}

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleNoteChange = (e) => {
		setNote(e.target.value);
	};

	const handlePin = () => {
		dispatch(deleteGeneralNote(openNoteIndex));
		dispatch(addPinnedNote({ title, note }));
		dispatch(closeNote());
	};

	const handleClose = () => {
		if (openNoteIsPinned) {
			dispatch(updateNote({ title, note }));
		} else {
			dispatch(updateNote({ title, note }));
		}
		dispatch(closeNote());
	};

	return (
		<div className="note-overlay">
			<div className="note-overlay-content">
				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={handleTitleChange}
					className="title-input"
				/>
				<textarea
					placeholder="Take a note..."
					value={note}
					onChange={handleNoteChange}
					className="note-textarea"></textarea>
				<div className="note-actions">
					{!openNoteIsPinned && (
						<button onClick={handlePin} className="note-action-button">
							Pin
						</button>
					)}
					<button onClick={handleClose} className="note-action-button">
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default NoteOverlay;
