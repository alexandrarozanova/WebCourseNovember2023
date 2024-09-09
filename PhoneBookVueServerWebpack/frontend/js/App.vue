<template>
  <div class="container my-2" id="app">
    <h1 class="text-center mb-3">PhoneBook Vue Server Webpack</h1>

    <form @submit.prevent="createContact" class="mb-3" novalidate>
      <h2 class="h5">Добавить контакт</h2>

      <div class="row row-cols-1 row-cols-md-4 g-3 form-group has-error">
        <div class="col">
          <input v-model.trim="name"
                 type="text"
                 class="form-control mb-1"
                 placeholder="Имя"
                 :class="{ 'is-invalid': isNameInvalid }">
          <div v-if="isNameInvalid" class="invalid-feedback mb-1">Введите имя</div>
        </div>
        <div class="col">
          <input v-model.trim="surname"
                 type="text"
                 class="form-control mb-1"
                 placeholder="Фамилия"
                 :class="{ 'is-invalid': isSurnameInvalid }">
          <div v-if="isSurnameInvalid" class="invalid-feedback mb-1">Введите фамилию</div>
        </div>
        <div class="col">
          <input v-model.trim="phone"
                 type="text"
                 class="form-control mb-1"
                 placeholder="Номер телефона"
                 :class="{ 'is-invalid': isPhoneInvalid }">
          <div v-if="isPhoneInvalid" class="invalid-feedback mb-1">Введите номер телефона</div>
        </div>
        <div class="col">
          <button class="btn btn-primary">Добавить</button>
        </div>
      </div>
    </form>

    <form @submit.prevent="loadContacts" class="mb-3">
      <h2 class="h5">Найти контакт</h2>

      <div class="row row-cols-auto g-2 align-items-center">
        <div class="col">
          <input type="text" v-model="term" class="form-control" placeholder="Текст для поиска">
        </div>
        <div class="col">
          <button class="btn btn-primary">Поиск</button>
        </div>
        <div>
          <button @click="clearSearchField" type="button" class="btn btn-secondary">Отменить</button>
        </div>
        <div class="col">
          <button @click="showMultipleDeleteConfirmModal" type="button" class="btn btn-danger">Удалить выбранные
          </button>
        </div>
      </div>
    </form>

    <div class="table-responsive">
      <table class="table table-bordered table-striped table-hover">
        <thead>
        <tr class="text-center">
          <th class="col">
            <input @click="checkAll"
                   :checked="isSelectedAll"
                   type="checkbox"
                   value=""
                   class="form-check-input">
          </th>
          <th class="col">№</th>
          <th class="col">Имя</th>
          <th class="col">Фамилия</th>
          <th class="col">Номер телефона</th>
          <th class="col-2"></th>
        </tr>
        </thead>
        <tbody v-cloak v-for="(contact, index) in contacts" :key="contact.id">
        <tr v-if="!contact.isEditing">
          <td class="text-center">
            <input v-model="contact.selected"
                   class="form-check-input"
                   type="checkbox"
                   value="">
          </td>
          <td v-text="index + 1" class="text-center"></td>
          <td v-text="contact.name"></td>
          <td v-text="contact.surname"></td>
          <td v-text="contact.phone"></td>
          <td>
            <div class="d-flex">
              <button @click="showDeleteContactConfirmModal(contact)" type="button" class="btn btn-danger me-1">
                Удалить
              </button>
              <button @click="editContact(contact)" type="button" class="btn btn-primary">Редактировать</button>
            </div>
          </td>
        </tr>
        <tr v-else>
          <td class="text-center">
            <input v-model="contact.selected"
                   class="form-check-input"
                   type="checkbox"
                   value="">
          </td>
          <td v-text="index + 1" class="text-center"></td>
          <td>
            <input v-model.trim="contact.editingName"
                   @keydown.enter="save(contact)"
                   class="form-control edit-text-field"
                   :class="{ 'is-invalid': contact.isEditingNameInvalid }"
                   type="text">
            <div v-if="contact.isEditingNameInvalid" class="invalid-feedback">Введите имя</div>
          </td>
          <td>
            <input v-model.trim="contact.editingSurname"
                   @keydown.enter="save(contact)"
                   class="form-control edit-text-field"
                   :class="{ 'is-invalid': contact.isEditingSurnameInvalid }"
                   type="text">
            <div v-if="contact.isEditingSurnameInvalid" class="invalid-feedback">Введите фамилию</div>
          </td>
          <td>
            <input v-model.trim="contact.editingPhone"
                   @keydown.enter="save(contact)"
                   class="form-control edit-text-field"
                   :class="{ 'is-invalid': contact.isEditingPhoneInvalid }"
                   type="text">
            <div v-if="contact.isEditingPhoneInvalid" class="invalid-feedback">Введите номер телефона</div>
          </td>
          <td>
            <div class="d-flex">
              <button @click="cancel(contact)" type="button" class="btn btn-secondary me-1">Отменить</button>
              <button @click="save(contact)" type="button" class="btn btn-primary">Сохранить</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <bootstrap-modal ref="deleteConfirmModal" @ok="deleteContact">
      <template #header>Подтверждение удаления</template>
      <template #body>Вы действительно хотите удалить контакт?</template>
    </bootstrap-modal>
    <bootstrap-modal ref="multipleDeleteConfirmModal" @ok="deleteContacts">
      <template #header>Подтверждение удаления</template>
      <template #body>Вы действительно хотите удалить контакты?</template>
    </bootstrap-modal>
    <error-modal ref="deleteErrorModal">
      <template #header>Ошибка удаления</template>
      <template #body>Для удаления необходимо выбрать контакт.</template>
    </error-modal>
  </div>
</template>

<script>
import PhoneBookService from "./phoneBookService";
import BootstrapModal from "./BootstrapModal.vue";
import ErrorModal from "./ErrorModal.vue";

export default {
  name: "App",

  components: {
    ErrorModal,
    BootstrapModal
  },

  data() {
    return {
      contacts: [],
      selectedContacts: [],
      term: "",
      name: "",
      surname: "",
      phone: "",
      isSelectedAll: false,
      isNameInvalid: false,
      isSurnameInvalid: false,
      isPhoneInvalid: false,
      editingName: "",
      editingSurname: "",
      editingPhone: "",
      isEditingNameInvalid: false,
      isEditingSurnameInvalid: false,
      isEditingPhoneInvalid: false,
      service: new PhoneBookService(),
      contactToDelete: null
    };
  },

  created() {
    this.loadContacts();
  },

  methods: {
    createContact() {
      const contact = {
        name: this.name,
        surname: this.surname,
        phone: this.phone
      }

      this.isNameInvalid = false;
      this.isSurnameInvalid = false;
      this.isPhoneInvalid = false;

      if (this.name.length === 0) {
        this.isNameInvalid = true;
      }

      if (this.surname.length === 0) {
        this.isSurnameInvalid = true;
      }

      if (this.phone.length === 0) {
        this.isPhoneInvalid = true;
      }

      if (this.isNameInvalid || this.isSurnameInvalid || this.isPhoneInvalid) {
        return;
      }

      this.service.createContact(contact).then(response => {
        if (!response.success) {
          alert(response.message);

          return;
        }

        this.name = "";
        this.surname = "";
        this.phone = "";

        this.loadContacts();
      }).catch(() => alert("Не удалось создать контакт"));
    },

    checkAll() {
      this.isSelectedAll = !this.isSelectedAll;

      this.contacts.forEach(contact => contact.selected = this.isSelectedAll);
    },

    showDeleteContactConfirmModal(contact) {
      this.contactToDelete = contact;
      this.$refs.deleteConfirmModal.show();
    },

    deleteContact() {
      this.service.deleteContact(this.contactToDelete.id).then(response => {
        if (!response.success) {
          alert(response.message);

          return;
        }

        this.$refs.deleteConfirmModal.hide();

        this.loadContacts();
      }).catch(() => alert("Не удалось удалить контакт"));
    },

    showMultipleDeleteConfirmModal() {
      this.selectedContacts = this.contacts.filter(contact => contact.selected);

      if (this.selectedContacts.length === 0) {
        this.$refs.deleteErrorModal.show();

        return;
      }

      this.$refs.multipleDeleteConfirmModal.show();
    },

    deleteContacts() {
      const contactsIdsToDelete = this.selectedContacts.map(contact => contact.id);

      this.service.deleteContact(contactsIdsToDelete).then(response => {
        if (!response.success) {
          alert(response.message);

          return;
        }

        this.$refs.multipleDeleteConfirmModal.hide();

        if (this.isSelectedAll) {
          this.isSelectedAll = false;
        }

        this.loadContacts();
      }).catch(() => alert("Не удалось удалить контакты"));
    },

    cancel(contact) {
      contact.isEditing = false;
      contact.isEditingNameInvalid = false;
      contact.isEditingSurnameInvalid = false;
      contact.isEditingPhoneInvalid = false;
    },

    editContact(contact) {
      contact.isEditing = true;
      contact.editingName = contact.name;
      contact.editingSurname = contact.surname;
      contact.editingPhone = contact.phone;
    },

    save(contact) {
      const editingContact = {
        id: contact.id,
        editingName: contact.editingName,
        editingSurname: contact.editingSurname,
        editingPhone: contact.editingPhone
      }

      contact.isEditingNameInvalid = false;
      contact.isEditingSurnameInvalid = false;
      contact.isEditingPhoneInvalid = false;

      if (editingContact.editingName.length === 0) {
        contact.isEditingNameInvalid = true;
      }

      if (editingContact.editingSurname.length === 0) {
        contact.isEditingSurnameInvalid = true;
      }

      if (editingContact.editingPhone.length === 0) {
        contact.isEditingPhoneInvalid = true;
      }

      if (contact.isEditingNameInvalid || contact.isEditingSurnameInvalid || contact.isEditingPhoneInvalid) {
        return;
      }

      this.service.editContact(editingContact).then(response => {
        if (!response.success) {
          alert(response.message);

          return;
        }

        contact.isEditing = false;

        this.loadContacts();
      }).catch(() => alert("Не удалось изменить контакт."));
    },

    clearSearchField() {
      this.term = "";

      this.loadContacts();
    },

    loadContacts() {
      this.service.getContacts(this.term).then(contacts => {
        this.contacts = contacts;
      }).catch(() => alert("Не удалось загрузить контакты"));
    }
  }
};
</script>