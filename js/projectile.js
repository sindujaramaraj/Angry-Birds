function Projectile() {

}

(function() {

    var g = 9.81;

    Projectile.prototype = {
        project: function(object, initialHeight, projectionAngle, velocity, containerOffset) {
            project(object, initialHeight, projectionAngle, velocity, containerOffset);
        },
        /**
         * Find the height of projectile at a particular distance
         * Formula: y = y0 + x(tan of angle) - (gx^2/2((v(cos of angle))^2)
         * @param xValue
         * @param initialHeight
         * @param projectionAngle
         * @param velocity
         */
        getHeightAtX: function(xValue, initialHeight, projectionAngle, velocity) {
            return getHeightAtX(xValue, initialHeight, projectionAngle, velocity);
        }
    }

    /* Local functions */
    function getHeightAtX(xValue, initialHeight, projectionAngle, velocity) {
        var temp = 2 * Math.pow(velocity * Math.cos(projectionAngle), 2);
        return initialHeight + (xValue * Math.tan(projectionAngle)) - (g*Math.pow(xValue, 2)/temp);
    }

    function getMaximumDistanceTravel(initialHeight, projectionAngle, velocity) {
        var maxDistance = (velocity * Math.cos(projectionAngle)/g)*(
                                                                    (velocity*Math.sin(projectionAngle))
                                                                    + Math.pow(Math.pow(velocity*Math.sin(projectionAngle), 2) + (2*g*initialHeight), 0.5));
        return maxDistance;
    }

    function project(htmlObj, initialHeight, projectionAngle, velocity, containerOffset) {
        var xValue = 1;
        // var initialHeight = 1;
        initialHeight = pixelToMeter(initialHeight);
        var initialX = htmlObj.offsetLeft;
        var initialY = htmlObj.offsetTop;

        var maximumX = meterToPixel(getMaximumDistanceTravel(initialHeight, projectionAngle, velocity));        
        projectContinuously();

        function projectContinuously() {
            var height = getHeightAtX(pixelToMeter(xValue), initialHeight, projectionAngle, velocity);
            applyStyle(htmlObj, {
                top: (containerOffset - meterToPixel(height)) + "px",
                left: (initialX + xValue) + "px"
            });
            xValue++;
            if (xValue >= maximumX) {
                console.log("end");                    
                return; //end of projectile movement
            }
            setTimeout(projectContinuously, 5);
        }
    }
    
    
    /* 1m = 3779.527pixels */
    function meterToPixel(m) {
        var p = m*3779.527;
        return p;
    }

    function pixelToMeter(p) {
        var m = p/3779.527;
        return m;
    }
})();
