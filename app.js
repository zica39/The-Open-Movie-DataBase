const omdb = 'http://www.omdbapi.com/?apikey=3e9bec98&' //7acf7772&'

$(document).ready(function() {


    $('#pretraga').on('search', e => {
        $('#trazi').trigger('click');
        $('#pretraga').blur();
    });
    $('#tip').on('change', e => {
        $(lista).empty();
    });
    $('form').on('submit',e => {event.preventDefault();});


    $('#pretraga').on('input', e => {

        if (!$('#pretraga').val()) {
            $(lista).empty();
            return;
        }

        if (event.inputType == undefined) return;

        var pretraga = {}
        pretraga.s = $('#pretraga').val();
        pretraga.type = $('#tip').val();

        $.ajax({
            url: omdb + $.param(pretraga),
            type: 'GET',
            success: function(result) {

                $(lista).empty();
                for (var i in result.Search) {

                    $(lista).append(`<option>${result.Search[i].Title}</option>`);
                }
                $(lista).attr('open', '');

            }
        });
    });


    $('#trazi').click((e) => {

        var pretraga = {}
        pretraga.t = $('#pretraga').val();
        if (!pretraga.t) {
            return true;
        }
        
        event.preventDefault();
        
        $('#trazi').find('span').html('');
        $('#trazi').find('span').addClass('spinner-border');

        pretraga.type = $('#tip').val();
        if ($('#godina').val()) pretraga.y = $('#godina').val()

        var url = omdb + $.param(pretraga);

        $.ajax({
            url: url,
            isFilm: $('#tip').val() == 'movie',
            type: 'GET',
            success: function(result) {

                $('#trazi').find('span').removeClass('spinner-border');
                $('#trazi').find('span').html('🔍');


                var prikaz = $('#serach_result_temp').clone(true);

                $('#rezultat').empty();


                if (result.Error) {
                    $('#rezultat').html(`<h2 class = 'text-center mt-5' >${result.Error}</h2>`);
                    return;
                }

                prikaz.find('#poster').attr('src', result.Poster);

                prikaz.find('#naslov').html(result.Title);
                prikaz.find('#godina').html(result.Year);
                prikaz.find('#datum').html(result.Released);
                prikaz.find('#trajanje').html(result.Runtime);
                prikaz.find('#reziser').html(result.Director);
                prikaz.find('#glumci').html(result.Actors);
                prikaz.find('#radnja').html(result.Plot);

                if (!this.isFilm) {
                    prikaz.find('#sezona').html(result.totalSeasons);
                    prikaz.find('#sezona').parent().removeAttr('hidden');
                }

                for (var i in result.Ratings)
                    prikaz.find('#ocene').append(`<div class = 'col-8'>${result.Ratings[i].Source}</div><div class = 'col-4'>⭐${result.Ratings[i].Value}</div>`);

                $('#rezultat').append(prikaz);
                prikaz.removeAttr('hidden');

            }
        });

    });
});
