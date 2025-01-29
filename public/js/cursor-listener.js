AFRAME.registerComponent('cursor-listener', {
    schema: {
        isChanging: {type: 'boolean', default: false},
        value: {type: 'number', default: 1},
        isDecrementing: {type: 'boolean', default: false},
    },
    init: function () {
        CONTEXT_AF = this

        CONTEXT_AF.rangeBar = document.querySelector('#range-bar')
        CONTEXT_AF.oldRangeBarPos = CONTEXT_AF.rangeBar.getAttribute('position')
        CONTEXT_AF.rangeBarPos = CONTEXT_AF.rangeBar.getAttribute('position')

        CONTEXT_AF.torus = document.querySelector('#mytorus')
        // const geometry = CONTEXT_AF.torus.getAttribute('geometry')
        // const mat = CONTEXT_AF.torus.getAttribute('material')

        // CONTEXT_AF.torus.setAttribute('shape', new THREE.Mesh(geometry, mat))

        this.el.addEventListener('click', function () {
            console.log(CONTEXT_AF.torus)
        })

        this.el.addEventListener('mousedown', function () {
            console.log('mousedown')
            CONTEXT_AF.data.isChanging = true
        })

        this.el.addEventListener('mouseup', function () {
            console.log('mouseup')
            CONTEXT_AF.data.isChanging = false
            CONTEXT_AF.data.value = 0
            CONTEXT_AF.rangeBar.setAttribute('position', '-0.23 -0.7 -1')
            console.log('new data: ' + CONTEXT_AF.data.value)
        })
    },
    tick: function () {
        if (CONTEXT_AF.data.isChanging === true) {
            this.calculateRangeValue()
        }

        if (CONTEXT_AF.data.isChanging === false) {
            CONTEXT_AF.data.value = 0
            CONTEXT_AF.data.isDecrementing = false
        }

        if (CONTEXT_AF.data.value >= 0.07) {
            CONTEXT_AF.data.isDecrementing = true
        }

        if (CONTEXT_AF.data.value <= -0.07) {
            CONTEXT_AF.data.isDecrementing = false
        }

        CONTEXT_AF.rangeBar.setAttribute('position', `${CONTEXT_AF.rangeBarPos.x + this.convertToUIRange(CONTEXT_AF.data.value)} ${CONTEXT_AF.rangeBarPos.y} ${CONTEXT_AF.rangeBarPos.z}`)
    },

    calculateRangeValue: function () {
        if (!CONTEXT_AF.data.isDecrementing) {
            CONTEXT_AF.data.value += 0.001
        } else {
            CONTEXT_AF.data.value -= 0.001
        }
    },

    convertToUIRange: function (val) {
        return val * 0.1
    }
})