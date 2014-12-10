var checkbox = document.getElementById("loadremote");

$('#box').click(function(){
   var isChecked = $('#box').prop('checked'); 
   if (isChecked) {
    $('#loader').removeClass('hidden');
   } else {
    $('#loader').addClass('hidden');
   }
})

$("#load").click(function(){
  $('audio').attr("src", $("#link").val())
});
