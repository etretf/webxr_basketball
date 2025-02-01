AFRAME.registerComponent('player', {
    schema: {
        isHoldingBall: {type: 'boolean', default: false}
    },
    update: function () {
        const {data: {isHoldingBall}, el} = this

        // If the player is holding the ball, create the cross hair UI
        if (isHoldingBall === true) {
            // Create horizontal bar for crosshair
            const horizontalBar = document.createElement('a-plane')
            horizontalBar.setAttribute('position', '0 0 -0.1');
            horizontalBar.setAttribute('height', 0.001);
            horizontalBar.setAttribute('width', 0.01);
            horizontalBar.setAttribute('id', 'crosshair-hz');
            horizontalBar.setAttribute('material', {
                shader: 'flat'
            });
            
            // Create veretical bar for crosshair
            const verticalBar = document.createElement('a-plane');
            verticalBar.setAttribute('position', '0 0 -0.1');
            verticalBar.setAttribute('height', 0.01);
            verticalBar.setAttribute('width', 0.001);
            verticalBar.setAttribute('id', 'crosshair-vt');
            verticalBar.setAttribute('material', {
                shader: 'flat'
            });

            // Append it to the player
            el.appendChild(horizontalBar);
            el.appendChild(verticalBar);

            // Play catch sound since player picked up the ball
            el.setAttribute('sound', {src: '#ball_catch'});
            el.components.sound.playSound();

        } else if (isHoldingBall === false && el.hasLoaded) {
            // Remove crosshair if player is no longer holding the ball
            const crosshairHz = document.querySelector('#crosshair-hz');
            const crosshairVt = document.querySelector('#crosshair-vt');
            crosshairHz.parentNode.removeChild(crosshairHz);
            crosshairVt.parentNode.removeChild(crosshairVt);
        }
    }
});