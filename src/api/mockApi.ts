import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Task } from "../interfaces/Task";
import { v4 as uuid4 } from "uuid";
import { TokenEnum } from "../enums/tokenEnum";
import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from "../utils/localStorageHelpers";

let tasks: Task[] = loadTasksFromLocalStorage().length
  ? loadTasksFromLocalStorage()
  : [
      { id: uuid4(), title: "Buy groceries", completed: false },
      { id: uuid4(), title: "Go for a walk", completed: true },
      { id: uuid4(), title: "Write code", completed: false },
    ];

const mock = new MockAdapter(axios, { delayResponse: 500 });

mock.onGet("/tasks").reply((config) => {
  const token = config.headers?.Authorization?.split(" ")[1];

  if (token === TokenEnum.AUTH_TOKEN) {
    return [200, tasks];
  } else {
    return [401, { message: "Unauthorized" }];
  }
});

mock.onPost("/tasks/post").reply((config) => {
  const token = config?.headers?.Authorization?.split(" ")[1];

  if (token === TokenEnum.AUTH_TOKEN) {
    const newTask = JSON.parse(config.data);
    newTask.id = uuid4();
    newTask.completed = false;
    tasks.push(newTask);
    saveTasksToLocalStorage(tasks);
    return [200, newTask];
  } else {
    return [401, { message: "Unauthorized" }];
  }
});

mock.onPut(/\/tasks\/\w+/).reply((config) => {
  const token = config?.headers?.Authorization?.split(" ")[1];

  if (token === TokenEnum.AUTH_TOKEN) {
    const updatedTask = JSON.parse(config.data);
    tasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
    saveTasksToLocalStorage(tasks);
    return [200, updatedTask];
  } else {
    return [401, { message: "Unauthorized" }];
  }
});
