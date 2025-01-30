AFRAME.registerComponent('pickup-ball', {
    schema: {},
    init: function () {
        const CONTEXT_AF = this
        CONTEXT_AF.startVec = new THREE.Vector3();
        CONTEXT_AF.playerEl = document.querySelector('#player');

        this.el.addEventListener('click', function () {
            console.log('clicked ball')
            const playerComponent = CONTEXT_AF.playerEl.getAttribute('player');
            if (playerComponent.isHoldingBall === false) {
                const newBall = document.createElement('a-sphere')
                newBall.setAttribute('position', '0 -0.47 -0.5')
                newBall.setAttribute('radius', '0.2')
                newBall.setAttribute('active-ball', {})
                newBall.classList.add(['interactive'])
                CONTEXT_AF.playerEl.appendChild(newBall)
                CONTEXT_AF.el.parentNode.removeChild(CONTEXT_AF.el)

                CONTEXT_AF.playerEl.setAttribute('player', {isHoldingBall: true})
            }
        })
    },
})