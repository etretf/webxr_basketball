AFRAME.registerComponent('teleport-pad', {
    init: function () {
        const CONTEXT_AF = this

        CONTEXT_AF.el.setAttribute('radius', 0.3)
        CONTEXT_AF.el.setAttribute('height', 0.3)
        CONTEXT_AF.el.setAttribute('material', {color: 'rgb(0, 128, 0)'})
        CONTEXT_AF.el.classList.add('interactive')
        
        CONTEXT_AF.el.setAttribute('animation__mouseenter', {
            property: 'material.color',
            type: 'color',
            to: 'rgb(0, 200, 50)',
            startEvents: 'mouseenter',
            dur: '200'
        })

        CONTEXT_AF.el.setAttribute('animation__mouseleave', {
            property: 'material.color',
            type: 'color',
            to: 'rgb(0, 128, 0)',
            startEvents: 'mouseleave',
            dur: '200'
        })

        CONTEXT_AF.el.addEventListener('click', function () {
            const player = document.querySelector('#player')
            let elPos = CONTEXT_AF.el.object3D.position
            const newPos = {...elPos}
            newPos.y += 1.6
            player.setAttribute('position', newPos)
        })
    }
})