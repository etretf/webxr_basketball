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
            const horizontalBar = document.createElement('a-plane')

            horizontalBar.setAttribute('position', '0 0 -0.1')
            horizontalBar.setAttribute('height', 0.001)
            horizontalBar.setAttribute('width', 0.01)
            horizontalBar.setAttribute('id', 'crosshair-hz')
            horizontalBar.setAttribute('material', {
                shader: 'flat'
            })
            
            const verticalBar = document.createElement('a-plane')

            verticalBar.setAttribute('position', '0 0 -0.1')
            verticalBar.setAttribute('height', 0.01)
            verticalBar.setAttribute('width', 0.001)
            verticalBar.setAttribute('id', 'crosshair-vt')
            verticalBar.setAttribute('material', {
                shader: 'flat'
            })

            el.appendChild(horizontalBar)
            el.appendChild(verticalBar)
        } else if (isHoldingBall === false && el.hasLoaded) {
            const crosshairHz = document.querySelector('#crosshair-hz')
            const crosshairVt = document.querySelector('#crosshair-vt')
            crosshairHz.parentNode.removeChild(crosshairHz)
            crosshairVt.parentNode.removeChild(crosshairVt)
        }
    }
})