import axios from 'axios';
import authHeader from './auth.header';

const API_URL = 'http://localhost:8080/api/';
const user = JSON.parse(localStorage.getItem('user'));

class TodoService {


    postSaveContent(todo) {
        return axios.post(API_URL + 'todoItem', {
            content: todo.content,
            active: true,
            userId: user.id
        }, { headers: authHeader() });
    }

    getTodoItems() {
        return axios.get(API_URL + 'todoItems', { headers: authHeader()});
    }

    updateTodoItems(todo) {
        return axios.put(API_URL + 'todoItem/' + todo.id, {
            content: todo.content,
            active: !todo.active,
            userId: user.id
        }, { headers: authHeader() });
    }

    deleteTodoItems(todoId) {
        return axios.delete(API_URL + 'todoItem/' + todoId, { headers: authHeader()});
    }

}

export default new TodoService();