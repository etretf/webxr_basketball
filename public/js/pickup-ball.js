AFRAME.registerComponent('pickup-ball', {
    init: function () {
        const CONTEXT_AF = this;
        CONTEXT_AF.startVec = new THREE.Vector3();
        CONTEXT_AF.playerEl = document.querySelector('#player');
        CONTEXT_AF.rack = document.querySelector('#rack');

        this.el.addEventListener('click', function () {
            const playerComponent = CONTEXT_AF.playerEl.getAttribute('player');

            // Can only pick up if the player is not already holding a ball
            if (playerComponent.isHoldingBall === false) {

                // Create a new ball
                const newBall = document.createElement('a-sphere');
                // Set properties
                newBall.setAttribute('position', '0 -0.47 -0.5');
                newBall.setAttribute('scale', '0.2 0.2 0.2');
                newBall.setAttribute('active-ball', {});
                newBall.setAttribute('geometry', {primitive: 'sphere'});
                newBall.setAttribute('gltf-model', '#basketball_model');
                newBall.classList.add(['interactive']);

                // Append it to the player
                CONTEXT_AF.playerEl.appendChild(newBall);

                // Remove the current element/ball
                CONTEXT_AF.el.parentNode.removeChild(CONTEXT_AF.el);

                // Update player state - now holding the new ball
                CONTEXT_AF.playerEl.setAttribute('player', {isHoldingBall: true});

                // Decrease the number of balls on the rack
                const currentBallCount = CONTEXT_AF.rack.getAttribute('rack').ballCount - 1;
                CONTEXT_AF.rack.setAttribute('rack', {ballCount: currentBallCount});
            }
        })
    },
})