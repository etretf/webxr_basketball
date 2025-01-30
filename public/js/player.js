AFRAME.registerComponent('player', {
    schema: {
        isHoldingBall: {type: 'boolean', default: false}
    },
    init: function () {
        const CONTEXT_AF = this
    },

    update: function () {
        const {data: {isHoldingBall}, el} = this
        if (isHoldingBall === true) {
            const newRing = document.createElement('a-entity')
            newRing.setAttribute('position', '0 0 -1')
            newRing.setAttribute('id', 'range-circle')
            newRing.setAttribute('geometry', {
                primitive: 'ring',
                radiusInner: 0.03,
                radiusOuter: 0.04
            })
            newRing.setAttribute('material', {
                shader: 'flat'
            })
            el.appendChild(newRing)
            console.log('appended to camera')
        } else if (isHoldingBall === false && el.hasLoaded) {
            const rangeCircle = document.querySelector('#range-circle')
            rangeCircle.parentNode.removeChild(rangeCircle)
        }
    }
})