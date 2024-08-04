/** @format */

import {
	ADD_PINNED_NOTE,
	ADD_GENERAL_NOTE,
	UNPIN_NOTE,
	DELETE_PINNED_NOTE,
	DELETE_GENERAL_NOTE,
	OPEN_NOTE,
	CLOSE_NOTE,
	UPDATE_NOTE,
} from "./actions";

const initialState = {
	pinnedNotes: [],
	generalNotes: [],
	openNote: null,
	openNoteIndex: null,
	openNoteIsPinned: null,
};

const notesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_PINNED_NOTE:
			return {
				...state,
				pinnedNotes: [...state.pinnedNotes, action.payload],
			};
		case ADD_GENERAL_NOTE:
			return {
				...state,
				generalNotes: [...state.generalNotes, action.payload],
			};
		case UNPIN_NOTE:
			const noteToUnpin = state.pinnedNotes[action.payload];
			return {
				...state,
				pinnedNotes: state.pinnedNotes.filter(
					(_, index) => index !== action.payload
				),
				generalNotes: [...state.generalNotes, noteToUnpin],
			};
		case DELETE_PINNED_NOTE:
			return {
				...state,
				pinnedNotes: state.pinnedNotes.filter(
					(_, index) => index !== action.payload
				),
			};
		case DELETE_GENERAL_NOTE:
			return {
				...state,
				generalNotes: state.generalNotes.filter(
					(_, index) => index !== action.payload
				),
			};
		case OPEN_NOTE:
			return {
				...state,
				openNote: action.payload.note,
				openNoteIndex: action.payload.index,
				openNoteIsPinned: action.payload.isPinned,
			};
		case CLOSE_NOTE:
			return {
				...state,
				openNote: null,
				openNoteIndex: null,
				openNoteIsPinned: null,
			};
		case UPDATE_NOTE:
			if (state.openNoteIsPinned) {
				return {
					...state,
					pinnedNotes: state.pinnedNotes.map((note, index) =>
						index === state.openNoteIndex ? action.payload : note
					),
				};
			} else {
				return {
					...state,
					generalNotes: state.generalNotes.map((note, index) =>
						index === state.openNoteIndex ? action.payload : note
					),
				};
			}
		default:
			return state;
	}
};

export default notesReducer;
