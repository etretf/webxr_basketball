// Ball positions for each layer (top, bottom)
const BALL_POSITIONS = ['0 0 0', '0 0 0.45', '0 0 -0.45'];

AFRAME.registerComponent('rack', {
    schema: {
        ballCount: {type: 'number', default: 6}
    },
    update: function () {
        // Respawn the balls when no more balls are left on the rack
        if (this.data.ballCount === 0) {
            this.respawnBalls();
            this.data.ballCount = 6; // reset the rack ball count
        }
    },

    respawnBalls: function () {
        const rackTop = document.querySelector('#rack-top');
        const rackBottom = document.querySelector('#rack-bottom');

        // Create new ball and append it to the correct rack layer
        for (let i = 0; i < 6; i++) {
            const newBall = document.createElement('a-entity');
            newBall.setAttribute('pickup-ball', {});
            newBall.classList.add('interactive');
            newBall.setAttribute('gltf-model', '#basketball_model');
            newBall.setAttribute('scale', '0.2 0.2 0.2');

            // Append to top layer
            if (i < 3) {
                newBall.setAttribute('position', BALL_POSITIONS[i]);
                rackTop.appendChild(newBall);
            } else {
                // Append to bottom layer
                newBall.setAttribute('position', BALL_POSITIONS[i - 3]);
                rackBottom.appendChild(newBall);
            }
        }
    }
});