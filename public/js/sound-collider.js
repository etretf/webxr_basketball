AFRAME.registerComponent('sound-collider', {
    init: function () {
        const CONTEXT_AF = this

        CONTEXT_AF.el.addEventListener('obbcollisionstarted', function (event) {
            const collideObj = event.detail.withEl
            const collidedWithBall = collideObj.classList.contains('thrown-ball')
            if (collidedWithBall) {
                CONTEXT_AF.el.components.sound.playSound()
            }
        })
    }
})