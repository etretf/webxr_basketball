AFRAME.registerComponent('load-ball', {
    schema: {},
    init: function () {
        const CONTEXT_AF = this
        
        CONTEXT_AF.el.addEventListener('click', function () {
            console.log('load ball')

            const newBall = document.createElement('a-sphere')
            newBall.setAttribute('position', '0 3 0')
            newBall.setAttribute('radius', '0.2')
            newBall.setAttribute('obb-collider')
            newBall.setAttribute('ammo-body', {type: 'dynamic', restitution: 1})
            newBall.setAttribute('ammo-shape', {type: 'sphere'})
            CONTEXT_AF.el.sceneEl.appendChild(newBall)
        })
    }
})