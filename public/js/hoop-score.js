AFRAME.registerComponent('hoop-score', {
    schema: {
        score: {type: 'number', default: 0}
    },
    init: function () {
        const CONTEXT_AF = this

        CONTEXT_AF.scoreText = document.querySelector('#score-text')
        CONTEXT_AF.scoreText.setAttribute('text', {value: CONTEXT_AF.data.score})

        CONTEXT_AF.el.addEventListener('obbcollisionstarted', function (event) {
            const collideObj = event.detail.withEl

            const colPos = new THREE.Vector3()
            collideObj.object3D.getWorldPosition(colPos)
            const elPos = new THREE.Vector3()
            this.object3D.getWorldPosition(elPos)


            if (colPos.y > elPos.y) {
                const hasScored = collideObj.getAttribute('active-ball').hasScored
                if (hasScored === false) {
                    CONTEXT_AF.data.score++
                    CONTEXT_AF.scoreText.setAttribute('text', {value: CONTEXT_AF.data.score})
                }
            }            
        })

        CONTEXT_AF.el.addEventListener('obbcollisionended', function (event) {
            event.detail.withEl.getAttribute('active-ball').hasScored = true
        })
    }
})