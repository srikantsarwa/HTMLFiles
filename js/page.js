$(function() {
    var client = new WindowsAzure.MobileServiceClient('https://testhtmlms.azure-mobile.net/', 'sSFpLGkvOfebwDkIkgDsqtZLHclniD45'),
        todoItemTable = client.getTable('Item');

    // Read current data and rebuild UI.
    // If you plan to generate complex UIs like this, consider using a JavaScript templating library.
    function refreshTodoItems() {
        var query = todoItemTable;

        query.read().then(function (todoItems) {
            var listItems = $.map(todoItems, function (item) {
                return $('<li>')
            });
            $('#todo-items').empty().append(listItems).toggle(listItems.length > 0);
            $('#summary').html('<strong>' + todoItems.length + '</strong> item(s)');
        }, handleError);
    }

    function handleError(error) {
        var text = error + (error.request ? ' - ' + error.request.status : '');
        $('#errorlog').append($('<li>').text(text));
    }

    function getTodoItemId(formElement) {
        return $(formElement).closest('li').attr('data-todoitem-id');
    }

    // Handle insert
    $('#add-item').submit(function(evt) {
        //var textbox = $('#new-item-text'),
        //    itemText = textbox.val();
        //if (itemText !== '') {
        //    todoItemTable.insert({ text: itemText, complete: false }).then(refreshTodoItems, handleError);
        //}
        //textbox.val('').focus();

        var textbox = $('#new-item-text'),
           itemText = textbox.val();
        var namebox = $('#new-name-text'),
            nametext = namebox.val();
        var ocassionbox = $('#new-ocassion-text'),
            ocassiontext = ocassionbox.val();
        var datebox = $('#new-date-text'),
            datetext = datebox.val();
        var messagebox = $('#new-message-text'),
            messagetext = messagebox.val();
        var phonebox = $('#new-phone-text'),
            phonetext = phonebox.val();
        var emailbox = $('#new-email-text'),
            emailtext = emailbox.val();
        todoItemTable.insert({ name: nametext, occasion: ocassiontext, date: datetext, message: messagetext, phone: phonetext, email: emailtext }).then(refreshTodoItems, handleError);

        //var textbox = $('#new-item-text'),
        //    itemText = textbox.val();
        //if (itemText !== '') {
        //    todoItemTable.insert({ text: itemText, complete: false }).then(refreshTodoItems, handleError);
        //}

        textbox.val('');
        namebox.val('').focus();
        ocassionbox.val('');
        datebox.val('');
        messagebox.val('');
        phonebox.val('');
        emailbox.val('');

        evt.preventDefault();
    });

    // Handle update
    $(document.body).on('change', '.item-text', function() {
        var newText = $(this).val();
        todoItemTable.update({ id: getTodoItemId(this), text: newText }).then(null, handleError);
    });

    $(document.body).on('change', '.item-complete', function() {
        var isComplete = $(this).prop('checked');
        todoItemTable.update({ id: getTodoItemId(this), complete: isComplete }).then(refreshTodoItems, handleError);
    });

    // Handle delete
    $(document.body).on('click', '.item-delete', function () {
        todoItemTable.del({ id: getTodoItemId(this) }).then(refreshTodoItems, handleError);
    });

    // On initial load, start by fetching the current data
    //refreshTodoItems();
});