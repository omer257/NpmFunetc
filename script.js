(function isdnPrj() {
    var source = $('#book-template').html();
    var template = Handlebars.compile(source);



    var getData = function () {
        var item =$('#isbnnumber').val();
        $.ajax({
            url: "https://www.googleapis.com/books/v1/volumes?q=isbn:"+item,

            // The name of the callback parameter, as specified by the YQL service
            jsonp: "callback",

            // Tell jQuery we're expecting JSONP
            dataType: "jsonp",

            // Tell YQL what we want and that we want JSON
            data: {
                format: "json"
            },

            // Work with the response
            success: function (response) {
                var data = response.items[0].volumeInfo;
                console.log(response.items[0].volumeInfo); // server response
                var newHTML = template({
                    title: data.title,
                    publisher: data.publisher,
                    publishedDate: data.publishedDate,
                    description: data.description,
                    infoLink: data.infoLink
                });
                $('.results').append(newHTML);
            },
            error: function (response) {
                console.log('fcuked'); // server response
            }
        });
    };
    
    var getList = function () {
        $.ajax({
            url: "https://www.googleapis.com/books/v1/volumes?q=space",

            // The name of the callback parameter, as specified by the YQL service
            jsonp: "callback",

            // Tell jQuery we're expecting JSONP
            dataType: "jsonp",

            // Tell YQL what we want and that we want JSON
            data: {
                format: "json"
            },

            // Work with the response
            success: function (response) {
                var xx = response;
                    console.log(xx.items[0]);
            },
            error: function (response) {
                console.log('fcuked'); // server response
            }
        });
    };
    
    $(".help").on('click',function () {
        getList();
    });
    $("form").submit(function () {
        getData();
    });

})();

