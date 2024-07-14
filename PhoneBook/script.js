$(function () {
    const addContactForm = $("#add-contact");
    const contactSurnameTextField = $("#surname");
    const contactNameTextField = $("#name");
    const contactPhoneNumberTextField = $("#phone-number");
    const contactsTableBody = $("#table-body");

    let rowsCount = 1;
    let isDeleteButtonActivated = false;

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

            contactsTableBody.find(".new-contact").each(function () {
                $(this).addClass("not-filtered");

                if ($(this).find(".contact-surname").text().toLowerCase() === filterTextFieldValue ||
                    $(this).find(".contact-name").text().toLowerCase() === filterTextFieldValue ||
                    $(this).find(".contact-phone-number").text().toLowerCase() === filterTextFieldValue) {
                    $(this).removeClass("not-filtered");
                }
            });
        });

        cancelFilterButton.click(function () {
            filterTextField.val("");

            contactsTableBody.find(".new-contact").removeClass("not-filtered");
            filterTextField.removeClass("invalid");
        });
    }


    setFilterMode();

    addContactForm.submit(function (e) {
        e.preventDefault();

        const contactFormTextFields = [contactSurnameTextField, contactNameTextField, contactPhoneNumberTextField];

        contactFormTextFields.forEach(function (element) {
            element.toggleClass("invalid", element.val().trim().length === 0);
        });

        function checkDataValidation(dataTextField) {
            return dataTextField.val().trim().length !== 0;
        }

        const isCorrectData = checkDataValidation(contactSurnameTextField) && checkDataValidation(contactNameTextField) && checkDataValidation(contactPhoneNumberTextField);

        if (!isCorrectData) {
            $("#validation-dialog").dialog({
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

        const contactRowNumber = rowsCount;

        function changeContactsRowsNumbers() {
            isDeleteButtonActivated = true;

            contactsTableBody.find(".new-contact").each(function (i) {
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
            contactsTableBody.find(".contact-phone-number").each(function () {
                if ($(this).text() === contactPhoneNumber) {
                    isUniqueNumber = false;
                    return false;
                }
            });

            if (!isUniqueNumber) {
                return false;
            }
        }

        checkPhoneNumberExistence(contactPhoneNumber);

        if (!isUniqueNumber) {
            $("#existence-dialog").dialog({
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

        $("#selection-all").click(function () {
            contactsTableBody.find(".new-contact input:checkbox").prop("checked", $(this).is(":checked"));
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
                                if ($(this).find(".checkbox").prop("checked")) {
                                    $(this).remove();
                                    rowsCount--;
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

            newContact.find(".contact-id").text(contactRowNumber);
            newContact.find(".contact-surname").text(contactSurname);
            newContact.find(".contact-name").text(contactName);
            newContact.find(".contact-phone-number").text(contactPhoneNumber);

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

            newContact.find(".contact-id").text(contactRowNumber);
            const editSurnameTextField = newContact.find(".edit-surname").val(contactSurname);
            const editNameTextField = newContact.find(".edit-name").val(contactName);
            const editPhoneNumberTextField = newContact.find(".edit-phone-number").val(contactPhoneNumber);

            if (isDeleteButtonActivated) {
                changeContactsRowsNumbers();
            }

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
                });

                const isCorrectChangedData = checkDataValidation(editSurnameTextField) && checkDataValidation(editNameTextField) && checkDataValidation(editPhoneNumberTextField);

                if (!isCorrectChangedData) {
                    return;
                }

                isUniqueNumber = true;
                checkPhoneNumberExistence(changedPhoneNumber);

                if (!isUniqueNumber) {
                    $("#existence-dialog").dialog({
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