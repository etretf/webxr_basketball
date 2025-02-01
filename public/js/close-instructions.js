AFRAME.registerComponent('close-instructions', {
    init: function () {
        const CONTEXT_AF = this;

        // Add reference to instructions in CONTEXT_AF
        CONTEXT_AF.instructions = document.querySelector('#instructions');

        CONTEXT_AF.el.addEventListener('click', function () {
            // Removes the instructions box entity
            CONTEXT_AF.instructions.parentNode.removeChild(CONTEXT_AF.instructions);
        })
    }
})