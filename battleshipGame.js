var view = {
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea")
        messageArea.innerHTML = msg
    },
    displayHit: function(location) {
        var cell = document.getElementById(location)
        cell.setAttribute("class", "hit")
    },
    displayMiss: function(location) {
        var cell = document.getElementById(location)
        cell.setAttribute("class", "miss")
    }
}

view.displayMiss("00")
view.displayHit("34")
view.displayMiss("55")
view.displayHit("12")
view.displayMiss("25")
view.displayHit("26")
view.displayMessage("Is it working?")

var ships = [
    {locations: ["10", "20", "30"], hits: ["", "", ""]},
    {locations: ["10", "20", "30"], hits: ["", "", ""]},
    {locations: ["10", "20", "30"], hits: ["", "", ""]}
]