const BALL_POSITIONS = ['0 0 0', '0 0 0.45', '0 0 -0.45']

AFRAME.registerComponent('rack', {
    schema: {
        ballCount: {type: 'number', default: 6}
    },
    init: function () {
        const CONTEXT_AF = this
    },
    update: function () {
        if (this.data.ballCount === 0) {
            this.respawnBalls()
        }
    },

    respawnBalls: function () {
        console.log('empty')

        const rackTop = document.querySelector('#rack-top')
        const rackBottom = document.querySelector('#rack-bottom')

        for (let i = 0; i < 6; i++) {
            const newBall = document.createElement('a-entity')
            newBall.setAttribute('pickup-ball', {})
            newBall.classList.add('interactive')
            newBall.setAttribute('gltf-model', '#basketball_model')
            newBall.setAttribute('scale', '0.2 0.2 0.2')

            if (i < 3) {
                console.log('top ball')
                newBall.setAttribute('position', BALL_POSITIONS[i])
                rackTop.appendChild(newBall)
            } else {
                newBall.setAttribute('position', BALL_POSITIONS[i - 3])
                rackBottom.appendChild(newBall)
            }
        }
        
    }
})