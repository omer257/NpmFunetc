/*jshint esnext: true */
class BooksearchClass {
    constructor(cont, tempElem) {
        this.resultsContainer = cont;
        this.source = tempElem.html();
        this.template = Handlebars.compile(this.source);
        this.LoadingAJax = '<img src="http://bestanimations.com/Animals/Mammals/Dogs/dogs/cute-funny-dog-animated-gif-8.gif">';
        this.noImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';
        this.noresText = 'No results found';
    }
    handleRes(response) {
        this.resultsContainer.empty();
        if (response.items !== undefined) {
            response.items.forEach((item) => {
                console.log(item);
                let newHTML = this.template({
                    title: this.fixData(item.volumeInfo.title),
                    publisher: this.fixData(item.volumeInfo.publisher),
                    publishedDate: this.fixData(item.volumeInfo.publishedDate),
                    description: this.fixData(item.volumeInfo.description),
                    infoLink: this.fixData(item.volumeInfo.infoLink),
                    id: this.fixData(item.volumeInfo.id),
                    authors: (item.volumeInfo.authors === undefined ? '' : item.volumeInfo.authors[0]),
                    image: (item.volumeInfo.imageLinks !== undefined ? item.volumeInfo.imageLinks.thumbnail : this.noImage)
                });
                this.resultsContainer.append(newHTML);
            });
        } else {
            this.resultsContainer.append(this.noresText);
        }
    }
    getData() {
        this.resultsContainer.empty().html(this.LoadingAJax);
        let sType = $(".active").attr("data-id");
        let item = $("#isbnnumber").val();
        let url = 'https://www.googleapis.com/books/v1/volumes?q=' + sType + ':' + item; //isbn:
        $.ajax({
            url: url,
            jsonp: "callback", // Tell jQuery we're expecting JSONP
            dataType: "jsonp", // Tell YQL what we want and that we want JSON
            data: {format: "json"}, // Work with the response
            success: (response) => this.handleRes(response),
            error: (response) => console.log(response) // server response
        });
    }
    fixData(string) {
        return string || 'Unknown';
    }
    getUrlParameter(sParam) {
        let window;
        let sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLletiables = sPageURL.split('&'),
            sParameterName, i;
        for (i = 0; i < sURLletiables.length; i++) {
            sParameterName = sURLletiables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }
}

let test = new BooksearchClass($('.results'), $('#book-template'));
$("form").submit(() => test.getData());
$(".menuitem").on('click', function () {
    $("#isbnnumber").val('');
    $(".menuitem").removeClass('active');
    $(this).addClass('active');
})

//let id = getUrlParameter('id');
//if (id !== undefined) { //Handle a get request
//    getData(id);
//}
