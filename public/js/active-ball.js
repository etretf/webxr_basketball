const RANGE_UPPER = 10
const RANGE_LOWER = 0
const MAX_LIFETIME = 500


AFRAME.registerComponent('active-ball', {
    schema: {
        isChanging: {type: 'boolean', default: false},
        value: {type: 'number', default: 1},
        isDecrementing: {type: 'boolean', default: false},
        hasScored: {type: 'boolean', default: false},
        isHeld: {type: 'boolean', default: true},
        releaseTime: {type: 'number', default: 0}
    },
    init: function () {
        const CONTEXT_AF = this

        CONTEXT_AF.rangeBar = document.querySelector('#range-arrow')
        CONTEXT_AF.rangeBarPos = CONTEXT_AF.rangeBar.getAttribute('position')
        CONTEXT_AF.playerEl = document.querySelector('#player')
        CONTEXT_AF.playerRayCaster = document.querySelector('#player-raycaster')

        CONTEXT_AF.objPos = CONTEXT_AF.el.object3D.position

        CONTEXT_AF.el.addEventListener('click',  function () {
            CONTEXT_AF.el.setAttribute('ammo-body', {type: 'dynamic', restitution: 1})
            CONTEXT_AF.el.setAttribute('ammo-shape', {type: 'sphere'})

            const quat = CONTEXT_AF.playerEl.object3D.quaternion
            const vector = new THREE.Vector3(0, 5, -2)
            vector.applyQuaternion(quat)
            debugger
            const force = new Ammo.btVector3(vector.x, vector.y, vector.z)
            const pos = new Ammo.btVector3(CONTEXT_AF.objPos.x, CONTEXT_AF.objPos.y, CONTEXT_AF.objPos.z);
            CONTEXT_AF.el.body.applyImpulse(force, pos);

            CONTEXT_AF.data.isChanging = false
            CONTEXT_AF.data.value = 0
            CONTEXT_AF.rangeBar.setAttribute('position', "0 -0.3 -1")
            CONTEXT_AF.rangeBar.setAttribute('visible', false)
            CONTEXT_AF.playerEl.setAttribute('player', {isHoldingBall: false})
            CONTEXT_AF.data.isHeld = false
        })

        this.el.addEventListener('mousedown', function () {
            CONTEXT_AF.data.isChanging = true
            CONTEXT_AF.rangeBar.setAttribute('visible', true)
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
        }

        if (this.data.value < RANGE_LOWER) {
            this.data.isDecrementing = false
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
            this.data.value += 0.001
        } else {
            this.data.value -= 0.001
        }
    },

    convertToUIRange: function (val) {
        return val * 0.1
    },

    calculateRangeIndicatorPos: function (val) {
        const newYPos = this.objPos.y + val
        return `${this.objPos.x} ${this.objPos.y} ${this.objPos.z}`
    }
})