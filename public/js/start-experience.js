AFRAME.registerComponent('start-experience', {
    init: function () {
        console.log('scene loaded');
        document.querySelector('#user-gesture-button').style.display = 'block';

        const CONTEXT_AF = this

        CONTEXT_AF.gestureButton = document.querySelector('#user-gesture-button')

        CONTEXT_AF.gestureButton.addEventListener('click', function () {
            document.querySelector('#user-gesture-overlay').style.display = 'none'
        })
    }
})