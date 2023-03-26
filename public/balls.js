const SVG_PATH_SELECTOR = "#matter-path";
const SVG_WIDTH_IN_PX = 100;
const SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH = 0.05;

const matterContainer = document.querySelector("#matter-container");
const thickness = 60;

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Body = Matter.Body,
    Svg = Matter.Svg,
    Vector = Matter.Vector,
    Vertices = Matter.Vertices;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: matterContainer,
    engine: engine,
    options: {
        width: matterContainer.clientWidth,
        height: matterContainer.clientHeight,
        background: "transparent",
        wireframes: false,
        showAngleIndicator: false
    }
});

for (let i = 1; i < 10; i++) {
    createCircle(i);
}
// createCircle();
// createSvgBodies();

function createCircle(i)
{
    let circleDiameter = matterContainer.clientWidth * SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH;
    if (window.innerWidth<500){circleDiameter=75}
    let circle = Bodies.circle(matterContainer.clientWidth / 2,
    10,
    circleDiameter / 2,
    {
        friction: 0.3,
        frictionAir: 0.0001,
        restitution: 0.8,
        render:{
            sprite: {
                texture: "balls/object"+i+".svg",
                xScale: 0.5,
                yScale: 0.5
            }
        }
    });
    Composite.add(engine.world, circle);
};

function createSvgBodies()
{
    const paths = document.querySelectorAll(SVG_PATH_SELECTOR);
    paths.forEach((path,index)=> {
        let vertices = Svg.pathToVertices(path);
        let scaleFactor =
        (matterContainer.clientWidth * SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH) / SVG_WIDTH_IN_PX;
        vertices = Vertices.scale(vertices, scaleFactor, scaleFactor);
        let svgBody = Bodies.fromVertices(
            index * SVG_WIDTH_IN_PX + 200,
            0,
            [vertices],
            {
                friction: 0.3,
                frictionAir: 0.00001,
                restitution: 0.8,
                render: {
                    fillStyle: "#5b81f1"
                }
            }
        );
        Composite.add(engine.world, svgBody);
    });
}

var ground = Bodies.rectangle(matterContainer.clientWidth / 2,
 matterContainer.clientHeight + thickness / 2, 
 matterContainer.clientWidth, 
 thickness, 
 { isStatic: true, 
    render: {
    fillStyle: 'transparent',
    strokeStyle: 'transparent',} 
    });

 var ceiling = Bodies.rectangle(matterContainer.clientWidth / 2,
 0, 
 matterContainer.clientWidth, 
 thickness, 
 { isStatic: true, 
    render: {
    fillStyle: 'transparent',
    strokeStyle: 'transparent',} 
    });

 let leftWall = Bodies.rectangle(
    0-thickness/2,
    matterContainer.clientHeight / 2,
    thickness,
    matterContainer.clientHeight * 5,
    {
        isStatic: true, 
        render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',} 
        });
 let rightWall = Bodies.rectangle(
    matterContainer.clientWidth + thickness / 2,
    matterContainer.clientHeight / 2,
    thickness,
    matterContainer.clientHeight * 5,
    {
        isStatic: true, 
        render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',} 
        });

// add all of the bodies to the world
Composite.add(engine.world, [ground, ceiling, leftWall, rightWall]);

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint : {
        stiffness: 0.2,
        render: {
            visible : false
        }
    }
});

Composite.add(engine.world, mouseConstraint);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

function handleResize(matterContainer)
{
    render.canvas.width = matterContainer.clientWidth;
    render.canvas.height = matterContainer.clientHeight;

    Matter.Body.setPosition(
        ground,
        Matter.Vector.create(
            matterContainer.clientWidth / 2,
            matterContainer.clientHeight + thickness / 2

        )
    );
    Matter.Body.setPosition(
        rightWall,
        Matter.Vector.create(
            matterContainer.clientWidth +thickness/ 2,
            matterContainer.clientHeight / 2

        )
    );

    scaleBodies();
}

function scaleBodies()
{
    const allBodies = Composite.allBodies(engine.world)
    
    allBodies.forEach((body) => {
        if (body.isStatic == true) return;
        const {min, max} = body.bounds;
        const bodyWidth = max.x - min.x;
        let scaleFactor = 
        (matterContainer.clientWidth * SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH) / bodyWidth;
        if (matterContainer.clientWidth <= 100){
         scaleFactor=100   
        }
        Body.scale(body,scaleFactor,scaleFactor);
        body.render.sprite.scaleX = bodyWidth*scaleFactor;
        body.render.sprite.scaleY = bodyWidth*scaleFactor;
    });
}

window.addEventListener("resize", () => handleResize(matterContainer));

engine.world.gravity.y = 0.7;

setTimeout(jump,1300);

function jump(){
    const allBodies = Composite.allBodies(engine.world)
    allBodies.forEach((body) => {
        if (body.isStatic == true) return;
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        Body.applyForce( body, {x: body.position.x, y: body.position.y}, {x: (Math.random()*plusOrMinus)/10, y: -0.1});
    });
    engine.world.gravity.y = 0;
}

//s
