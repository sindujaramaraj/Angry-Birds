/**
 *
 */
(function() {
    var container = null;
    var startBirdPull = false;
    var stringLength = 100;
    var projectile = new Projectile();

    function AngryBirds() {}

    AngryBirds.prototype = {
        init: function(playArea, pigType) {
            container = playArea;
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

    (function () {
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
    })();

    function Bird(type, state) {
        this._type = type;
        this._state = state;
    }

    (function() {
        Bird.prototype= {
            render: function(parent) {
                var birdDiv = document.createElement("div");
                birdDiv.className = "bird " + this._type + " " + this._state;
                parent.appendChild(birdDiv);
                birdDiv.addEventListener("mousedown", clickOnBird(this));
                this._element = birdDiv;
                this._initPosX = this._element.offsetLeft;
            },
            changeState: function() {

            },
            handleClick: function(event) {
                switch (this._state) {
                    case "rest":
                        this._state = "readyToPull";
                        startBirdPull = true;
                        this._pullStringListener = pullString(this);
                        container.addEventListener("mousemove", this._pullStringListener);
                        this._stopBirdPullListener = stopBirdPull(this);
                        container.addEventListener("mouseup", this._stopBirdPullListener);
                        this._origX = event.x;
                        this._origY = event.y;
                        break;
                }
                console.log(this._state);
            },
            handlePullFromString: function(event) {
                if (this._state == "readyToPull") {
                    this._state = "pulled";
                }
                if (this._state == "pulled") {
                    //check if the distance is more than the length of string
                    var d = Math.abs(distanceBetween2Points(event.clientX, this._origX, event.clientY, this._origY));
                    if (d > stringLength) {
                        console.log(d);
                        return;
                    }
                    applyStyle(this._element, {
                        left: event.x - container.offsetLeft + "px",
                        top: event.y  - container.offsetTop + "px"
                    });
                }
                console.log(this._state);
            },
            handleStringRelease: function(event) {
                if (this._state == "pulled") {
                    //project the bird by using projectile formulas
                    startBirdPull = false;
                    container.removeEventListener("mousemove", this._pullStringListener);
                    container.removeEventListener("mouseup", this._stopBirdPullListener);
                    var containerOffset = container.offsetTop + container.offsetHeight;
                    projectile.project(this._element, containerOffset - this._element.offsetTop, 50, getVelocity(this._initPosX - this._element.offsetLeft), containerOffset);
                }
                console.log(this._state);
            }
        };

        //velocity increases as the distance increases
        //maximum velocity is 80
        function getVelocity(d) {
            return d < 80 ? (d < 0 ? 30 : d) : 80;
        }

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

        function stopBirdPull(instance) {
            return function(event) {
                startBirdPull = false;
                instance.handleStringRelease(event);
            }
        }

    })();

    function distanceBetween2Points(x1, x2, y1, y2) {
        var temp = Math.pow((x2-x1), 2) + Math.pow((y2-y1), 2);
        return Math.pow(temp, 0.5);
    }

    window.AngryBirds = new AngryBirds();
})();

