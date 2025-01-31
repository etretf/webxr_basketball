AFRAME.registerComponent('close-instructions', {
    schema: {},
    init: function () {
        const CONTEXT_AF = this

        CONTEXT_AF.instructions = document.querySelector('#instructions')

        CONTEXT_AF.el.addEventListener('click', function () {
            CONTEXT_AF.instructions.parentNode.removeChild(CONTEXT_AF.instructions)
        })
    }
})