<template>
	<div class="edit">
		<h1>Edit Note</h1>
		<div class="edit__btns">
			<button @click="saveChanges()">Сохранить изменения</button>
			<button @click="cancleChanges()">Отменить редактирование</button>
			<button @click="deleteThisTodo()">Удалить</button>
			<button @click="prevChanges()">Отменить внесенное изменение</button>
			<button @click="repeatChanges()">Повторить внесенное изменение</button>
		</div>
		<div class="create__todo" :class="createNewTodo ? '' : 'display'">
			<div class="todo__active"><input type="checkbox" value="true" id="active" v-model="active"><label for="active">Active</label></div>
			<div class="todo__name"><input type="text" v-model="newTodoName"></div>
			<div class="todo__text"><textarea v-model="newTodoText"></textarea></div>
			<div class="todo__create-btn"><button @click="createTodo()">Ok</button></div>
		</div>
		<div class="create__todo" :class="editTodoShow ? '' : 'display'">
			<div class="todo__active"><input type="checkbox" value="true" id="editActive" v-model="newActive"><label for="editActive">Active</label></div>
			<div class="todo__name"><input type="text" v-model="newName"></div>
			<div class="todo__text"><textarea v-model="newText"></textarea></div>
			<div class="todo__edit-btn"><button @click="editThisTodo()">Сохранить</button></div>
		</div>
		<div class="create__todo" :class="deleteTodoShow ? '' : 'display'">
			<h4>Удалить todo?</h4>
			<div class="todo__edit-btn"><button @click="deleteNote()">Да</button><button @click="deleteThisTodo()">Нет</button></div>
		</div>
		<div class="create__todo" :class="cancleTodoShow ? '' : 'display'">
			<h4>Отменить редактирование?</h4>
			<div class="todo__edit-btn"><button @click="returnToMainPage()">Да</button><button @click="cancleChanges()">Нет</button></div>
		</div>
		<div class="edit__content">
			<div class="edit__title">
				<div class="edit__prev"><span>Todo title:</span> {{ note.title }}</div>
				<div class="edit__new"><input type="text" v-model="newTitle"></div>
				<div class="edit__title-btn"><button @click="editTitle()">Ok</button></div>
			</div>
			<div class="edit__new-todo">
				<button @click="toggleTodo">Добавить todo</button>
			</div>
			<div class="edit__todo">
				<div class="edit__todo-item" v-for="(todo, index) in note.message" :key="todo.name">
					<div class="edit__edit-todo">
						<button @click="toggleEdit(index)">Редактировать todo</button>
					</div>	
					<div class="edit__todo-check"><input type="checkbox" :checked="note.message[index].active"><button @click="activeNote(index)">Активировать</button></div>
					<div class="edit__todo-main">
						<div class="edit__todo-name"><span>Todo name:</span> {{ todo.name }}</div>
					</div>
					<div class="edit__todo-message">
						<div class="edit__todo-text"><span>Todo text:</span> {{ todo.text }}</div>
					</div>
					<div class="todo__delete">
						<button @click="deleteTodo(index)">Удалить todo</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	export default {
		props: ["id"],
		data() {
			return {
				note: [],
				//change Title
				newTitle: "",
				prevTitle: "",
				//edit Todo
				newName: "",
				newText: "",
				newActive: false,
				index: "",
				//create Todo
				newTodoName: "",
				newTodoText: "",
				active: false,
				//show, hide form
				editTodoShow: false,
				createNewTodo: false,
				deleteTodoShow: false,
				cancleTodoShow: false,
			}
		},
		methods: {
			createTodo() {
				this.note.message.push({active: this.active, name: this.newTodoName, text: this.newTodoText});
				this.createNewTodo = !this.createNewTodo;
				this.active = false;
				this.newTodoName = "";
				this.newTodoText = "";
			},
			activeNote(index) {
				this.note.message[index].active = !this.note.message[index].active;
			},
			editTitle() {
				this.prevTitle = this.newTitle;
				this.note.title = this.newTitle;
				this.newTitle = "";
			},
			editThisTodo() {
				this.note.message[this.index].active = this.newActive;
				this.note.message[this.index].name = this.newName;
				this.note.message[this.index].text = this.newText;
				this.editTodoShow = !this.editTodoShow;
				this.newName = "";
				this.newText = "";
				this.newActive = false;
				this.index = "";
			},
			toggleTodo() {
				this.createNewTodo = !this.createNewTodo;
			},
			toggleEdit(index) {
				this.editTodoShow = !this.editTodoShow;
				this.index = index;
			},
			deleteTodo(index) {
				this.note.message.splice(index, 1);
			},
			deleteThisTodo() {
				this.deleteTodoShow = !this.deleteTodoShow;
			},
			deleteNote() {
				axios.delete("http://localhost:3000/notes/" + this.id)
				.then((notes) => {
					console.log(notes);
					this.note = notes.data;
				})
				.catch((error) => {
					console.log(error);
				});
				this.deleteTodoShow = !this.deleteTodoShow;
			},
			prevChanges() {
				axios.get("http://localhost:3000/notes/" + this.id)
				.then((notes) => {
					this.note = notes.data;
				})
				.catch((error) => {
					console.log(error);
				})
			},
			repeatChanges() {
				this.note.title = this.prevTitle;
			},
			saveChanges() {
				axios.put("http://localhost:3000/notes/" + this.id, this.note)
				.then((notes) => {
					this.note = notes.data;
				})
				.catch((error) => {
					console.log(error);
				});
				
			},
			cancleChanges() {
				this.cancleTodoShow = !this.cancleTodoShow;
			},
			returnToMainPage() {
				window.location.replace("/");
			}
		},
		mounted() {
			axios.get("http://localhost:3000/notes/" + this.id)
				.then((notes) => {
					this.note = notes.data;
				})
				.catch((error) => {
					console.log(error);
				})
		}
	}
</script>

<style scoped>
	.edit {
		position: relative;
	}
	.edit__new-todo {
		margin-bottom: 20px;
	}
	.edit__new-todo button {
		border: transparent;
		border-radius: 5px;
		background-color: green;
		padding: 10px;
		cursor: pointer;
	}
	.edit__edit-todo {
		margin-bottom: 20px;
	}
	.edit__edit-todo button {
		border: transparent;
		border-radius: 5px;
		background-color: yellow;
		padding: 10px;
		cursor: pointer;
	}
	.todo__delete {
		margin-top: 10px;
	}
	.todo__delete button {
		border: transparent;
		border-radius: 5px;
		background-color: red;
		padding: 10px;
		cursor: pointer;
		margin-bottom: 30px;
	}
	.display {
		display: none;
	}
	.create__todo {
		position: fixed;
		top:  50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 500px;
		height: 200px;
		background-color: lightcyan;
		border-radius: 10px;
		padding: 20px;
		border: 2px solid lightsteelblue;
	}
	.todo__active {
		margin-bottom: 10px;
		text-align: center;
	}
	.todo__name {
		text-align: center;
		margin-bottom: 10px;
	}
	.todo__name input {
		width: 90%;
	}
	.todo__text {
		margin-bottom: 20px;
		text-align: center;
	}
	.todo__text textarea {
		width: 90%;
		height: 70px;
	}
	.todo__create-btn {
		text-align: center;
	}
	.todo__create-btn button {
		border-radius: 5px;
		border:  transparent;
		background-color: lightsalmon;
		padding: 10px;
		width: 90%;
		cursor: pointer;
	}
	.todo__edit-btn {
		text-align: center;
	}
	.todo__edit-btn button {
		border-radius: 5px;
		border:  transparent;
		background-color: lightgoldenrodyellow;
		padding: 10px;
		width: 90%;
		cursor: pointer;
		margin-bottom: 10px;
	}
	span {
		font-size: 20px;
		font-weight: bold;
	}
	.edit__btns {
		margin-bottom: 10px;
	}
	.edit__title {
		margin-bottom: 20px;
	}
	.edit__title-btn {
		margin-top: 5px;
	}
	.edit__todo-check {
		margin-bottom: 10px;
	}
	.edit__todo-main {
		margin-bottom: 10px;
	}
	.edit__todo-message {
		margin-bottom: 10px;
	}
</style>