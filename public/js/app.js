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
  var dest = $("#link").val()
  if ( dest === "who") {
    $('audio').attr("src", 'sounds/doctor_who_theme_full.mp3');
  } else {
    $('audio').attr("src", $("#link").val());
  }
  
});
