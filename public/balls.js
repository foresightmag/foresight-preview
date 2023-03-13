// module aliases
var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {wireframes: false,
        height: window.outerHeight,
        width: window.innerWidth,
        background: 'transparent',
        wireframeBackground: 'transparent'}
    

});

var ground = Bodies.rectangle(window.innerHeight, window.innerHeight, window.innerWidth,  10, { isStatic: true, render: {
    fillStyle: 'transparent',
    strokeStyle: 'transparent',
    lineWidth: 3
} });
var ceiling = Bodies.rectangle(window.innerHeight, 0, window.innerWidth, 60, { isStatic: true, render: {
    fillStyle: 'transparent',
    strokeStyle: 'transparent',
    lineWidth: 3
} });
var rightWall = Bodies.rectangle(0,window.innerHeight,1,window.outerHeight*2,{ isStatic: true, render: {
    fillStyle: 'transparent',
    strokeStyle: 'transparent',
    lineWidth: 3
}});
var leftWall = Bodies.rectangle(window.innerWidth,window.innerHeight,1,window.outerHeight*2,{ isStatic: true, render: {
    fillStyle: 'transparent',
    strokeStyle: 'transparent',
    lineWidth: 3
} });
const objects = []

objects.push(ground);
objects.push(ceiling);
objects.push(rightWall);
objects.push(leftWall);

for (let i = 1; i < 11; i++) {
    var obj = Bodies.circle(i*((window.innerWidth)/11), 50, 40, {
        render: {
            sprite: {
                texture: './balls/object'+i+'.svg',
                xScale: 0.5,
                yScale: 0.5
                    }
                },
        restitution: 1.1*Math.random(),
        } 
    );
    objects.push(obj);
}

// add all of the bodies to the world
Composite.add(engine.world, objects);

engine.world.gravity.y = 0.5;
// engine.world.gravity.scale = 0

// var noGravity = false

// Matter.Events.on(engine, 'beforeUpdate', function() {
//     var gravity = engine.world.gravity;

//     if (noGravity) {
//         Matter.Body.applyForce(body, body.position, {
//             x: -gravity.x * gravity.scale * body.mass,
//             y: gravity.y * gravity.scale * body.mass
//         });
//     }
// });

function setGravity(value)
{
    engine.world.gravity.y = value;
}

Matter.Events.on(engine, 'collisionActive', function() {
    var gravity = engine.world.gravity;

    // objects.forEach(body => {
    //     if (Matter.SAT.collides(body, ground).collided) {
    //         // Matter.Body.applyForce(body, body.position, {
    //         //     x: -gravity.x * gravity.scale * body.mass,
    //         //     y: 100
    //         // });
            
    //     }
    // });
    setGravity(0);
});

objects[4]


// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

// add mouse control
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

// Matter.Events.on(runner, "tick", event => {
//     if (mouseConstraint.body) {
//       Matter.Composite.remove(engine.world, mouseConstraint.body);
//     }
//   });

Composite.add(engine.world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;


