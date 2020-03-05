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
    },
    displaySunkedShips: function(msg) {
        var sunkedShipsArea = document.getElementById("sunkedShips")
        sunkedShipsArea.innerHTML = msg
    },
    displayRemainingShips: function(msg) {
        var remainingShipsArea = document.getElementById("remainingShips")
        remainingShipsArea.innerHTML = msg
    },
    displayGuesses: function(msg) {
        var guessesArea = document.getElementById("guesses")
        guessesArea.innerHTML = msg
    }
}

var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    shipsRemaining: 3,

    ships: [
        {locations: [0, 0, 0], hits: ["", "", ""]},
        {locations: [0, 0, 0], hits: ["", "", ""]},
        {locations: [0, 0, 0], hits: ["", "", ""]}
    ],

    fire: function(guess) {
        for(var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i]
            var index = ship.locations.indexOf(guess)
            if(index >= 0) {
                ship.hits[index] = "hit"
                view.displayHit(guess)
                view.displayMessage("TRAFIONY!")
                view.displayGuesses("Liczba strzałów: " + controller.guesses)
                if(this.isSunk(ship)) {
                    view.displayMessage("Zatopiłeś mój okręt!")
                    this.shipsSunk++
                    view.displaySunkedShips("Zatopione statki: " + this.shipsSunk)
                    this.shipsRemaining--
                    view.displayRemainingShips("Pozostałe statki: " + this.shipsRemaining)
                    view.displayGuesses("Liczba strzałów: " + controller.guesses)
                }
                return true
            }
        }
        view.displayGuesses("Liczba strzałów: " + controller.guesses)
        view.displayMiss(guess)
        view.displayMessage("Spudłowałeś.")
        return false
    },

    isSunk: function(ship) {
        for(var i = 0; i < this.shipLength; i++) {
            if(ship.hits[i] !== "hit") {
                return false
            }
        }
        return true
    },

    generateShipLocations: function() {
        var locations
        for(var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip()
            } while(this.collision(locations)) {
                this.ships[i].locations = locations
            }
        }
    },

    generateShip: function() {
        var direction = Math.floor(Math.random() * 2)
        var row, col

        if(direction === 1) {
            //poziom, pierwsze pole
            row = Math.floor(Math.random() * this.boardSize)
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength))
        }
        else {
            //pion, pierwsze pole
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength))
            col = Math.floor(Math.random() * this.boardSize)
        }

        var newShipLocations = []
        for(var i = 0; i < this.shipLength; i++) {
            if(direction === 1) {
                //poziom, następne pola
                newShipLocations.push(row + "" + (col + i))
            }
            else {
                //pion, następne pola
                newShipLocations.push((row + i) + "" + col)
            }
        }
        return newShipLocations
    },

    collision: function(locations) {
        for(var i = 0; i < this.numShips; i++) {
            var ship = model.ships[i]

            for(var j = 0; j < locations.length; j++) {
                if(ship.locations.indexOf(locations[j]) >= 0) {
                    return true
                }
            }
        }
        return false
    }
}

var controller = {
    guesses: 0,

    processGuess: function(guess) {
        var location = parseGuess(guess)
        if(location) {
            this.guesses++
            var hit = model.fire(location)
            if(hit && model.shipsSunk === model.numShips) {
                view.displayMessage("Zatopiłeś wszytskie moje okręty, w " + this.guesses + " próbach.")
            }
        }
    }
}

function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"]

    if(guess === null || guess.length !== 2) {
        alert("Ups, proszę wpisać literę i cyfrę.")
    }
    else {
        firstChar = guess.charAt(0)
        var row = alphabet.indexOf(firstChar)
        var column = guess.charAt(1)

        if(isNaN(row) || isNaN(column)) {
            alert("Ups, to nie są współrzędne!")
        }
        else if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize)  {
            alert("Ups, pole za planszą!")
        }
        else {
            return row + column
        }
    }
    return null
}

function handleFireButton() {
    var guessInput = document.getElementById("guessInput")
    var guess = guessInput.value
    controller.processGuess(guess)

    guessInput.value = ""
}

function init() {
    var fireButton = document.getElementById("fireButton")
    fireButton.onclick = handleFireButton
    var guessInput = document.getElementById("guessInput")
    guessInput.onkeypress = handleKeyPress

    model.generateShipLocations()

    view.displayGuesses("Liczba strzałów: " + controller.guesses)
    view.displayRemainingShips("Pozostałe statki: " + model.shipsRemaining)
    view.displaySunkedShips("Zatopione statki: " + model.shipsSunk)
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton")
    if(e.keyCode === 13) {
        fireButton.click()
        return false
    }
}


window.onload = init
