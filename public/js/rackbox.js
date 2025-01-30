AFRAME.registerComponent('rackbox', {
    schema: {},
    init: function () {
        const CONTEXT_AF = this
        this.el.addEventListener('click', function () {
            console.log('clicked')
        })
    }
})