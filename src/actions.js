/** @format */

export const ADD_PINNED_NOTE = "ADD_PINNED_NOTE";
export const ADD_GENERAL_NOTE = "ADD_GENERAL_NOTE";
export const UNPIN_NOTE = "UNPIN_NOTE";
export const DELETE_PINNED_NOTE = "DELETE_PINNED_NOTE";
export const DELETE_GENERAL_NOTE = "DELETE_GENERAL_NOTE";
export const OPEN_NOTE = "OPEN_NOTE";
export const CLOSE_NOTE = "CLOSE_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";

export const addPinnedNote = (note) => ({
	type: ADD_PINNED_NOTE,
	payload: note,
});

export const addGeneralNote = (note) => ({
	type: ADD_GENERAL_NOTE,
	payload: note,
});

export const unpinNote = (index) => ({
	type: UNPIN_NOTE,
	payload: index,
});

export const deletePinnedNote = (index) => ({
	type: DELETE_PINNED_NOTE,
	payload: index,
});

export const deleteGeneralNote = (index) => ({
	type: DELETE_GENERAL_NOTE,
	payload: index,
});

export const openNote = (note, isPinned, index) => ({
	type: OPEN_NOTE,
	payload: { note, isPinned, index },
});

export const closeNote = () => ({
	type: CLOSE_NOTE,
});

export const updateNote = (note) => ({
	type: UPDATE_NOTE,
	payload: note,
});
