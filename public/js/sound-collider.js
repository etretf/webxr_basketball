AFRAME.registerComponent('sound-collider', {
    init: function () {
        const CONTEXT_AF = this;

        CONTEXT_AF.el.addEventListener('obbcollisionstarted', function (event) {
            const collideObj = event.detail.withEl;
            const collidedWithBall = collideObj.classList.contains('thrown-ball');
            // If the element was collided with by a thrown ball, play the element's sound effect
            if (collidedWithBall) {
                CONTEXT_AF.el.components.sound.playSound();
            }
        })
    }
});