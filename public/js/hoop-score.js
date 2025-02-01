AFRAME.registerComponent('hoop-score', {
    schema: {
        score: {type: 'number', default: 0}
    },
    init: function () {
        const CONTEXT_AF = this;

        // Add references to CONTEXT_AF
        CONTEXT_AF.scoreText = document.querySelector('#score-text');
        CONTEXT_AF.scoreText.setAttribute('text', {value: CONTEXT_AF.data.score});
        CONTEXT_AF.scoreSound = document.querySelector('#score_sound');

        CONTEXT_AF.el.addEventListener('obbcollisionstarted', function (event) {
            const collideObj = event.detail.withEl;

            // Get world positions of the current element and the element it collided with
            const colPos = new THREE.Vector3();
            collideObj.object3D.getWorldPosition(colPos);
            const elPos = new THREE.Vector3();
            CONTEXT_AF.el.object3D.getWorldPosition(elPos);

            // If the collision came from above (higher Y value), continue
            if (colPos.y > elPos.y) {
                const hasScored = collideObj.getAttribute('active-ball').hasScored;
                // If the ball has already scored, do not increment the score
                if (hasScored === false) {
                    CONTEXT_AF.data.score++;
                    CONTEXT_AF.scoreText.setAttribute('text', {value: CONTEXT_AF.data.score}); // Update the score text
                    // Play sound effects
                    CONTEXT_AF.el.components.sound.playSound();
                    CONTEXT_AF.scoreSound.components.sound.playSound();
                }
            }            
        })

        CONTEXT_AF.el.addEventListener('obbcollisionended', function (event) {
            const collideObj = event.detail.withEl;

            if (collideObj.classList.contains('thrown-ball')) {
                const hasScored = collideObj.getAttribute('active-ball').hasScored;

                // if the ball has not scored already, set it that is has scored since the ball is moving out of the score collider
                if (!hasScored) {
                    const attrs = collideObj.getAttribute('active-ball');
                    collideObj.setAttribute('active-ball', {...attrs, hasScored: true});
                }
            }
        })
    }
});