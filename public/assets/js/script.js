$(document).ready(function () {
  $("#createProject").on("click", function () {
    $.ajax({
      type: "POST",
      url: "/createProject",
      data: {
        name: $("#project-name").val().trim(),
        url: $("#url").val().trim(),
      },
      success: function (data) {
        location.reload()
      },
    })
  })
  $(".trash-bin").on("click", function () {
    if (confirm("Do you want to delete this project?")) {
      var projectId = $(this).data("project_id")
      $.ajax({
        url: `/delProject/${projectId}`,
        type: "DELETE",
        success: function (response) {
          console.log(response)
          location.reload()
        },
      });
    } 
  })
   $(".errorDelete").on("click", function () {
    if (confirm("Do you want to delete this error message?")) {
      var errorId = $(this).data("error_id");
      $.ajax({
        url: `/showerrors/deleteerror/${errorId}`,
        type: "DELETE",
        success: function (response) {
          location.reload()
        },
      });
    }
  })
    $(".error-select").on("click", function() {
      var value = $(this).val().toLowerCase();
      console.log(value);
      if((value=="all")){
        location.reload();
       
      }
      
      $(".appinfo").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  
    $(".performance-select").on("click", function() {
      var value = $(this).val().toLowerCase();
      console.log(value);
      if((value=="all")){
        location.reload();
       
      }
      
      $(".perinfo").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
})
//--------------
function copyFunction(htmlElement) {

  if(!htmlElement){
    return '';
  }else{
    const element = htmlElement.innerText
    let inputElement = document.createElement('input')
    inputElement.setAttribute('value',element)
    document.body.appendChild(inputElement)
    inputElement.select()
    document.execCommand('copy')
    inputElement.parentNode.removeChild(inputElement)
  }
}
$('.copy-clipboard').on('click',function(){
  copyFunction(document.querySelector('.copiedBody'))
})

