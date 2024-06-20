$(function () {
    const addContactForm = $("#add-contact");
    const contactSurnameTextField = $("#surname");
    const contactNameTextField = $("#name");
    const contactPhoneNumberTextField = $("#phone-number");
    const contactTableBody = $("#table-body");

    let rowsCount = 1;
    let deleteButtonActivated = false;

    addContactForm.submit(function (e) {
            e.preventDefault();

            const contactFormTextFields = [contactSurnameTextField, contactNameTextField, contactPhoneNumberTextField];

            contactFormTextFields.forEach(function (item) {
                if (item.val().trim().length === 0) {
                    item.addClass("invalid");
                } else {
                    item.removeClass("invalid");
                }
            });

            function checkDataValidation(dataTextField) {
                return dataTextField.val().trim().length !== 0;
            }

            let dataValidation = checkDataValidation(contactSurnameTextField) && checkDataValidation(contactNameTextField) && checkDataValidation(contactPhoneNumberTextField);

            if (!dataValidation) {
                $("#validation-dialog").dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Ок": function () {
                            $(this).dialog("close");
                        }
                    }
                });

                return;
            }

            let contactRow = rowsCount;

            function changeContactsRow() {
                deleteButtonActivated = true;

                contactTableBody.find(".new-contact").each(function (i) {
                    $(this).find(".contact-id").text(i + 1);
                });
            }

            let contactSurname = contactSurnameTextField.val().trim();
            let contactName = contactNameTextField.val().trim();
            let contactPhoneNumber = contactPhoneNumberTextField.val().trim();

            const newContact = $("<tr>");
            newContact.addClass("new-contact");

            let isUniqueNumber = true;

            function checkPhoneNumberExistence(contactPhoneNumber) {
                contactTableBody.find(".contact-phone-number").each(function () {
                    if ($(this).text() === contactPhoneNumber) {
                        isUniqueNumber = false;
                    }
                });
            }

            checkPhoneNumberExistence(contactPhoneNumber);

            if (!isUniqueNumber) {
                $("#existence-dialog").dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Ок": function () {
                            $(this).dialog("close");
                        }
                    }
                });

                return;
            }

            $("#selection-all").click(function () {
                if ($(this).prop("checked")) {
                    contactTableBody.find(".new-contact").find(".checkbox").each(function () {
                        $(this).prop("checked", true);
                    });
                } else {
                    contactTableBody.find(".new-contact").find(".checkbox").each(function () {
                        $(this).prop("checked", false);
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

                newContact.find(".contact-id").text(contactRow);
                newContact.find(".contact-surname").text(contactSurname);
                newContact.find(".contact-name").text(contactName);
                newContact.find(".contact-phone-number").text(contactPhoneNumber);

                if (deleteButtonActivated) {
                    changeContactsRow();
                }

                newContact.find(".delete-button").click(function () {
                    if (newContact.find(".checkbox").prop("checked")) {
                        $("#confirm-multiple-delete-dialog").dialog({
                            resizable: false,
                            height: "auto",
                            width: 400,
                            modal: true,
                            buttons: {
                                "Удалить": function () {
                                    contactTableBody.find(".new-contact").each(function () {
                                        if ($(this).find(".checkbox").prop("checked")) {
                                            $(this).remove();
                                            rowsCount--;
                                            changeContactsRow();
                                        }
                                    });

                                    $(this).dialog("close");
                                },
                                "Отменить": function () {
                                    $(this).dialog("close");
                                }
                            }
                        });
                    } else {
                        $("#confirm-delete-dialog").dialog({
                            resizable: false,
                            height: "auto",
                            width: 400,
                            modal: true,
                            buttons: {
                                "Удалить": function () {
                                    newContact.remove();
                                    rowsCount--;
                                    changeContactsRow();
                                    $(this).dialog("close");
                                },
                                "Отменить": function () {
                                    $(this).dialog("close");
                                }
                            }
                        });
                    }
                });

                newContact.find(".edit-button").click(function () {
                    setEditMode();
                });
            }

            function setEditMode() {
                newContact.html(`
                    <form id="edit-contact-form">
                    <td></td>
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
                    </td>
                    <td class="contact-buttons center-position">
                                     <img src="images/save.png"
                                          class="image-button save-button"
                                          alt="Сохранить">
                                     <img src="images/cancel.png"
                                          class="image-button cancel-button"
                                          alt="Отменить"
                    </td>
                    </form>
                `);

                newContact.find(".contact-id").text(contactRow);
                const editSurnameTextField = newContact.find(".edit-surname").val(contactSurname);
                const editNameTextField = newContact.find(".edit-name").val(contactName);
                const editPhoneNumberTextField = newContact.find(".edit-phone-number").val(contactPhoneNumber);

                if (deleteButtonActivated) {
                    changeContactsRow();
                }

                newContact.find(".cancel-button").click(function () {
                    setViewMode();
                });

                newContact.find(".save-button").click(function () {
                    const changedContactSurname = editSurnameTextField.val().trim();
                    const changedContactName = editNameTextField.val().trim();
                    const changedPhoneNumber = editPhoneNumberTextField.val().trim();

                    const editFormTextFields = [editSurnameTextField, editNameTextField, editPhoneNumberTextField];

                    editFormTextFields.forEach(function (item) {
                        if (item.val().trim().length === 0) {
                            item.addClass("invalid");
                        } else {
                            item.removeClass("invalid");
                        }
                    });

                    let changedDataValidation = checkDataValidation(editSurnameTextField) && checkDataValidation(editNameTextField) && checkDataValidation(editPhoneNumberTextField);

                    if (!changedDataValidation) {
                        return;
                    }

                    contactSurname = changedContactSurname;
                    contactName = changedContactName;
                    contactPhoneNumber = changedPhoneNumber;

                    isUniqueNumber = true;
                    checkPhoneNumberExistence(changedPhoneNumber);

                    if (!isUniqueNumber) {
                        $("#existence-dialog").dialog({
                            resizable: false,
                            height: "auto",
                            width: 400,
                            modal: true,
                            buttons: {
                                "Ок": function () {
                                    $(this).dialog("close");
                                }
                            }
                        });

                        return;
                    }

                    setViewMode();
                });
            }

            function setFilterMode() {
                const filterTextField = $("#filter");
                const submitFilterButton = $("#submit-filter-button");
                const cancelFilterButton = $("#cancel-filter-button");

                submitFilterButton.click(function () {
                    contactTableBody.find(".new-contact").each(function () {
                        $(this).addClass("not-filtered");

                        if ($(this).find(".contact-surname").text().toLowerCase() === filterTextField.val().trim().toLowerCase() ||
                            $(this).find(".contact-name").text().toLowerCase() === filterTextField.val().trim().toLowerCase() ||
                            $(this).find(".contact-phone-number").text().toLowerCase() === filterTextField.val().trim().toLowerCase()) {
                            $(this).removeClass("not-filtered");
                        }
                    });
                });

                cancelFilterButton.click(function () {
                    filterTextField.val("");

                    contactTableBody.find(".new-contact").each(function () {
                        $(this).removeClass("not-filtered");
                    });
                });
            }

            setViewMode();
            setFilterMode();

            contactTableBody.append(newContact);
            rowsCount++;
            deleteButtonActivated = false;

            contactSurnameTextField.val("");
            contactNameTextField.val("");
            contactPhoneNumberTextField.val("");
        }
    );
});