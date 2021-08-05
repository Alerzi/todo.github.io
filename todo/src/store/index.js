import { createStore } from 'vuex'
import axios from "axios"

export default createStore({
  state: {
    notes: [],
    editNote: "",
  },
  mutations: {
    SET_NOTE_TO_NOTES: (state, notes) => {
      state.notes = notes;
    },
    CREATE_NEW_NOTE: (state, newNote) => {
      state.notes.push(newNote);
    },
    DELETE_FROM_NOTE: (state, index) => {
      state.notes.splice(index, 1);
    },
    SET_EDIT_NOTE: (state, index) => {
      state.editNote = index;
    }
  },
  actions: {
    GET_NOTES_FROM_API({commit}) {
      return axios.get("http://localhost:3000/notes")
        .then((notes) => {
          commit("SET_NOTE_TO_NOTES", notes.data);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    ADD_NEW_NOTE({commit}, newNote) {
      commit("CREATE_NEW_NOTE", newNote);
      axios.post("http://localhost:3000/notes", {title: newNote.title, message: newNote.message});
    },
    REMOVE_FROM_NOTE({commit}, index) {
      commit("DELETE_FROM_NOTE", index.note);
      axios.delete("http://localhost:3000/notes/" + index.id);
    },
    ADD_EDIT_NOTE({commit}, index) {
      commit("SET_EDIT_NOTE", index);
    }
  },
  getters: {
    NOTES(state) {
      return state.notes;
    },
    EDITNOTE(state) {
      return state.editNote;
    }
  }
})
