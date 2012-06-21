function Projectile() {

}

(function() {

    var g = 9.81;

    Projectile.prototype = {
        project: function(object, initialHeight, projectionAngle, velocity) {
            project(object, initialHeight, projectionAngle, velocity);
        },
        /**
         * Find the height of projectile at a particular distancec
         * Formula: y = y0 + x(tan of angle) - (gx^2/2(v(cos of angle)^2)
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

    function project(htmlObj, initialHeight, projectionAngle, velocity) {
        var xValue = 1;
        var initialHeight = 0;
        var initialX = htmlObj.offsetLeft;
        var initialY = htmlObj.offsetTop;

        projectContinuously();

        function projectContinuously() {
            var height = getHeightAtX(xValue, initialHeight, projectionAngle, velocity);
            applyStyle(htmlObj, {
                top: (initialY + height) + "px",
                left: (initialX + xValue) + "px"
            });
            xValue++;
            if (height == initialHeight) return; //end of projectile movement
            setTimeout(projectContinuously, 100);
        }
    }
})();