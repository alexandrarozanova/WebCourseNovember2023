const express = require("express");
const router = express.Router();

let contacts = [];
let currentContactId = 1;

router.get("/api/contacts", function (req, res) {
    const term = (req.query.term || "").toUpperCase();

    const result = term.length === 0
        ? contacts
        : contacts.filter(c => c.name.toUpperCase().includes(term) || c.surname.toUpperCase().includes(term) || c.phone.toUpperCase().includes(term));

    res.send(result);
});

router.delete("/api/contacts/:id", function (req, res) {
    const id = Number(req.params.id);

    contacts = contacts.filter(c => c.id !== id);

    res.send({
        success: true,
        message: null
    });
});

router.post("/api/contacts", function (req, res) {
    const contact = {
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone
    };

    if (!contact.name) {
        res.send({
            success: false,
            message: "Необходимо заполнить поле 'Имя'."
        });

        return;
    }

    if (!contact.surname) {
        res.send({
            success: false,
            message: "Необходимо заполнить поле 'Фамилия'."
        });

        return;
    }

    if (!contact.phone) {
        res.send({
            success: false,
            message: "Необходимо заполнить поле 'Номер телефона'."
        });

        return;
    }

    const upperCasePhone = contact.phone.toUpperCase();

    if (contacts.some(c => c.phone.toUpperCase() === upperCasePhone)) {
        res.send({
            success: false,
            message: "Контакт с данным номером телефона уже существует."
        });

        return;
    }

    contact.id = currentContactId;
    currentContactId++;

    contacts.push(contact);

    res.send({
        success: true,
        message: null
    });
});

router.post("/api/contacts/:id", function (req, res) {
    const id = Number(req.params.id);
    const editingName = req.body.editingName;
    const editingSurname = req.body.editingSurname;
    const editingPhone = req.body.editingPhone;

    if (!editingName) {
        res.send({
            success: false,
            message: "Необходимо заполнить поле 'Имя'."
        });

        return;
    }

    if (!editingSurname) {
        res.send({
            success: false,
            message: "Необходимо заполнить поле 'Фамилия'."
        });

        return;
    }

    if (!editingPhone) {
        res.send({
            success: false,
            message: "Необходимо заполнить поле 'Номер телефона'."
        });

        return;
    }

    const upperCasePhone = editingPhone.toUpperCase();

    if (contacts.some(c => c.id !== id && c.phone.toUpperCase() === upperCasePhone)) {
        res.send({
            success: false,
            message: "Контакт с данным номером телефона уже существует."
        });

        return;
    }

    const contactToEdit = contacts.find(c => c.id === id);

    contactToEdit.name = editingName;
    contactToEdit.surname = editingSurname;
    contactToEdit.phone = editingPhone;

    res.send({
        success: true,
        message: null
    });
});

module.exports = router;