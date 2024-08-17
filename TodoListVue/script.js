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
            addTodoItem(e) {
                const newTodoItem = {
                    id: this.newTodoItemId,
                    text: this.newTodoItemText
                };

                if (this.newTodoItemText.length > 0) {
                    this.isTextInvalid = false;

                    this.newTodoItemId++;

                    this.items.push(newTodoItem);

                    this.newTodoItemText = "";
                } else {
                    this.isTextInvalid = true;

                    e.preventDefault();
                    e.stopPropagation();
                }
            },

            deleteTodoItem(item) {
                this.items = this.items.filter(x => x !== item);
            }
        },

        template: `
          <form @submit.prevent="addTodoItem" class="row justify-content-center" novalidate>
            <div class="col-lg-6">
              <div class="row g-2 mb-3">
                <div class="col-md-10">
                  <input v-model.trim="newTodoItemText"
                         type="text"
                         class="form-control"
                         :class="{ 'is-invalid': isTextInvalid }" required>
                  <div class="invalid-feedback">Необходимо указать текст</div>
                </div>
                <div class="col-lg-1">
                  <button class="btn btn-primary">Добавить</button>
                </div>
              </div>
            </div>
          </form>

          <ul class="list-unstyled">
            <todo-list-item v-for="item in items"
                            :key="item.id"
                            :item="item"
                            @save-item="item.text = $event"
                            @delete-item="deleteTodoItem(item)"></todo-list-item>
          </ul>`
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
                if (this.editingText.length === 0) {
                    this.isEditingTextInvalid = true;

                    return;
                }

                this.isEditing = false;
                this.$emit("save-item", this.editingText);
            }
        },

        template: `
          <li>
            <div class="row justify-content-center mb-3" v-if="!isEditing">
              <div class="col-lg-6">
                <div class="row">
                  <div class="col">
                    <span class="me-2">{{ item.text }}</span>
                  </div>
                  <div class="col-auto">
                    <button @click="$emit('delete-item')" class="btn btn-danger me-1" type="button">Удалить</button>
                    <button @click="isEditing = true" class="btn btn-primary" type="button">Редактировать</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-center mb-3" v-else>
              <div class="col-lg-6">
                <div class="row g-2 lb-3">
                  <div class="col mb-1">
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
              </div>
            </div>
          </li>`
    }).mount("#app");