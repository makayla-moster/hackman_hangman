/**
* Hangman in Vanilla Javascript
* @see https://github.com/jelofsson/hangman-js
* @author jelofsson
**/

var Hangman = (function () {

    function Hangman(hangID) {
        this.hangID  = hangID;
    }

    Hangman.prototype.reset = async function (mode) {
        // Variables
        this.STOPPED = false;
        this.MISTAKES = 0;
        this.GUESSES = [];
        this.CHOSEN = false;
        this.hideElementByClass('wording');

        if (mode == 'easy'){
          // Select a random word from the list
          var num = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
          console.log(num);
          this.WORD = await fetch(`https://clemsonhackman.com/api/word?key=${atob('NTZGNzM=')}&length=${num}`)
    			.then(response => response.json())
    			.then(data => data.word.toLowerCase())
          // DOM Elements
          this.hideElementByClass('h');
          this.showElementByIdWithContent(this.hangID + "_guessbox", null);
          this.showElementByIdWithContent(this.hangID + "_start", null);
          this.showElementByIdWithContent(this.hangID + "_word", this.getGuessedfWord());
        }
        else if (mode == 'medium') {
          this.WORD = this.pirateWord();
          this.hideElementByClass('h');
          this.showElementByIdWithContent(this.hangID + "_guessbox", null);
          this.showElementByIdWithContent(this.hangID + "_start", null);
          this.showElementByIdWithContent(this.hangID + "_word", this.getGuessedfWord());
        }
        else if (mode == 'hard'){
          var num = Math.floor(Math.random() * (15 - 9 + 1)) + 9;
          this.WORD = await fetch(`https://clemsonhackman.com/api/word?key=${atob('NTZGNzM=')}&length=${num}`)
    			.then(response => response.json())
    			.then(data => data.word.toLowerCase())
          this.hideElementByClass('h');
          this.showElementByIdWithContent(this.hangID + "_guessbox", null);
          this.showElementByIdWithContent(this.hangID + "_start", null);
          this.showElementByIdWithContent(this.hangID + "_word", this.getGuessedfWord());
        }

    };

    Hangman.prototype.guess = function (letter) {
        letter = letter.charAt(0).toLowerCase();

        // Check if game is stopped or the user already guessed on that letter
        if (this.STOPPED || this.GUESSES.indexOf(letter) > -1) {
            // Then we wont do anything
            return;
        }

        this.showElementByIdWithContent(this.hangID + '_gbox', null);
        // Add the letter to our GUESSES array
        this.GUESSES.push(letter);
        // Update the word hint, and guessed letter list for the user
        this.showElementByIdWithContent(this.hangID + "_word", this.getGuessedfWord());
        this.showElementByIdWithContent(this.hangID + "_guesses", this.GUESSES.join(''));

        // Check if our word does not contain the guessed letter
        if (this.WORD.indexOf(letter) < 0) {
            // Incorrect guess, increase our mistakes by one
            this.MISTAKES++;
            // Show next part of hangman character
            if (this.MISTAKES == 1){
              this.showElementByIdWithContent(this.hangID + "_Wrong", '<img src="./imgs/Landing_Page.png" width="500" height="500" alt="">');
            }
            else if (this.MISTAKES == 2){
              this.showElementByIdWithContent(this.hangID + "_Wrong", '<img src="./imgs/Wrong_1.png" width="500" height="500" alt="">');
            }
            else if (this.MISTAKES == 3){
              this.showElementByIdWithContent(this.hangID + "_Wrong", '<img src="./imgs/Wrong_2.png" width="500" height="500"" alt="">');
            }
            else if (this.MISTAKES == 4){
              this.showElementByIdWithContent(this.hangID + "_Wrong", '<img src="./imgs/Wrong_3.png" width="500" height="500" alt="">');
            }
            else if (this.MISTAKES == 5){
              this.showElementByIdWithContent(this.hangID + "_Wrong", '<img src="./imgs/Wrong_4.png" width="500" height="500" alt="">');
            }
            else if (this.MISTAKES == 6){
              this.showElementByIdWithContent(this.hangID + "_Wrong", '<img src="./imgs/Wrong_5.png" width="500" height="500" alt="">');
            }
            else if (this.MISTAKES == 7){
              this.showElementByIdWithContent(this.hangID + "_Wrong", '<img src="./imgs/Wrong_6.png" width="500" height="500" alt="">');
            }
            else if (this.MISTAKES == 8){
              this.showElementByIdWithContent(this.hangID + "_Wrong", '<img src="./imgs/Wrong_7.png" width="500" height="500" alt="">');
            }
            else if (this.MISTAKES == 9){
              this.showElementByIdWithContent(this.hangID + "_Wrong", '<img src="./imgs/Wrong_8.png" width="500" height="500" alt="">');
            }

            // this.showElementByIdWithContent(this.hangID + "_" + this.MISTAKES, null);
            // Check if its Game Over
            if (this.MISTAKES === 9) {
                this.hideElementByClass('start');
                this.showElementByIdWithContent(this.hangID + "_end", "Walk the plank! Ye sent thy cap'n to Davy Jones' locker!<br/><br/>The lost treasure was: " + this.WORD);
                this.showElementByIdWithContent(this.hangID + "_Wrong", '<img src="./imgs/Lose.png" width="500" height="500" alt="">');
                this.STOPPED = true;
                this.showElementByIdWithContent("wording", null);
            }
        } else if (this.WORD.indexOf(this.getGuessedfWord()) !== -1) {
          this.hideElementByClass('start');
            // Victory condition
            this.showElementByIdWithContent(this.hangID + "_end", "Ye saved the cap'n!<br/>Yer treasure is: " + this.WORD);
            this.showElementByIdWithContent(this.hangID + "_Wrong", '<img src="./imgs/Win.png" width="500" height="500" alt="">');
            this.STOPPED = true;
            this.showElementByIdWithContent("wording", null);
        }


    };

    Hangman.prototype.showElementByIdWithContent = function (hangID, content) {
        if (content !== null) {
            document.getElementById(hangID).innerHTML = content;
        }
        document.getElementById(hangID).style.opacity = 1;
    };

    Hangman.prototype.hideElementByClass = function (elClass) {
        var elements = document.getElementsByClassName(elClass), i;
        for (i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 0;
        }
    };

    Hangman.prototype.getGuessedfWord = function () {
        var result = "", i;
        for (i = 0; i < this.WORD.length; i++) {
            // Word characters
            result += (this.GUESSES.indexOf(this.WORD[i]) > -1) ?
                    this.WORD[i] : "_";
        }
        return result;
    };

    Hangman.prototype.pirateWord = function () {
      var Pirate_Words = [
        "abandon",
        "anchor",
        "attack",
        "adventure",
        "armada",
        "ashore",
        "ahoy",
        "alcohol",
        "bandolier",
        "battle",
        "brawl",
        "beach",
        "barrel",
        "bounty",
        "buccaneer",
        "cannon",
        "capture",
        "coastline",
        "confiscate",
        "crew",
        "cutlass",
        "capsize",
        "cargo",
        "chest",
        "coins",
        "conquest",
        "criminal",
        "cruel",
        "cutthroat",
        "captain",
        "cave",
        "coast",
        "compass",
        "contraband",
        "course",
        "crook",
        "curse",
        "dagger",
        "danger",
        "deserted",
        "deck",
        "dishonest",
        "daring",
        "deckhand",
        "doubloon",
        "earring",
        "explore",
        "escape",
        "evil",
        "fear",
        "fight",
        "fleet",
        "fearsome",
        "flotsam",
        "jetsam",
        "flag",
        "fortune",
        "galleon",
        "gun",
        "gunpowder",
        "gangplank",
        "gold",
        "gunner",
        "gear",
        "greed",
        "gunpowder",
        "haul",
        "hijack",
        "horizon",
        "hurricane",
        "heist",
        "hold",
        "hostile",
        "hook",
        "hull",
        "island",
        "illegal",
        "infamous",
        "jewels",
        "keel",
        "kill",
        "keelhaul",
        "knife",
        "kidnap",
        "land",
        "lash",
        "limey",
        "loot",
        "lawless",
        "lore",
        "landlubber",
        "legend",
        "lookout",
        "lucre",
        "maggot",
        "marauder",
        "mast",
        "menace",
        "mutiny",
        "malaria",
        "mariner",
        "mates",
        "merchant",
        "mermaid",
        "map",
        "maroon",
        "mayhem",
        "musket",
        "nautical",
        "notorious",
        "navigate",
        "ocean",
        "outcasts",
        "overboard",
        "parley",
        "pistol",
        "predatory",
        "parrot",
        "pillage",
        "plank",
        "privateer",
        "pegleg",
        "pirate",
        "plunder",
        "prowl",
        "quartermaster",
        "raid",
        "rations",
        "revenge",
        "rigging",
        "robber",
        "ruffian",
        "quarters",
        "ransack",
        "realm",
        "revolt",
        "belowdecks",
        "rope",
        "rum",
        "quest",
        "rat",
        "reckoning",
        "riches",
        "rob",
        "poor",
        "rudder",
        "ruthless",
        "sabotage",
        "sailor",
        "scurvy",
        "sextant",
        "skiff",
        "steal",
        "swashbuckling",
        "sail",
        "scalawag",
        "seas",
        "ship",
        "shore",
        "sword",
        "sailing",
        "scar",
        "seaweed",
        "shipmate",
        "silver",
        "spoils",
        "swagger",
        "thief",
        "tides",
        "truce",
        "thievery",
        "torture",
        "treasure",
        "thug",
        "trade",
        "unlawful",
        "vanquish",
        "vile",
        "violent",
        "unscrupulous",
        "vessel",
        "villain",
        "vansalize",
        "vicious",
        "violence",
        "weapons"
      ]

      return Pirate_Words[Math.floor(Math.random() * Pirate_Words.length)];
    }



    return new Hangman('hangm');
}());
