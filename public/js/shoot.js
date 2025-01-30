AFRAME.registerComponent('shoot', {
    schema: {},
    init: function () {
        const CONTEXT_AF = this

        CONTEXT_AF.objPos = CONTEXT_AF.el.object3D.position

        CONTEXT_AF.el.addEventListener('body-loaded',  function () {
            debugger
            const force = new Ammo.btVector3(0, 0, 0)
            const pos = new Ammo.btVector3(CONTEXT_AF.objPos.x, CONTEXT_AF.objPos.y, CONTEXT_AF.objPos.z);
            el.body.applyImpulse(force, pos);

            console.log('PUSH')
        })
    }
})