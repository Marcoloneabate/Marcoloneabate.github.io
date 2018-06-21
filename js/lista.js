console.log("Pagina lista");
var person = {
    "name": "Pippo",
    "age": 37,
    "children": [{
        "name": "Gigino",
        "age": 3,
        "name": "Pipino",
        "age": 2
    }],
    "partner": {
        "name": "Bilbo",
        "age": 28
    }
}
console.log(person.name, person.children[0].name)


var SERVICE_URL = "https://jsonplaceholder.typicode.com/";