const form = document.querySelector("form");
const task = document.querySelector("#task");
const small = document.querySelector("small");
const todos = [];

document.addEventListener("DOMContentLoaded", () => {
  const old = JSON.parse(localStorage.getItem("todos"));
  if (old) {
    old.forEach((old) => {
      todos.push(old)
      task.innerHTML += `<div>
  <input type="checkbox" class="form-check-input me-3">
  <label class='form-check-label'>${old}</label>
  <i class="bi bi-trash text-danger float-end"></i>
  </div>`;
    });
    select();
    del();
  }
});


const create = (x) => {
  x.preventDefault();
  if (form.todo.value.trim().length === 0) {
    small.style.display = "block";
  } else {
    small.style.display = "none";
    task.innerHTML += `<div>
    <input type="checkbox" class="form-check-input me-3">
    <label class='form-check-label'>${form.todo.value}</label>
    <i class="bi bi-trash text-danger float-end"></i>
    </div>`;
    todos.push(form.todo.value);
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("todo added:", form.todo.value);
    form.reset();
    select();
    del();
    console.log(todos);
  }
};

const del = () => {
  const icons = document.querySelectorAll("i");
  icons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const removed = this.previousElementSibling.innerText;
      this.parentElement.remove();
      todos.splice(todos.indexOf(removed), 1);
      console.log("todo removed:", removed);
      console.log("todo remaining", todos);
      localStorage.setItem("todos", JSON.stringify(todos));
      if (JSON.parse(localStorage.getItem("todos")).length === 0) {
        localStorage.clear();
      }
    });
  });
};

const select = () => {
  const all_todos = document.querySelectorAll("#task input");
  all_todos.forEach((all_todo) => {
    all_todo.addEventListener("click", function () {
      this.nextElementSibling.classList.toggle("text-decoration-line-through");
    });
  });
};

form.addEventListener("submit", create);
