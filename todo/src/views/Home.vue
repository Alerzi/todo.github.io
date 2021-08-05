<template>
	<div style="position: relative;">
		<h1>Notes</h1>
		<div class="todo__create">
			<button class="btn__create" @click="noteDisplay = true">Создать новую заметку</button>
		</div>
		<div class="create__note" :class="noteDisplay ? '' : 'note__display'">
			<div class="create__note-inner">
				<div class="create__note-item">
					<h4>Создать новую заметку</h4>
					<div class="create__note-name">
						<p>Note Name:</p>
						<input type="text" v-model="newNote.title">
					</div>
					<button @click="createNote">Создать</button>
					<button @click="createNoteCancle">Отмена</button>
				</div>
			</div>
		</div>
		<div class="todo">
			<div class="todo__list" v-for="(note, index) in notes" :key="note.title">
				<h3>{{ index + 1 }}. {{ note.title }}</h3>
				<a class="btn__change" :href="'/editNote/' + note.id">Изменить</a>
				<button class="btn__delete" @click="deleteNoteConfirm(index, note.id)">Удалить</button>
				<div class="todo__list-content">
					<div class="todo__list-items" v-for="(message, index) in note.message" :key="message.name">
						<div class="todo__list-item" v-if="index <= 1">
							<div class="todo__list-name"><span>Todo Title:</span> {{ message.name }}</div>
							<div class="todo__list-text"><span>Todo Text:</span> {{ message.text }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="todo__delete" :class="deleteDisplay ? '' : 'note__display'">
			<h4>Удалить эту заметку?</h4>
			<button class="btn__confirm-delete" @click="deleteNote">Да</button><button class="btn__confirm-cancle" @click="deleteNoteCancle">Нет</button>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	export default {
		data() {
			return {
				index: "",
				notes: [],
				newNote: {
					title: "",
					message: [],
				},
				noteDisplay: false,
				remove: {
					note: "",
					id: "",
				},
				deleteDisplay: false,
			}
		},
		methods: {
			createNote() {
				axios.post("http://localhost:3000/notes", {title: this.newNote.title, message: this.newNote.message});
				this.notes.push(this.newNote);
				this.noteDisplay = false;
			},
			createNoteCancle() {
				this.noteDisplay = false;
			},
			deleteNoteConfirm(index, id) {
				this.remove.note = index;
				this.remove.id = id;
				this.deleteDisplay = true;
			},
			deleteNoteCancle() {
				this.remove.note = "";
				this.remove.id = "";
				this.deleteDisplay = false;
			},
			deleteNote() {
				axios.delete("http://localhost:3000/notes/" + this.remove.id);
				this.notes.splice(this.remove.note, 1);
				this.deleteDisplay = false;
			}
		},
		watch: {
			notes() {
				axios.get("http://localhost:3000/notes")
				.then((notes) => {
					this.notes = notes.data;
				})
				.catch((error) => {
					console.log(error);
				})
			}
		},
		mounted() {
			axios.get("http://localhost:3000/notes")
				.then((notes) => {
					this.notes = notes.data;
				})
				.catch((error) => {
					console.log(error);
				})
		}
	}
</script>

<style scoped>
	.todo__delete {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 10px;
		background-color: lightcoral;
		padding: 20px 20px;
	}
	.todo__delete h4 {
		margin: 0 0 10px;
	}
	.btn__confirm-delete {
		border-radius: 5px;
		border: transparent;
		background-color: green;
		padding: 10px;
		width: 50%;
		cursor: pointer;
	}
	.btn__confirm-cancle {
		border-radius: 5px;
		border: transparent;
		background-color: red;
		padding: 10px;
		width: 50%;
		cursor: pointer;
	}
	.note__display {
		display: none;
	}
	.create__note {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 1;
		background-color: lightgrey;
	}
	.create__note-inner {
		position: relative;
	}
	.create__note-item {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%);
	}
	.create__note-name input {
		width: 95%;
	}
	.create__note-item button {
		margin-top: 10px;
		border: transparent;
		border-radius: 5px;
		background-color: yellow;
		padding: 15px;
		width: 100%;
		cursor: pointer;
	}
	h3 {
		font-size: 22px;
		margin: 0 auto 5px;
	}
	.btn__create {
		border: transparent;
		background-color: green;
		color: white;
		border-radius: 5px;
		padding: 10px;
		margin: 0 5px;
		cursor:  pointer;
		margin-bottom: 10px;
	}
	.btn__change {
		border: transparent;
		background-color: red;
		color: white;
		border-radius: 5px;
		padding: 10px;
		margin: 0 5px;
		cursor:  pointer;
	}
	.btn__delete {
		border: transparent;
		background-color: black;
		color: white;
		border-radius: 5px;
		padding: 10px;
		margin: 0 5px;
		cursor:  pointer;
	} 
	.todo__list {
		margin-bottom: 20px;
	}
	.todo__list-content {
		margin-top: 10px;
	}
	.todo__list-item {
		margin-bottom: 10px;
		background-color: lightgrey;
		border-radius: 5px;
		padding: 10px;
	}
	.todo__list-name {
		font-size: 18px;
	}
	.todo__list-text {
		font-size: 14px;
	}
	.todo__list-name span {
		font-size: 20px;
	}
	.todo__list-text span {
		font-size: 20px;
	}
</style>