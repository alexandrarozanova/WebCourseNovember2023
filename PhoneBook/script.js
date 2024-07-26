$(function () {
    const addContactForm = $("#add-contact");
    const contactSurnameTextField = $("#surname");
    const contactNameTextField = $("#name");
    const contactPhoneNumberTextField = $("#phone-number");
    const contactsTableBody = $("#table-body");

    let rowsCount = 1;
    let isDeleteButtonActivated = false;
    let isChecked = false;

    function changeContactsRowsNumbers() {
        contactsTableBody.find(".new-contact").each(function (i) {
            $(this).find(".contact-id").text(i + 1);
        });
    }

    function setFilterMode() {
        const filterTextField = $("#filter");
        const submitFilterButton = $("#submit-filter-button");
        const cancelFilterButton = $("#cancel-filter-button");

        submitFilterButton.click(function () {
            filterTextField.toggleClass("invalid", filterTextField.val().length === 0);

            if (filterTextField.val().length === 0) {
                $("#filter-error-dialog").dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "OK": function () {
                            $(this).dialog("close");
                        }
                    }
                });

                return;
            }

            const filterTextFieldValue = filterTextField.val().trim().toLowerCase();

            let i = 0;

            contactsTableBody.find(".new-contact").each(function () {
                $(this).addClass("not-filtered");

                if ($(this).find(".contact-surname").text().toLowerCase().indexOf(filterTextFieldValue) !== -1 ||
                    $(this).find(".contact-name").text().toLowerCase().indexOf(filterTextFieldValue) !== -1 ||
                    $(this).find(".contact-phone-number").text().toLowerCase().indexOf(filterTextFieldValue) !== -1) {
                    $(this).removeClass("not-filtered");
                }

                if (!$(this).hasClass("not-filtered")) {
                    $(this).find(".contact-id").text(i + 1);
                    i++;
                }
            });
        });

        cancelFilterButton.click(function () {
            filterTextField.val("");

            contactsTableBody.find(".new-contact").removeClass("not-filtered");
            filterTextField.removeClass("invalid");
            changeContactsRowsNumbers();
        });
    }

    setFilterMode();

    addContactForm.submit(function (e) {
        e.preventDefault();

        const contactFormTextFields = [contactSurnameTextField, contactNameTextField, contactPhoneNumberTextField];

        contactFormTextFields.forEach(function (element) {
            element.toggleClass("invalid", element.val().trim().length === 0);
        });

        if (contactPhoneNumberTextField.hasClass("invalid")) {
            contactPhoneNumberTextField.removeClass("existence-invalid");
        }

        function isTextFieldNotEmpty(dataTextField) {
            return dataTextField.val().trim().length !== 0;
        }

        const isDataCorrect = isTextFieldNotEmpty(contactSurnameTextField) && isTextFieldNotEmpty(contactNameTextField) && isTextFieldNotEmpty(contactPhoneNumberTextField);

        let contactSurname = contactSurnameTextField.val().trim();
        let contactName = contactNameTextField.val().trim();
        let contactPhoneNumber = contactPhoneNumberTextField.val().trim();

        function isPhoneNumberUnique(contactPhoneNumber) {
            let isUniqueNumber = true;

            contactsTableBody.find(".contact-phone-number").each(function () {
                if ($(this).text() === contactPhoneNumber) {
                    isUniqueNumber = false;
                    return false;
                }

                return true;
            });

            return isUniqueNumber;
        }

        contactPhoneNumberTextField.toggleClass("existence-invalid", !isPhoneNumberUnique(contactPhoneNumber));

        if (!isDataCorrect || !isPhoneNumberUnique(contactPhoneNumber)) {
            return;
        }

        const contactRowNumber = rowsCount;

        const newContact = $("<tr>");
        newContact.addClass("new-contact");

        $("#selection-all").click(function () {
            contactsTableBody.find(".new-contact:not(.not-filtered) input:checkbox").prop("checked", $(this).is(":checked"));

            isChecked = contactsTableBody.find(".new-contact:not(.not-filtered) input:checkbox").is(":checked") === true;
        });

        $("#delete-all-button").click(function () {
            if (newContact.find(".checkbox").prop("checked")) {
                $("#confirm-multiple-delete-dialog").dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Удалить": function () {
                            contactsTableBody.find(".new-contact").each(function () {
                                if ($(this).find(".checkbox").prop("checked") && !$(this).hasClass("not-filtered")) {
                                    $(this).remove();
                                    rowsCount--;
                                    isDeleteButtonActivated = true;
                                    changeContactsRowsNumbers();
                                }
                            });

                            $(this).dialog("close");
                            $("#selection-all").prop("checked", false);
                        },
                        "Отменить": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            }
        });

        function setViewMode() {
            newContact.html(`
                <td class="contact-checkbox center-position"><input type="checkbox" class="checkbox" name="select"></td>
                <td class="contact-id center-position"></td>
                <td class="contact-surname"></td>.
                <td class="contact-name"></td>
                <td class="contact-phone-number"></td>
                <td class="contact-buttons center-position">
                    <img src="images/edit.png"
                         class="image-button edit-button"
                         alt="Редактировать">
                    <img src="images/delete.png"
                         class="image-button delete-button"
                         alt="Удалить"
                </td>
            `);

            newContact.find(".contact-checkbox input:checkbox").prop("checked", isChecked);
            newContact.find(".contact-id").text(contactRowNumber);
            newContact.find(".contact-surname").text(contactSurname);
            newContact.find(".contact-name").text(contactName);
            newContact.find(".contact-phone-number").text(contactPhoneNumber);

            newContact.find(".contact-checkbox input:checkbox").change(function () {
                isChecked = $(this).is(":checked");
            });

            if (isDeleteButtonActivated) {
                changeContactsRowsNumbers();
            }

            newContact.find(".delete-button").click(function () {
                $("#confirm-delete-dialog").dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Удалить": function () {
                            newContact.remove();
                            rowsCount--;
                            isDeleteButtonActivated = true;
                            changeContactsRowsNumbers();
                            $(this).dialog("close");
                        },
                        "Отменить": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            });

            newContact.find(".edit-button").click(function () {
                setEditMode();
            });
        }

        function setEditMode() {
            newContact.html(`
                <td class="contact-checkbox center-position"><input type="checkbox" class="checkbox" name="select"></td>
                <td class="contact-id center-position"></td>
                <td>
                    <input class="contact-surname edit-surname" type="text">
                    <span class="error-message edit-form">Поле не заполнено</span>
                </td>
                <td>
                    <input class="contact-name edit-name" type="text">
                    <span class="error-message edit-form">Поле не заполнено</span>
                </td>
                <td>
                    <input class="contact-phone-number edit-phone-number" type="text">
                    <span class="error-message edit-form">Поле не заполнено</span>
                    <span class="existence-error edit-form">Контакт с таким номером уже существует.</span>
                </td>
                <td class="contact-buttons center-position">
                    <img src="images/save.png"
                        class="image-button save-button"
                        alt="Сохранить">
                    <img src="images/cancel.png"
                        class="image-button cancel-button"
                        alt="Отменить"
                </td>
            `);

            newContact.find(".contact-checkbox input:checkbox").prop("checked", isChecked);
            newContact.find(".contact-id").text(contactRowNumber);
            const editSurnameTextField = newContact.find(".edit-surname").val(contactSurname);
            const editNameTextField = newContact.find(".edit-name").val(contactName);
            const editPhoneNumberTextField = newContact.find(".edit-phone-number").val(contactPhoneNumber);

            if (isDeleteButtonActivated) {
                changeContactsRowsNumbers();
            }

            newContact.find(".contact-checkbox input:checkbox").change(function () {
                isChecked = $(this).is(":checked");
            });

            newContact.find(".cancel-button").click(function () {
                setViewMode();
            });

            newContact.find(".save-button").click(function () {
                const changedContactSurname = editSurnameTextField.val().trim();
                const changedContactName = editNameTextField.val().trim();
                const changedPhoneNumber = editPhoneNumberTextField.val().trim();

                const editFormTextFields = [editSurnameTextField, editNameTextField, editPhoneNumberTextField];

                editFormTextFields.forEach(function (element) {
                    element.toggleClass("invalid", element.val().trim().length === 0);

                    if (element.hasClass("existence-invalid")) {
                        element.removeClass("existence-invalid");
                    }
                });

                const isChangedDataCorrect = isTextFieldNotEmpty(editSurnameTextField) && isTextFieldNotEmpty(editNameTextField) && isTextFieldNotEmpty(editPhoneNumberTextField);

                if (!isChangedDataCorrect) {
                    return;
                }

                isPhoneNumberUnique(changedPhoneNumber);

                editPhoneNumberTextField.toggleClass("existence-invalid", !isPhoneNumberUnique(changedPhoneNumber));

                if (!isPhoneNumberUnique(changedPhoneNumber)) {
                    return;
                }

                contactSurname = changedContactSurname;
                contactName = changedContactName;
                contactPhoneNumber = changedPhoneNumber;

                setViewMode();
            });
        }

        setViewMode();

        contactsTableBody.append(newContact);
        rowsCount++;
        isDeleteButtonActivated = false;

        contactSurnameTextField.val("");
        contactNameTextField.val("");
        contactPhoneNumberTextField.val("");
    });
});