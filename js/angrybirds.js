/**
 *
 */

(function() {

    function AngryBirds() {}

    AngryBirds.prototype = {
        init: function(playArea, pigType) {
            this._playArea = playArea;
            this._pigType = pigType;
            this._createBirds([{type: "redbird", state: "rest", event: "pull"}]);
            this._createPigs();
        },
        _createBirds: function(birdTypes) {
            this._birds = [];
            var bird = null;
            var birdsstand = document.getElementById("birdsstand");
            for (var idx = 0, len = birdTypes.length; idx < len; idx++) {
                bird = new Bird(birdTypes[idx].type, birdTypes[idx].state);
                this._birds.push(bird);
                bird.render(birdsstand);
            }
        },
        _createPigs: function() {
            this._pigs = [];
            var pig = null;
            var pigsContainer = document.getElementById("pigstock");
            var aWidth = pigsContainer.offsetWidth;
            var aHeight = pigsContainer.offsetHeight;
            var count = this._calculatePigCountByPigType(aWidth, aHeight);
            var idx = 0;
            while (idx < count) {
                pig = new Pig(this._pigType);
                this._pigs.push(pig);
                pig.render(pigsContainer);
                idx++;
            }
            var me = this;
            //return;
            setInterval(function() {
                idx = 0;
                while (idx < count) {
                    me._pigs[idx].changeState();
                    idx++;
                }
            }, 500);
        },
        _calculatePigCountByPigType: function(width, height) {
            var dim;
            switch(this._pigType) {
                case "pig1":
                    dim = 40;
                    break;
                case "pig2":
                    dim = 80;
                    break;
                case "pig3":
                    dim = 120;
                    break;
                case "pig4":
                    dim = 160;
                    break;
            }
            return Math.floor(width/dim)*Math.floor(height/dim);
        }

    };

    function Pig(type) {
        this._type = type;
        this._state = "eyes_closed";
    }

    Pig.prototype = {
        render: function(parent) {
            var pigDiv = document.createElement("div");
            pigDiv.className = this._type + " " + this._state;
            parent.appendChild(pigDiv);
            this._element = pigDiv;
        },
        changeState: function(newState) {
            if (!newState) {
                switch(this._state) {
                    case "eyes_closed":
                        newState = "eyes_opened";
                        break;
                    case "eyes_opened":
                        newState = "eyes_closed";
                        break;
                }
            }
            this._state = newState;
            this._element.className = this._type + " " + this._state;
        }
    };


    function Bird(type, state, action) {
        this._type = type;
        this._state = state;
        this._action = action;
    }

    (function() {
        Bird.prototype= {
            render: function(parent) {
                var birdDiv = document.createElement("div");
                birdDiv.className = "bird " + this._type + " " + this._state;
                parent.appendChild(birdDiv);
                birdDiv.addEventListener("click", clickOnBird(this));
                birdDiv.addEventListener("drag", pullString(this));
                birdDiv.addEventListener("drop", releaseString(this));
                this._element = birdDiv;
            },
            changeState: function() {

            },
            handleClick: function(event) {
                switch (this._action) {
                    case "pull":
                        this._state = "readyToPull";
                        break;
                }
                console.log(this._state);
            },
            handlePullFromString: function(event) {
                if (this._state == "readyToPull") {
                    this._state = "pulled";
                }
                if (this._state == "pulled") {
                    applyStyle(this._element, {

                    });
                }
                console.log(this._state);
            },
            handleStringRelease: function(event) {
                if (this._state == "pulled") {
                    //project the bird by using projectile formulas
                }
                console.log(this._state);
            }
        };

        function clickOnBird(instance) {
            return function(event) {
                instance.handleClick(event);
            }
        }

        function pullString(instance) {
            return function(event) {
                instance.handlePullFromString(event);
            }
        }

        function releaseString(instance) {
            return function(event) {
                instance.handleStringRelease();
            }
        }
    })();

    function applyStyle(element, styles) {
        for (var style in styles) {
            element.style[style] = styles[style];
        }
    }

    window.AngryBirds = new AngryBirds();
})();

function PlainProjectileMovement() {
}

//object that needs to move in a projectile line
PlainProjectileMovement.project = function(object, force) {
    //calculate current position
}

