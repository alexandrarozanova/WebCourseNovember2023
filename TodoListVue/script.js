Vue.createApp({})
    .component("TodoList", {
        data() {
            return {
                items: [],
                newTodoItemText: "",
                newTodoItemId: 1,
                isTextInvalid: false
            };
        },

        methods: {
            addTodoItem() {
                if (this.newTodoItemText.length === 0) {
                    this.isTextInvalid = true;

                    return;
                }

                this.isTextInvalid = false;

                this.items.push({
                    id: this.newTodoItemId,
                    text: this.newTodoItemText
                });

                this.newTodoItemId++;
                this.newTodoItemText = "";
            },

            deleteTodoItem(item) {
                this.items = this.items.filter(x => x !== item);
            }
        },

        template: `
          <div class="row justify-content-center">
            <div class="col-xl-6">
              <form @submit.prevent="addTodoItem" class="row mb-3" novalidate>
                <div class="col">
                  <input v-model.trim="newTodoItemText"
                         type="text"
                         class="form-control"
                         :class="{ 'is-invalid': isTextInvalid }" required>
                  <div class="invalid-feedback">Необходимо указать текст</div>
                </div>
                <div class="col-auto">
                  <button class="btn btn-primary">Добавить</button>
                </div>
              </form>

              <ul class="list-unstyled">
                <todo-list-item v-for="item in items"
                                :key="item.id"
                                :item="item"
                                @save-item="item.text = $event"
                                @delete-item="deleteTodoItem(item)"></todo-list-item>
              </ul>
            </div>
          </div>`
    })
    .component("TodoListItem", {
        props: {
            item: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                isEditing: false,
                editingText: this.item.text,
                isEditingTextInvalid: false
            };
        },

        methods: {
            cancel() {
                this.isEditing = false;
                this.isEditingTextInvalid = false;
                this.editingText = this.item.text;
            },

            save() {
                this.isEditingTextInvalid = false;

                if (this.editingText.length === 0) {
                    this.isEditingTextInvalid = true;

                    return;
                }

                this.isEditing = false;
                this.$emit("save-item", this.editingText);
            }
        },

        template: `
          <li class="mb-3">
            <div v-if="!isEditing" class="row justify-content-center">
              <div class="col">
                <span>{{ item.text }}</span>
              </div>
              <div class="col-auto">
                <button @click="$emit('delete-item')" class="btn btn-danger me-1" type="button">Удалить</button>
                <button @click="isEditing = true" class="btn btn-primary" type="button">Редактировать</button>
              </div>
            </div>
            <div v-else class="row justify-content-center">
              <div class="col">
                <input v-model.trim="editingText"
                       @keydown.enter="save"
                       class="form-control edit-text-field"
                       :class="{ 'is-invalid': isEditingTextInvalid }"
                       type="text">
                <div class="invalid-feedback">Необходимо указать текст</div>
              </div>
              <div class="col-auto">
                <button @click="cancel" class="btn btn-secondary me-1" type="button">Отменить</button>
                <button @click="save" class="btn btn-primary" type="button">Сохранить</button>
              </div>
            </div>
          </li>`
    }).mount("#app");