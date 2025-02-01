// Constants
const RANGE_UPPER = 1       // upper force limit
const RANGE_LOWER = 0       // lower force limit
const MAX_LIFETIME = 500    // how long a ball exists after being released

AFRAME.registerComponent('active-ball', {
    schema: {
        isChanging: {type: 'boolean', default: false},
        value: {type: 'number', default: 1},
        isDecrementing: {type: 'boolean', default: false},
        hasScored: {type: 'boolean', default: false},
        isHeld: {type: 'boolean', default: true},
        releaseTime: {type: 'number', default: 0},
    },
    init: function () {
        const CONTEXT_AF = this;

        // Add references to CONTEXT_AF
        CONTEXT_AF.rangeBar = document.querySelector('#range-arrow');
        CONTEXT_AF.rangeBarPos = CONTEXT_AF.rangeBar.getAttribute('position');
        CONTEXT_AF.playerEl = document.querySelector('#player');
        CONTEXT_AF.shootSound = document.querySelector('#shoot_sound');

        CONTEXT_AF.el.addEventListener('mouseup',  function () {
            // Only perform shooting action if ball is held
            if (CONTEXT_AF.data.isHeld) {
                // Add physics components, collider, and sound to the ball
                CONTEXT_AF.el.setAttribute('ammo-body', {type: 'dynamic', restitution: 1});
                CONTEXT_AF.el.setAttribute('ammo-shape', {type: 'sphere'});
                CONTEXT_AF.el.setAttribute('obb-collider', {});
                CONTEXT_AF.el.setAttribute('sound', {src: '#ground_bounce'});
    
                // Adjust force value (based on manual testing)
                const adjustedVal = CONTEXT_AF.data.value + 0.5;
    
                // Get direction vector
                const vector = new THREE.Vector3(0, 0, 0);
                // Copies world direction vector to the vector instance
                CONTEXT_AF.el.object3D.getWorldDirection(vector);
                // Flip direction for all axes since Three.js flips it the opposite of AFrame's coord system
                vector.set(vector.x * -1, (vector.y - adjustedVal) * -1, vector.z * -1);
                // Adjust force (based on manual testing)
                vector.multiplyScalar(adjustedVal * 3);
                // Create ammo vector based off the vector instance
                const force = new Ammo.btVector3(vector.x, vector.y, vector.z);

                // Get position vector of current element/ball
                const pos = new THREE.Vector3(0, 0, 0);
                CONTEXT_AF.el.object3D.getWorldPosition(pos);
                const ammoPos = new Ammo.btVector3(pos.x, pos.y, pos.z);
                CONTEXT_AF.el.body.applyImpulse(force, ammoPos);
    
                // Set state for the current element/ball
                CONTEXT_AF.data.isChanging = false; // no longer changing the force
                CONTEXT_AF.data.value = 0;  // reset the force to 0
                CONTEXT_AF.el.classList.add('thrown-ball'); // add class for collision detection
                CONTEXT_AF.data.isHeld = false; // ball is no longer held

                // Set the state for the range UI
                CONTEXT_AF.rangeBar.setAttribute('position', "0 -0.3 -1");  // set to original position
                CONTEXT_AF.rangeBar.setAttribute('visible', false); // make it invisible again

                // Set the player state - no longer holding a ball
                CONTEXT_AF.playerEl.setAttribute('player', {isHoldingBall: false});

                // Play shooting sound
                CONTEXT_AF.shootSound.components.sound.playSound();
            }
        })

        CONTEXT_AF.el.addEventListener('mousedown', function () {
            if (CONTEXT_AF.data.isHeld) {
                // Force value can change if mousedown is active
                CONTEXT_AF.data.isChanging = true;
                // Range UI only visible when mousedown is active
                CONTEXT_AF.rangeBar.setAttribute('visible', true);
            }
        })

        CONTEXT_AF.el.addEventListener('obbcollisionstarted', function (event) {
            const isGroundCollision = event.detail.withEl.id === 'court_ground';
            if (isGroundCollision) {
                // Play ground bounce sound only if ball hits the ground
                CONTEXT_AF.el.components.sound.playSound();
            }
        })
    },
    tick: function () {
        // Change the force value only when data is changing
        if (this.data.isChanging === true) {
            this.calculateRangeValue();
        }

        // If data is no longer changing, set it to zero and reset state
        if (this.data.isChanging === false) {
            this.data.value = 0;
            this.data.isDecrementing = false;
        }

        // If the force value hits the limit, flip the direction (isDecrementing) and set it to the limit
        if (this.data.value > RANGE_UPPER) {
            this.data.isDecrementing = true;
            this.data.value = RANGE_UPPER;
        }

        if (this.data.value < RANGE_LOWER) {
            this.data.isDecrementing = false;
            this.data.value = RANGE_LOWER;
        }

        // When the ball is released, increment the release time then destroy it once it reaches the limit
        if (this.data.isHeld === false) {
            if (this.data.releaseTime > MAX_LIFETIME) {
                this.el.parentNode.removeChild(this.el);
            }
            this.data.releaseTime++;
        }

        // Update the range UI position
        const updatedRangePos = this.calculateRangeIndicatorPos(this.data.value);
        this.rangeBar.setAttribute('position', updatedRangePos);
    },

    calculateRangeValue: function () {
        // Increase until it reaches the max limit then decrease until it reaches the min limit
        if (!this.data.isDecrementing) {
            this.data.value += 0.01;
        } else {
            this.data.value -= 0.01;
        }
    },

    calculateRangeIndicatorPos: function (val) {
        const {data: {isDecrementing}, rangeBarPos} = this;
        // Move the range UI's position based on the isDecrementing state
        // Subtract if it's going down and add if it's going up
        if (isDecrementing) {
            return `${rangeBarPos.x} ${rangeBarPos.y - val * 0.01} ${rangeBarPos.z}`
        }
        return `${rangeBarPos.x} ${rangeBarPos.y + val * 0.01} ${rangeBarPos.z}`
    }
});