class Vec {
    /**
     * @param {number} [x]
     * @param {number} [y]
     * @param {number} [z]
     */
    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    normalize() {
        var m = this.magnitude();
        this.x/=m;
        this.y/=m;
        this.z/=m;
    }
    
    /**
     * @param {Vec} vec
     */
    add(vec) {
        this.x+=vec.x;
        this.y+=vec.y;
        this.z+=vec.z;
    }

    /**
     * @param {Vec} vec
     */
    dot(vec) {
        this.x*=vec.x;
        this.y*=vec.y;
        this.z*=vec.z;
    }

    magnitude() {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    }
    scalar() {
        return this.x+this.y+this.z;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    update(x, y, z) {
        this.x+=x;
        this.y+=y;
        this.z+=z;
    }
    
    /**
     * @param {any} c
     * @param {number} x
     * @param {number} y
     * @param {string} col
     * @param {string} [name]
     */
    draw(c, x, y, col, name="v") {
        c.strokeStyle = col;
        c.lineWidth = 3;
        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(x+this.x*30-this.z*15, y+this.y*30-this.z*15);
        c.stroke();
        c.lineWidth = 10;
        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(x+this.x, y+this.y);
        c.stroke();
        c.lineWidth = 1;
        c.strokeText(name, x-this.x*30+this.z*15, y-this.y*30-this.z*15);
    }
    /**
     * @param {any} c
     * @param {string} col
     * @param {string} [name]
     */
    drawPos(c, col, name="") {
        c.strokeStyle = col;
        c.fillStyle = col;
        c.fillRect(this.x+this.z*15, this.y-this.z*15, 2, 2);
        c.strokeText(name, this.x+this.z*15, this.y*30-this.z*15);
    }
    print(name="Vector") {
        console.log(name+":", "<"+this.x+", "+this.y+", "+this.z+">", "Magnitude:", this.magnitude(), "Scalar:", this.scalar());
    }
}
class Tri {
    /**
     * @param {Vec} a
     * @param {Vec} b
     * @param {Vec} c
     */
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.min = new Vec(Math.min(a.x, b.x, c.x), Math.min(a.y, b.y, c.y), Math.min(a.z, b.z, c.z));
        this.max = new Vec(Math.max(a.x, b.x, c.x), Math.max(a.y, b.y, c.y), Math.max(a.z, b.z, c.z));
        this.ab = segment(a, b);
        this.bc = segment(b, c);
        this.ac = segment(a, c);
        this._ab = distance3d(a, b);
        this._bc = distance3d(b, c);
        this._ac = distance3d(a, c);
        this.circumference = this._ab + this._bc + this._ac;
        this.delta = dot(this.ab, this.ac).scalar()/(this._ab*this._ac); // Of point A
        this.sigma = dot(this.ab, this.bc).scalar()/(this._ab*this._bc); // Of point B
        this.theta = dot(this.bc, this.ac).scalar()/(this._bc*this._ac); // Of point C
    }
    area() {
        return triArea_(this);
    }
}

let AREATIME = 0, AREAITERATE = 0, SAMESIDETIME = 0, BARYCENTRICTIME = 0;

// Collision detection
/**
 * @param {Vec} a
 * @param {Vec} ascalar
 * @param {Vec} b
 * @param {Vec} bscalar
 */
function AABB(a, ascalar, b, bscalar) {
    return (a.x<=b.x+bscalar.x&&a.x+ascalar.x>=b.x) && (a.y<=b.y+bscalar.y&&a.y+ascalar.y>=b.y) && (a.z<=b.z+bscalar.z&&a.z+ascalar.z>=b.z);
}
/**
 * @param {Vec} [a1]
 * @param {Vec} [a2]
 * @param {Vec} [b1]
 * @param {Vec} [b2]
 */
function AABB_(a1, a2, b1, b2) {
    return (a1.x<=b2.x&&a2.x>=b1.x&&a1.y<=b2.y&&a2.y>=b1.y);
}
/** Check point-in-triangle collision based on whether area △A= △AxAyB + △AyBAz + △AxBAz
 * @param {Tri} A
 * @param {Vec} b
 * @param {number} tolerance
 */
function triAreaCollision(A, b, tolerance) {
    var out = AABB(A.min, A.max, b, b);
    var pre = window.performance.now();
    if(out) 
    out = Math.abs(A.area() - (triArea(A.a, A.b, b)+triArea(A.b, A.c, b)+triArea(A.a, A.c, b))) < tolerance;
    AREATIME = window.performance.now()-pre;
    // AREAITERATE++; 
    // console.log("Area Collision took the following time", AREATIME, "with result", out, "because", A.area(), (out ? "==" : "!="), triArea(A.a, A.b, b), "+", triArea(A.b, A.c, b), "+", triArea(A.a,A.c,b), "==", (triArea(A.a, A.b, b)+triArea(A.b, A.c, b)+triArea(A.a, A.c, b)));
    return out;
}
/**
 * @param {Tri} A
 * @param {Vec} b
 */
function triBarycentricCollision(A, b) {
    var out = AABB(A.min, A.max, b, b);
    var pre = window.performance.now();
    if(out) {
        var v0 = A.ac;
        var v1 = A.ab;
        var v2 = segment(A.a, b);

        var d00 = dot(v0, v0).scalar();
        var d01 = dot(v0, v1).scalar();
        var d02 = dot(v0, v2).scalar();
        var d11 = dot(v1, v1).scalar();
        var d12 = dot(v1, v2).scalar();

        var invDenom = 1 / (d00 * d11 - d01 * d01);
        var u = (d11 * d02 - d01 * d12) * invDenom;
        var v = (d00 * d12 - d01 * d02) * invDenom;
        out = (u>=0) && (v>=0) && (u+v<1);
    }
    BARYCENTRICTIME = window.performance.now()-pre;
    return out;
}
/**
 * @param {Vec} p1
 * @param {Vec} p2
 * @param {Vec} a
 * @param {Vec} ab
 */
function sameSide(p1, p2, a, ab) {
    var cp1 = cross(ab, segment(a, p1));
    var cp2 = cross(ab, segment(a, p2));
    return (dot(cp1, cp2).scalar()>=0);
}
/**
 * @param {Tri} A
 * @param {Vec} b
 */
function triSameSideCollision(A, b) {
    var out = AABB(A.min, A.max, b, b);
    var pre = window.performance.now();
    if(out)
        out = (sameSide(b, A.a, A.b, A.bc) && sameSide(b, A.b, A.a, A.ac) && sameSide(b, A.c, A.a, A.ab));
    SAMESIDETIME = window.performance.now()-pre;
    return out;
}
/** https://math.stackexchange.com/questions/270767/find-intersection-of-two-3d-lines
 * @param {Vec} a0
 * @param {Vec} a1
 * @param {Vec} b0
 * @param {Vec} b1
 */
function lineIntersection3d(a0, a1, b0, b1) {
    if(a0.z==a1.z&&a1.z==b0.z&&b0.z==b1.z)
        return lineIntersection2d(a0, a1, b0, b1);
    var pre = window.performance.now();
    if(!AABB_(min(a0, a1), max(a0, a1), min(b0, b1), max(b0, b1))) {
        AREATIME=window.performance.now()-pre;
        return false;
    }
    var f = point(a0, a1);
    var e = point(b0, b1);
    if(distance3d(e, f)==0){
        AREATIME=window.performance.now()-pre;
        return false;
    }
    var g = segment(a0, b0);
    var h = cross(f, g);
    var k = cross(f, e);
    var sign = compare(h, k) ? -1 : 1;
    var intersection = addVec(b0, scaleVec(e, sign * (h.magnitude() / k.magnitude())));
    if(distance3d(b0, intersection)>distance3d(b0, b1)||distance3d(b1, intersection)>distance3d(b1, b0)){
        AREATIME=window.performance.now()-pre;
        return false;
    }
    if(!(pointOnLine(a0, a1, intersection) && pointOnLine(b0, b1, intersection))) {
        AREATIME=window.performance.now()-pre;
        return false;
    }    
    AREATIME=window.performance.now()-pre;
    return true;
}
/**
 * @param {Vec} a0
 * @param {Vec} a1
 * @param {Vec} b0
 * @param {Vec} b1
 */
function lineIntersection2d(a0, a1, b0, b1) {
    var pre = window.performance.now();
    if(a0.x==a1.x) {
        if(b0.x==b1.x) {
            AREATIME = window.performance.now()-pre;
            return false;
        }
        var x = a0.x;
        var m2 = (b0.y-b1.y)/(b0.x-b1.x);
        var bO = b0.y-(b0.x*m2);
        AREATIME = window.performance.now()-pre;
        return new Vec(x, x*m2+bO, a0.z);
    }
    var m1 = (a0.y-a1.y)/(a0.x-a1.x);
    var m2 = (b0.y-b1.y)/(b0.x-b1.x);
    if(m1==m2){
        AREATIME = window.performance.now()-pre;
        return false;
    }
    var aO = a0.y+-(a0.x*m1);
    var bO = b0.y+-(b0.x*m2);
    var x = (b0.x==b1.x) ? b0.x : (aO-bO)/(m2-m1);
    AREATIME = window.performance.now()-pre;
    var out = new Vec(x, x*m1+aO, a0.z);
    return (pointOnLine(a0, a1, out)&&pointOnLine(b0, b1, out));
}
/**
 * @param {Vec} a0
 * @param {Vec} a1
 * @param {Vec} b
 */
function pointOnLine(a0, a1, b) {
    return (compare(point(a1, a0), point(b, a0)) && compare(point(a0, a1), point(b, a1)));
}
// Basic Gemoetry
/** Get area of any triangle
 * @param {Tri} a
 */
function triArea_(a) {
    // return Math.abs(a.ab.scalar()*a.ac.scalar())/2;
    var s = a.circumference/2;
    return Math.sqrt(s*(s-a._ab)*(s-a._bc)*(s-a._ac));
}
/** Gets Area of Triangle between 3 Vec points
 * @param {Vec} a
 * @param {Vec} b
 * @param {Vec} c
 */
function triArea(a, b, c) {
    return triArea_(new Tri(a, b, c));
}
/**
 * @param {Vec} a
 * @param {number} theta
 * @param {Vec} b
 */
function triAreaSAS(a, theta, b) {
    return (dot(a, b).magnitude() * theta * 0.5);
}
//Distance functions
/** Gets distance between 2 sets of 3d coords
 * @param {number} x1
 * @param {number} y1
 * @param {number} z1
 * @param {number} x2
 * @param {number} y2
 * @param {number} z2
 */
function distance3d_(x1,y1,z1,x2,y2,z2) {
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2) + Math.pow(z1-z2, 2));
}
/** Gets distance betweem 2 sets of 2d coords
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
function distance2d_(x1,y1,x2,y2) {
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
}
/** Gets distance between 2 Vec points in 3d space
 * @param {Vec} a
 * @param {Vec} b
 */
function distance3d(a, b) {
    return distance3d_(a.x, a.y, a.z, b.x, b.y, b.z);
}
/** Gets distance between 2 Vec points in 2d space
 * @param {Vec} a
 * @param {Vec} b
 */
function distance2d(a, b) {
    return distance2d_(a.x, a.y, b.x, b.y);
}
// Vector defining
/** Creates vector from the difference in 2 sets of 3d coords
 * @param {number} x1
 * @param {number} y1
 * @param {number} z1
 * @param {number} x2
 * @param {number} y2
 * @param {number} z2
 */
function segment_(x1, y1, z1, x2, y2, z2) {
        return new Vec(x2-x1, y2-y1, z2-z1);
}
/** Creates vector from the difference between two vectors, equivilent to (a - b)
 * @param {Vec} a
 * @param {Vec} b
 */
function segment(a, b) {
    return segment_(a.x, a.y, a.z, b.x, b.y, b.z);
}
/** Creates a vector that points from A to B
 * @param {Vec} a
 * @param {Vec} b
 */
function point(a, b) {
    var v = new Vec(b.x-a.x, b.y-a.y, b.z-a.z);
    v.normalize();
    return v;
}
/** Creates vector from a + b
 * @param {Vec} a
 * @param {Vec} b
 */
function addVec(a, b) {
    return new Vec(a.x+b.x, a.y+b.y, a.z+b.z);
}
/** Creates vector from the dot product between a * b
 * @param {Vec} a
 * @param {Vec} b
 */
function dot(a, b) {
    return new Vec(a.x*b.x, a.y*b.y, a.z*b.z);
}
/** Scales a Vector by a constant number value
 * @param {Vec} a
 * @param {number} b
 */
function scaleVec(a, b) {
    return new Vec(a.x*b, a.y*b, a.z*b);
}
/** Gives the cross product of two vectors
 * @param {Vec} a
 * @param {Vec} b
 */
function cross(a, b) {
    // return scaleVec(crossNormal(a, b), a.magnitude()*b.magnitude()*Math.sin(angleBetweenVec(a, b)));
    return new Vec(a.y*b.z-a.z*b.y, a.x*b.z-a.z*b.x, a.x*b.y-a.y*b.x);
}
/** Gives the angle between two vectors
 * @param {Vec} a
 * @param {Vec} b
 */
function angleBetweenVec(a, b) {
    return dot(a, b).scalar()/(a.magnitude()*b.magnitude());
}
/** Returns a new normalized vector from a
 * @param {Vec} a
 */
function normalized(a) {
    var m = a.magnitude()
    return new Vec(a.x/m,a.y/m,a.z/m);
}
/** Returns a vector containing the smallest x, y, and z, from a and b
 * @param {Vec} a
 * @param {Vec} b
 */
function min(a, b){
    return new Vec(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
}
/** Returns a vector containing the biggest x, y, and z, from a and b
 * @param {Vec} a
 * @param {Vec} b
 */
function max(a, b){
    return new Vec(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
}
/** Returns the inverse of a given vector
 * @param {Vec} a
 */
function inverse(a){
    return new Vec(-a.x, -a.y, -a.z);
}
/**
 * @param {Vec} a
 * @param {Vec} b
 */
function compare(a, b) {

    return Math.abs(a.x-b.x)<=0.00000000001&&Math.abs(a.y-b.y)<=0.00000000001&&Math.abs(a.z-b.z)<=0.00000000001;
}