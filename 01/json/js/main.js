console.log(json);

function listOfAnimals(data, start, count) {
    try {
        if(isNaN(start) || isNaN(start)) throw "Argument(s) is/are not a number";
        if(start < 0) throw "First argument cannot be less than zero";
        if(start > json.length-1) throw "First argument cannot be greater than the highest index in the array of objects";
        if(start+count > json.length-1) throw "Second argument is too high";
    }
    catch(err) {
        return("<div class=\"bg-danger\">Error: <b>" + err + "</b></div>");
    }    
    var list = [];
    for (var i=start; i < start+count; i++) {
        list.push(data[i]);
    } 
    return (list.length > 0) ? list : "<p>No items</p>";
}


function detailOfAnimal(data, id) {
    var animal = {};
    try {
        if(isNaN(id)) throw "Argument is not a number";
        var i = 0;
        while (!animal || i < data.length) {
            if (data[i].id == id) animal = data[i];
            i++;
        }
        if (!animal) throw "Not valid ID";
    }
    catch(err) {
        return("<div class=\"bg-danger\">Error: <b>" + err + "</b></div>");
    }    
    return animal;
}

$(function() {
    var animal = {};
    var animals = [];
    var startPage = 1;
    var activePage = 1;

    function listView(start, count){
        animals = listOfAnimals(json,start,count);
        animal = animals[0];
        $("#listOfAnimals").html('<div class="list-group"></div>');
        animals.forEach(function(item, index){
            $('#listOfAnimals .list-group').append('<a href="#" class="list-group-item" data-id='+item.id+'>'+item.title+'</a>');
        });

        itemClick();
    }

    function pagination(rows, start, count){
        $('#pagination').html('<ul class="pagination pagination-sm"></ul>');
        var pages = Math.floor(rows / 10);
        if (start > 1) {
            $('#pagination ul').append('<li><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>');
            previousClick();
        }                       
        for(var i = start; i < start + count; i++) {
            $('#pagination ul').append('<li><a href="#">' + i + '</a></li>');
        }
        if (start+count-1 < pages) {
            $('#pagination ul').append('<li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>');
            nextClick();
        }        

        pageClick();
    }
    
    function detailView(animal){
        try {
            $('#detail h3').html(animal.title +' <small>'+ animal.latin_title +'</small>');
            $('#detail #classes').html(animal.classes.title);
            $('#detail #order').html(animal.order.title);
            $('#detail #continents').html(animal.continents.name_c);
            $('#detail #food').html(animal.food.name_f);
            $('#detail #biotop').html(animal.biotop.name_b);
            if (animal.localities) {
                $('#detail #localities').html(animal.localities.title);
                $('#detail #localities').attr('href', animal.localities.url);
            } else {
                $('#detail #localities').html('');
                $('#detail #localities').attr('href', '#');
            }
            $('#detail #description').html(animal.description);
            if ($('#detail #description img')) {
                $('#detail #description img').addClass('img-responsive');
                var src = $('#detail #description img').attr('src');
                if (src) {
                    if (src.substr(0,4) !== 'http') $('#detail #description img').attr('src','https://zoopraha.cz/'+src);
                }    
            }
            $('#detail #reproduction').html(animal.reproduction);
            $('#detail #food_note').html(animal.food_note);
            $('#detail #biotopes_note').html(animal.biotopes_note);
            $('#detail #spread_note').html(animal.spread_note);
            $('#detail #proportions').html(animal.proportions);
            $('#detail #attractions').html(animal.attractions);
        } catch(err) {
            alert('Chyba v datech');
        }
    }

    function pageClick(){
        $('#pagination ul li a:not([aria-label])').on('click', function(){
            console.log($(this).text());
            listView(10 * parseInt($(this).text())-10,10);
            detailView(animal);
        });
    };

    function previousClick(){
        $('#pagination [aria-label=Previous]').on('click', function(){
            startPage -= 5;
            pagination(json.length,startPage,5);
            listView((10 * startPage)-10,10);
            detailView(animal);
        });
    };

    function nextClick(){
        $('#pagination [aria-label=Next]').on('click', function(){
            startPage += 5;
            pagination(json.length,startPage,5);
            listView((10 * startPage)-10,10);
            detailView(animal);
        });
    };

    function itemClick(){
        $('#listOfAnimals .list-group a').on("click", function(){
            animal = detailOfAnimal(json,$(this).data('id'));
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            detailView(animal);
        });
    };
    
    listView(0,10);
    detailView(animal);
    pagination(json.length, startPage, 5);    
});