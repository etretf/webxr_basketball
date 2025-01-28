AFRAME.registerComponent('ball', {
    schema: {
        force: {type: 'number', default: 0}
    },
    init: function () {

        this.startVec = new THREE.Vector3();
        this.sourceEl = document.querySelector('#camera');

        this.el.addEventListener('click', function () {
            console.log('clicked')
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