/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addPinnedNote,
	addGeneralNote,
	unpinNote,
	deletePinnedNote,
	deleteGeneralNote,
	openNote,
} from "../../actions";
import NoteOverlay from "../NoteOverLay/NoteOverLay";
import "./NoteTaking.css";

const NoteTaking = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");

	const dispatch = useDispatch();
	const pinnedNotes = useSelector((state) => state.pinnedNotes);
	const generalNotes = useSelector((state) => state.generalNotes);

	const handleExpand = () => {
		setIsExpanded(true);
	};

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleNoteChange = (e) => {
		setNote(e.target.value);
	};

	const handlePin = () => {
		dispatch(addPinnedNote({ title, note }));
		resetForm();
	};

	const handleClose = () => {
		dispatch(addGeneralNote({ title, note }));
		resetForm();
	};

	const handleUnpin = (index) => {
		dispatch(unpinNote(index));
	};

	const handleDeletePinned = (index) => {
		dispatch(deletePinnedNote(index));
	};

	const handleDeleteGeneral = (index) => {
		dispatch(deleteGeneralNote(index));
	};

	const handleOpenNote = (note, isPinned, index) => {
		dispatch(openNote(note, isPinned, index));
	};

	const resetForm = () => {
		setTitle("");
		setNote("");
		setIsExpanded(false);
	};

	return (
		<div className="note-taking">
			{isExpanded ? (
				<div className="textarea-container">
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
						<button onClick={handlePin} className="note-action-button">
							Pin
						</button>
						<button onClick={handleClose} className="note-action-button">
							Close
						</button>
					</div>
				</div>
			) : (
				<input
					type="text"
					placeholder="Take a note..."
					onClick={handleExpand}
					className="note-input"
				/>
			)}
			<div className="notes-section">
				<h5>Pinned Notes</h5>
				<div className="notes-grid">
					{pinnedNotes.map((note, index) => (
						<div
							key={index}
							className="note-card"
							onClick={() => handleOpenNote(note, true, index)}>
							<h3>{note.title}</h3>
							<p>{note.note}</p>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleUnpin(index);
								}}
								className="note-action-button">
								Unpin
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleDeletePinned(index);
								}}
								className="note-action-button">
								Delete
							</button>
						</div>
					))}
				</div>
				<h5>Other Notes</h5>
				<div className="notes-grid">
					{generalNotes.map((note, index) => (
						<div
							key={index}
							className="note-card"
							onClick={() => handleOpenNote(note, false, index)}>
							<h3>{note.title}</h3>
							<p>{note.note}</p>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleDeleteGeneral(index);
								}}
								className="note-action-button">
								Delete
							</button>
						</div>
					))}
				</div>
			</div>
			<NoteOverlay />
		</div>
	);
};

export default NoteTaking;
