AFRAME.registerComponent('ball', {
    schema: {
        force: {type: 'number', default: 0}
    },
    init: function () {
        const CONTEXT_AF = this
        CONTEXT_AF.startVec = new THREE.Vector3();
        CONTEXT_AF.camera = document.querySelector('#camera');

        this.el.addEventListener('click', function () {
            const cameraChildren = CONTEXT_AF.camera.getChildren()
            debugger

            const newBall = document.createElement('a-sphere')
            newBall.setAttribute('position', '0 -0.47 -0.57')
            newBall.setAttribute('radius', '0.2')
            newBall.classList.add('hold-ball')
            CONTEXT_AF.camera.appendChild(newBall)
            CONTEXT_AF.el.remove()
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