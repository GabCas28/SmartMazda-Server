$(document).ready(function(){
    var pathname = window.location.pathname;
    $('#top-menu li').on('click', function(e){
        e.target.classList.toggle("active");
    });
})