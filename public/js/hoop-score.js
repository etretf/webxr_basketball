AFRAME.registerComponent('hoop-score', {
    schema: {},
    init: function () {
        const CONTEXT_AF = this

        CONTEXT_AF.el.addEventListener('obbcollisionstarted', function (event) {
            console.log(event)
        })
    }
})