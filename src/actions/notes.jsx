import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import { fileUpload } from "../helpers/uploadFile";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
        dispatch(activeNote(docRef.id, newNote));
        dispatch(addNewNote(docRef.id, newNote));
    }
}
export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: { id, ...note }
})
export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})
export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))

    }
}
export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})
export const startSaveNotes = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!note.url) {
            delete note.url
        }
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
        dispatch(refreshNote(note.id, noteToFirestore));
        Swal.fire('Saved Success', note.title, 'success')
    }
}
export const refreshNote = (id, note) => ({
    type: types.notesUpdate,
    payload: {
        id,
        note: {
            id, ...note
        }
    }
})
export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active } = getState().notes;
        const fileUrl = await fileUpload(file)
        Swal.fire({
            title: 'Uploading....',
            text: 'Please Wait',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        })
        active.url = fileUrl;
        dispatch(startSaveNotes(active))
        setTimeout(() => { Swal.close(); }, 500)
    }
}
export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().auth;
            await db.doc(`/${uid}/journal/notes/${id.current}`).delete();
            dispatch(deleteNote(id))

        } catch (error) {
            console.log(error);
        }
    }
}
export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})
export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})