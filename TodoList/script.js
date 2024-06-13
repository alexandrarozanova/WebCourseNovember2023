document.addEventListener("DOMContentLoaded", function () {
    const addTodoForm = document.getElementById("add-todo-form");
    const todoList = document.getElementById("todo-list");
    const newTodoTextField = document.getElementById("new-todo-text-field");

    addTodoForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let newTodoText = newTodoTextField.value.trim();
        newTodoTextField.classList.remove("invalid");

        if (newTodoText.length === 0) {
            newTodoTextField.classList.add("invalid");
            return;
        }

        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");

        function setViewMode() {
            newTodo.innerHTML = `
                <span class="todo-item-text"></span>
                <div class="buttons">
                    <button class="delete-button button" type="button">Удалить</button>
                    <button class="edit-button button" type="button">Редактировать</button>
                </div>
            `;

            newTodo.querySelector(".todo-item-text").textContent = newTodoText;

            newTodo.querySelector(".delete-button").addEventListener("click", function () {
                newTodo.remove();
            });

            newTodo.querySelector(".edit-button").addEventListener("click", function () {
                newTodo.innerHTML = `
                    <form class="edit-todo-form">
                        <input type="text" class="edit-text-field">
                        <div class="buttons">
                            <button class="cancel-button button" type="button">Отменить</button>
                            <button class="save-button button">Сохранить</button>
                        </div>
                        <span class="error-message">Необходимо указать текст</span>
                    </form>
                `;

                const editTextField = newTodo.querySelector(".edit-text-field");
                editTextField.value = newTodoText;

                newTodo.querySelector(".cancel-button").addEventListener("click", function () {
                    setViewMode();
                });

                newTodo.querySelector(".edit-todo-form").addEventListener("submit", function (e) {
                    e.preventDefault();

                    const changedTodoText = editTextField.value.trim();

                    if (changedTodoText.length === 0) {
                        editTextField.classList.add("invalid");
                        return;
                    }

                    newTodoText = changedTodoText;
                    setViewMode();
                });
            });
        }

        setViewMode();

        todoList.append(newTodo);

        newTodoTextField.value = "";
    });
});