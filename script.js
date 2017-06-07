(function isdnPrj() {


    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
    var source = $('#book-template').html();
    var template = Handlebars.compile(source);
    var id = getUrlParameter('id');


    var getData = function (item) {
        var LoadingAJax='<img src="http://bestanimations.com/Animals/Mammals/Dogs/dogs/cute-funny-dog-animated-gif-8.gif">';
        $('.results').empty().html(LoadingAJax)
        $.ajax({
            url: "https://www.googleapis.com/books/v1/volumes?q=" + item + '&rnd=' + Math.random(),

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
                $('.results').empty();
                if (response.items.length > 0) {
                    response.items.forEach(function (item) {
                        var data = item.volumeInfo;
                        var newHTML = template({
                            title: data.title || 'Unknown :( ',
                            publisher: data.publisher || 'Unknown :( ',
                            publishedDate: data.publishedDate || 'Unknown :( ',
                            description: data.description || 'Unknown :( ',
                            infoLink: data.infoLink || 'Unknown :( ',
                            id: item.id || 'Unknown :( ',
                            image: data.imageLinks.thumbnail || 'http://funnystack.com/wp-content/uploads/2015/07/Funny-Children-32.jpg'
                        });
                        $('.results').append(newHTML);
                    });
                } else {
                    $('.results').append('No results found');
                }
            },
            error: function (response) {
                console.log('fcuked'); // server response
            }
        });
    };
    if (id !== undefined) {
        getData(id);
    }
    $("form").submit(function () {
        getData($('#isbnnumber').val());
    });

})();
