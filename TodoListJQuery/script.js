$(function () {
    const addTodoForm = $("#add-todo-form");
    const todoList = $("#todo-list");
    const newTodoTextField = $("#new-todo-text-field");

    addTodoForm.submit(function (e) {
        e.preventDefault();

        let newTodoText = newTodoTextField.val().trim();
        newTodoTextField.removeClass("invalid");

        if (newTodoText.length === 0) {
            newTodoTextField.addClass("invalid");
            return;
        }

        const newTodo = $("<li>").addClass("todo-item");

        function setViewMode() {
            newTodo.html(`
                <div class="container">
                    <div class="todo-item-text"></div>
                </div>
                <div class="buttons container">
                    <button class="delete-button button" type="button">Удалить</button>
                    <button class="edit-button button" type="button">Редактировать</button>
                </div>
            `);

            newTodo.find(".todo-item-text").text(newTodoText);

            newTodo.find(".delete-button").click(function () {
                $("#confirm-delete-dialog").dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Удалить": function () {
                            newTodo.remove();
                            $(this).dialog("close");
                        },
                        "Отменить": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            });

            newTodo.find(".edit-button").click(function () {
                newTodo.html(`
                    <form class="edit-todo-form">
                        <div class="container">
                            <label>
                                <input type="text" class="edit-text-field">
                                <span class="error-message">Необходимо указать текст</span>
                            </label>
                        </div>
                        <div class="buttons container">
                            <button class="cancel-button button" type="button">Отменить</button>
                            <button class="save-button button">Сохранить</button>
                        </div>
                    </form>
                `);

                const editTextField = $(".edit-text-field").val(newTodoText);

                newTodo.find(".cancel-button").click(function () {
                    setViewMode();
                });

                newTodo.find(".edit-todo-form").submit(function (e) {
                    e.preventDefault();

                    const changedTodoText = editTextField.val().trim();

                    if (changedTodoText.length === 0) {
                        newTodo.find(".edit-text-field").addClass("invalid");
                        return;
                    }

                    newTodoText = changedTodoText;
                    setViewMode();
                });
            });
        }

        todoList.append(newTodo);

        setViewMode();

        newTodoTextField.val("");
    });
});