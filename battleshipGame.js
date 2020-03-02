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

var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [
        {locations: ["06", "16", "26"], hits: ["", "", ""]},
        {locations: ["24", "34", "44"], hits: ["", "", ""]},
        {locations: ["10", "11", "12"], hits: ["", "", ""]}
    ],
    fire: function(guess) {
        for(var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i]
            var index = ship.locations.indexOf(guess)
            if(index >= 0) {
                ship.hits[index] = "hit"
                view.displayHit(guess)
                view.displayMessage("TRAFIONY!")
                if(this.isSunk(ship)) {
                    view.displayMessage("Zatopiłeś mój okręt!")
                    this.shipsSunk++
                }
                return true
            }
        }
        view.displayMiss(guess)
        view.displayMessage("Spudłowałeś.")
        return false
    },
    isSunk: function(ship) {
        for(var i = 0; i < this.shipLength; i++) {
            if(ship.hits[i] !== "hit") {
                return false
            }
            return true
        }
    }
}

// model.fire("06"); // hit
// model.fire("16"); // hit
// model.fire("26"); // hit

// model.fire("34"); // hit
// model.fire("24"); // hit
// model.fire("44"); // hit

// model.fire("12"); // hit
// model.fire("11"); // hit
// model.fire("10"); // hit
