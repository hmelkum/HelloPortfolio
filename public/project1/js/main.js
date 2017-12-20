var camera, scene, light, renderer, container;
var meshs = [];
var grounds = [];
var isMobile = false;
var antialias = true;
var graph;
var stats;

var geos = {};
var mats = {};
var spheres = [];
var updateIntervalHandler;

initShapes();
init();
loop();
startAnimation();
setupWorld();

function setupWorld() {
	drawAxes();
	for(var i=0;i<20;i++){
	addSphere({x: Math.random()*99, y:Math.random()*99, z: Math.random()*99, vx: Math.random()*5,vy: Math.random()*5,vz: Math.random()*10,ax: Math.random()*50,ay: Math.random()*50,az: Math.random()*50});
	}
	// TODO

}

/*
 *	returns mesh of a sphere positioned at x,y,z
 *
 *  creating a new mesh: new THREE.Mesh( geometry, material );
 *  setting a position:  mesh.position.set(x, y, z);
 */

	function addSphere(params)
	{

		var meshTmp=new THREE.Mesh( geos.sphere, mats.sphere );

		var obj={
			mesh: meshTmp,
			pos: {
				x:params.x,
				y:params.y,
				z:params.z
			},
			v:{ x: params.vx, y: params.vy, z: params.vz},
			a:{ x: params.ax, y: params.ay, z: params.az},

		};
		params=params || {};
		params.x=params.x || 0;
		params.y=params.y || 0;
		params.z=params.z || 0;
		params.vx=params.vx || 0;
		params.vy=params.vy || 0;
		params.vz=params.vz || 0;
		params.ax=params.ax || 0;
		params.ay=params.ay || 0;
		params.az=params.az || 0;

		
		meshTmp.position.set( params.x, params.y, params.z);
		scene.add(meshTmp);
		spheres.push(obj);
	}



/*
* start calling the update function every 1000/60 milliseconds
*/
function startAnimation(){
	if(updateIntervalHandler) clearInterval(updateIntervalHandler);
	updateIntervalHandler =	setInterval(updateScene, 1000/60);
}

/*
* change the positions according to the physics
*/
function updateScene(){
	var i, obj, newPosition;
	for(i = 0; i < spheres.length; ++i){
		obj = spheres[i];
		newPosition = getPosition(obj);
		obj.mesh.position.set(newPosition.x, newPosition.y, newPosition.z)
		obj.pos = newPosition;
	}
}


/*
* returns the acceleration, based on 
* gravity and friction
*/
function getAcceleration(obj) {
	return obj.a;
}

function getVelocity(obj) {
	return obj.v;
}

function getPosition(obj) {
	v=getVelocity(obj);
	if(obj.pos.x >= 100 || obj.pos.x<=0) v.x *=-1;
	if(obj.pos.y >= 100 || obj.pos.y<=0) v.y *=-1;
	if(obj.pos.z >= 100 || obj.pos.z<=0) v.z *=-1;
	var newX= obj.pos.x+v.x;
	var newY= obj.pos.y+v.y;
	var newZ= obj.pos.z+v.z;
	return {x: newX, y: newY, z: newZ};
}