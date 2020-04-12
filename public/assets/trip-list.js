$(document).ready(function(){
    $('form').on('submit', function(){
        var item = $('form input');
        var todo = {item: item.val()};

        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function(data){
                //do something with data via frontend framework
                location.reload();
            }
        });

        return false;
    });

    $('.table-row').on('click', function(){
        var item = $(this);
        var trip_id = item.attr("trip-id");

        window.location.assign("/trip/?_id="+trip_id);
        // $.ajax({
        //     type: 'GET',
        //     url: '/trip',
        //     data: {_id: trip_id},
        //     success: function(data){
        //         //do something with data via frontend framework
        //         console.log(data);
        //         item.replaceWith(data);
        //     }
        // });

        return false;
    });

    $('#trip-list li').on('click', function(){
        var item = $(this).text().replace(/ /g, "-");
        $.ajax({
          type: 'DELETE',
          url: '/todo/' + item,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
    });
})