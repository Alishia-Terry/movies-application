/**
 * es6 modules and imports
 */
const sayHello = require('./hello.js');

sayHello(`Terry`);

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const $ = require ('jquery');






function updateMovies() {

    getMovies().then(movies => {

        let table =
            // "<h2>Movie Catalog</h2>" +
            "<table class='tbl-heading' id='movie-table'>"+
            "<thead>" +
            "<tr>" +
            "<th width='200' class='title-head'>Title</th>" +
            "<th width='200' class='rating-head'>Rating</th>" +
            "<th width='57' class='delete'>Delete</th>" +
            "</tr>" +
            "</thead>"+
            "<tbody>";

        movies.forEach(function (movie) {

            let title = movie.title;
            let id = movie.id
            let rating = movie.rating;

            table +=
                `<tr>
                    <td width="200" class="title-block">${title}</td>
                    <td width="200">${rating}</td>
                    <td><button data-id="${id}" class="delete-btn clear">Delete</button></td>
                </tr>`;
        });

        table += `</tbody></table>`;

        $(".bodyHTML").html(table);

        $('.clear').click(function (e) {
        e.preventDefault();
        console.log(e.target);
        let id = $(this).attr("data-id");
        console.log("clicked");
         fetch(`/api/movies/${id}`, {
             headers: {"content-type": "application/json"},
             method: "DELETE"
         }).then(() => {
             getMovies().then((movies) => {
            console.log(movies);
            updateMovies();
             });
        });
        });

        console.log('Here are all the movies:');
        console.log(movies);

        movies.forEach(({title, rating, id}) => {
            console.log(`${id} ${title} ${rating}`);
        });

    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });

};

updateMovies();


    $('#submit-button').click(function (e) {
        e.preventDefault();
        let title = $('#movie-title').val();
        let rating = $('#movie-ratings').val();
        let movie = {
            title: title,
            rating: rating
        };
        console.log(movie);
        fetch('/api/movies', {
            headers: {"content-type": "application/json"},
            method: "POST",
            body: JSON.stringify({title, rating})
        }).then(() => {
            return getMovies();
        }).then((movies) => {
            console.log(movies);
            updateMovies();
        });
    });


