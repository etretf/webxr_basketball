const RANGE_UPPER = 1
const RANGE_LOWER = 0
const MAX_LIFETIME = 500


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
        const CONTEXT_AF = this

        CONTEXT_AF.rangeBar = document.querySelector('#range-arrow')
        CONTEXT_AF.rangeBarPos = CONTEXT_AF.rangeBar.getAttribute('position')
        CONTEXT_AF.playerEl = document.querySelector('#player')
        CONTEXT_AF.playerRayCaster = document.querySelector('#player-raycaster')

        CONTEXT_AF.objPos = CONTEXT_AF.el.object3D.position

        CONTEXT_AF.el.addEventListener('mouseup',  function () {
            if (CONTEXT_AF.data.isHeld) {
                CONTEXT_AF.el.setAttribute('ammo-body', {type: 'dynamic', restitution: 1})
                CONTEXT_AF.el.setAttribute('ammo-shape', {type: 'sphere'})
                CONTEXT_AF.el.setAttribute('obb-collider', {})
                CONTEXT_AF.el.setAttribute('sound', {src: '#ground_bounce'})
    
                const adjustedVal = CONTEXT_AF.data.value + 0.5
    
                const vector = new THREE.Vector3(0, 0, 0)
                CONTEXT_AF.el.object3D.getWorldDirection(vector)
                vector.set(vector.x * -1, (vector.y - adjustedVal) * -1, vector.z * -1)
                vector.multiplyScalar(adjustedVal * 3)
                const force = new Ammo.btVector3(vector.x, vector.y, vector.z)
                const pos = new THREE.Vector3(0, 0, 0)
                CONTEXT_AF.el.object3D.getWorldPosition(pos)
                const ammoPos = new Ammo.btVector3(pos.x, pos.y, pos.z)
                CONTEXT_AF.el.body.applyImpulse(force, ammoPos);
    
                CONTEXT_AF.data.isChanging = false
                CONTEXT_AF.data.value = 0
                CONTEXT_AF.rangeBar.setAttribute('position', "0 -0.3 -1")
                CONTEXT_AF.rangeBar.setAttribute('visible', false)
                CONTEXT_AF.playerEl.setAttribute('player', {isHoldingBall: false})
                CONTEXT_AF.playerEl.setAttribute('sound', {src: '#score'})
                CONTEXT_AF.el.classList.add('thrown-ball')
                CONTEXT_AF.data.isHeld = false
            }
        })

        this.el.addEventListener('mousedown', function () {
            if (CONTEXT_AF.data.isHeld) {
                CONTEXT_AF.data.isChanging = true
                CONTEXT_AF.rangeBar.setAttribute('visible', true)
            }
        })

        CONTEXT_AF.el.addEventListener('obbcollisionstarted', function (event) {
            const isGroundCollision = event.detail.withEl.id === 'court_ground'
            if (isGroundCollision) {
                console.log('bounce on ground')
                CONTEXT_AF.el.components.sound.playSound()
            }
        })
    },
    tick: function () {
        if (this.data.isChanging === true) {
            this.calculateRangeValue()
        }

        if (this.data.isChanging === false) {
            this.data.value = 0
            this.data.isDecrementing = false
        }

        if (this.data.value > RANGE_UPPER) {
            this.data.isDecrementing = true
            this.data.value = RANGE_UPPER
        }

        if (this.data.value < RANGE_LOWER) {
            this.data.isDecrementing = false
            this.data.value = RANGE_LOWER
        }

        if (this.data.isHeld === false) {
            if (this.data.releaseTime > MAX_LIFETIME) {
                this.el.parentNode.removeChild(this.el)
            }

            this.data.releaseTime++
        }

        const updatedRangePos = this.calculateRangeIndicatorPos(this.data.value)
        this.rangeBar.setAttribute('position', updatedRangePos)
    },

    calculateRangeValue: function () {
        if (!this.data.isDecrementing) {
            this.data.value += 0.01
        } else {
            this.data.value -= 0.01
        }
    },

    calculateRangeIndicatorPos: function (val) {
        const {data: {isDecrementing}, rangeBarPos} = this
        if (isDecrementing) {
            return `${rangeBarPos.x} ${rangeBarPos.y - val * 0.01} ${rangeBarPos.z}`
        }
        return `${rangeBarPos.x} ${rangeBarPos.y + val * 0.01} ${rangeBarPos.z}`
    }
})