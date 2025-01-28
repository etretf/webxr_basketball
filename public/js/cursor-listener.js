AFRAME.registerComponent('cursor-listener', {
    schema: {
        isChanging: {type: 'boolean', default: false},
        value: {type: 'number', default: 0},
        isDecrementing: {type: 'boolean', default: false}
    },
    init: function () {
        CONTEXT_AF = this
        this.el.addEventListener('click', function () {
        })

        this.el.addEventListener('mousedown', function () {
            console.log('mousedown')
            CONTEXT_AF.data.isChanging = true
        })

        this.el.addEventListener('mouseup', function () {
            console.log('mouseup')
            CONTEXT_AF.data.isChanging = false
            CONTEXT_AF.data.value = 0
            console.log('new data: ' + CONTEXT_AF.data.value)
        })
    },
    tick: function () {
        if (this.data.isChanging === true) {
            this.calculateRangeValue()
        }

        if (this.data.isChanging === false) {
            CONTEXT_AF.data.value = 0
        }

        if (CONTEXT_AF.data.value >= 10) {
            debugger
            CONTEXT_AF.data.isDecrementing = false
        }
    },

    calculateRangeValue: function () {
        if (CONTEXT_AF.data.isDecrementing === false) {
            CONTEXT_AF.data.value += 0.1
        }
        if (CONTEXT_AF.data.isDecrementing === true) {
            CONTEXT_AF.data.value -= 0.1
        }
        console.log(CONTEXT_AF.data.value)
    }
})