AFRAME.registerComponent('pickup-ball', {
    schema: {},
    init: function () {
        const CONTEXT_AF = this
        CONTEXT_AF.startVec = new THREE.Vector3();
        CONTEXT_AF.playerEl = document.querySelector('#player');
        CONTEXT_AF.rack = document.querySelector('#rack');

        this.el.addEventListener('click', function () {
            const playerComponent = CONTEXT_AF.playerEl.getAttribute('player');
            if (playerComponent.isHoldingBall === false) {
                const newBall = document.createElement('a-sphere')
                newBall.setAttribute('position', '0 -0.47 -0.5')
                newBall.setAttribute('scale', '0.2 0.2 0.2')
                newBall.setAttribute('active-ball', {})
                newBall.setAttribute('geometry', {primitive: 'sphere'})
                newBall.setAttribute('gltf-model', '#basketball_model')
                newBall.classList.add(['interactive'])
                CONTEXT_AF.playerEl.appendChild(newBall)
                CONTEXT_AF.el.object3D.remove('geometry')
                CONTEXT_AF.el.parentNode.removeChild(CONTEXT_AF.el)

                CONTEXT_AF.playerEl.setAttribute('player', {isHoldingBall: true})
                const currentBallCount = CONTEXT_AF.rack.getAttribute('rack').ballCount - 1
                CONTEXT_AF.rack.setAttribute('rack', {ballCount: currentBallCount})
            }
        })
    },
})