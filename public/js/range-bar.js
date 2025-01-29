AFRAME.registerComponent('range-bar', {
    schema: {
        value: {type: 'number', default: 0}
    },
    init: function () {
        const CONTEXT_AF = this

        CONTEXT_AF.data.value = document.get
    }
})