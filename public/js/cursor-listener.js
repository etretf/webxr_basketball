AFRAME.registerComponent('cursor-listener', {
    schema: {
        isChanging: {type: 'boolean', default: false},
        value: {type: 'number', default: 1},
        isDecrementing: {type: 'boolean', default: false},
    },
    init: function () {
        const CONTEXT_AF = this

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
        if (this.data.isChanging === true) {
            this.calculateRangeValue()
        }

        if (this.data.isChanging === false) {
            this.data.value = 0
            this.data.isDecrementing = false
        }

        if (this.data.value >= 0.07) {
            this.data.isDecrementing = true
        }

        if (this.data.value <= -0.07) {
            this.data.isDecrementing = false
        }

        this.rangeBar.setAttribute('position', `${this.rangeBarPos.x + this.convertToUIRange(this.data.value)} ${this.rangeBarPos.y} ${this.rangeBarPos.z}`)
    },

    calculateRangeValue: function () {
        if (!this.data.isDecrementing) {
            this.data.value += 0.001
        } else {
            this.data.value -= 0.001
        }
    },

    convertToUIRange: function (val) {
        return val * 0.1
    }
})