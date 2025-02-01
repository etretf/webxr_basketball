AFRAME.registerComponent('sound-player', {
    init: function () {
        const CONTEXT_AF = this;

        // Play and pause the sound based off the element's sound component
        CONTEXT_AF.el.addEventListener('click', function () {
            const music = document.querySelector('#music');
            const sound = music.components.sound;

            if (sound.isPlaying) {
                sound.pauseSound();
            } else {
                sound.playSound();
            }
        });
    }
});