<template>
  <div class="container my-5">
    <h2 class="text-center">Todo List</h2>
    <div class="row d-flex justify-content-center">
      <div class="col-xs-12 col-lg-6 my-3">
          <div class="row">
            <div class="col-12">
              <Form @submit="handleSaveTodo" :validation-schema="schema">
                <div class="form-group">
                  <label for="content">Enter New Todo</label>
                  <Field name="content" type="text" class="form-control" />
                  <ErrorMessage name="content" class="error-feedback" />
                </div>
                <div class="form-group">
                  <button class="btn btn-primary btn-block" :disabled="loading">
                    <span
                        v-show="loading"
                        class="spinner-border spinner-border-sm"
                    ></span>
                    <span>Add</span>
                  </button>
                </div>

                <div class="form-group">
                  <div
                      v-if="message"
                      class="alert"
                      :class="successful ? 'alert-success' : 'alert-danger'"
                  >
                    {{ message }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
              </Form>

            </div>

          </div>
      </div>
    </div>

    <div class="row d-flex justify-content-center mt-3" v-if="TodoList.length">
      <div class="col-md-6">
        <div v-for="todo in TodoList" v-bind:key="todo.id" class="row todoClass">
          <div class="col-8">
            <span v-bind:style="!todo.active ? 'text-decoration:line-through;' : ''">{{ todo.content }}</span>
          </div>
          <div class="col-2">
            <span @click="setDeactive(todo)">
              <input type="checkbox" role="switch" :checked="!todo.active" />
            </span>
          </div>
          <div class="col-2">
            <button class="btn btn-danger btn-sm" @click="deleteTodo(todo.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import TodoService from "../services/todo.service";

export default {
  name: 'Todo',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const schema = yup.object().shape({
      content: yup
          .string()
          .required("Content is required!")
    });

    return {
      TodoList: [],
      successful: false,
      loading: false,
      message: "",
      schema
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (!this.loggedIn) {
      this.$router.push("/login");
    }

    this.listTodoItems();
  },
  methods: {
    async handleSaveTodo(todo) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.TodoList = [];

      TodoService.postSaveContent(todo).then(
          (response) => {
            this.message = response.data.message;
            this.successful = true;
            this.loading = false;
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );

      this.$router.go();
    },
    async listTodoItems() {
      this.TodoList = [];

      TodoService.getTodoItems().then(
          (response) => {
            this.TodoList = response.data;
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
    async setDeactive(todo) {
      this.TodoList = [];
      this.successful = false;

      TodoService.updateTodoItems(todo).then(
          (response) => {
            this.message = response.data.message;
            this.successful = true;
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );

      this.$router.go();
    },
    async deleteTodo(todoId) {
      this.TodoList = [];
      this.successful = false;

      TodoService.deleteTodoItems(todoId).then(
          (response) => {
            this.message = response.data.message;
            this.successful = true;
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );

      this.$router.go();
    }

  }

};
</script>

<style scoped>
  .todoClass {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 24px;
    border-radius: 6px;
    margin-bottom: 12px;
    border: 2px solid hsla(0, 0%, 0%, 0.35);
    list-style-type: none;
  }
</style>