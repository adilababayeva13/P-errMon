$(document).ready(function () {
    $("#userfeedback").on("click", function () {
        console.log('basildi')
    $.ajax({
        type: "POST",
        url: "/userfeedback",
        data: {
        name: $('#feedbackerName').val().trim(),
        email: $('#feedbackerEmail').val().trim(),
        domain :$('#siteDomain').val().trim(),
        reason : $('#reasonErr').val().trim(),
        other : $('#other').val().trim(),
        subdomain :$('#siteSubDomain').val().trim(),
        city: $('#feedbackerCity').val().trim(),
        usermessage: $('#feedbackermessage').val().trim(),
        },
        success: function (data) {
        location.reload();
        },
    });
    });
});