AFRAME.registerComponent('ball', {
    schema: {
        force: {type: 'number', default: 0}
    },
    init: function () {
        const CONTEXT_AF = this
        CONTEXT_AF.startVec = new THREE.Vector3();
        CONTEXT_AF.playerEl = document.querySelector('#player');

        this.el.addEventListener('click', function () {
            const playerComponent = CONTEXT_AF.playerEl.getAttribute('player');
            if (playerComponent.isHoldingBall === false) {
                const newBall = document.createElement('a-sphere')
                newBall.setAttribute('position', '0 -0.47 -0.57')
                newBall.setAttribute('radius', '0.2')
                newBall.classList.add('hold-ball')
                CONTEXT_AF.playerEl.appendChild(newBall)
                CONTEXT_AF.el.remove()

                CONTEXT_AF.playerEl.setAttribute('player', {isHoldingBall: true})
            }
        })

        this.el.addEventListener('mousedown', function () {
            console.log('mousedown')
        })

        
        this.el.addEventListener('mouseup', function () {
            console.log('mouseup')
        })
    },

    tick: function () {

    },

    update: function () {
        console.log('updating');
    },

    setForceGauge: (function () {

    })
})