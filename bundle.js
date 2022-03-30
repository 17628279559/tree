/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__ (moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
            /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
        /******/
}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
    /******/
})
/************************************************************************/
/******/([
/* 0 */
/***/ function (module, exports, __webpack_require__) {

        'use strict';

        var _topiary = __webpack_require__(1);

        var _topiary2 = _interopRequireDefault(_topiary);

        function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        var randomBetween = function randomBetween (min, max) {
            return Math.random() * (max - min) + min;
        };

        var createTreeLine = function createTreeLine (treeLineOptions) {
            var w, h;
            var treeOptions = treeLineOptions.treeOptions;
            var treeX = 0;
            var canvas = document.createElement('canvas');
            w = canvas.width = treeLineOptions.width;
            h = canvas.height = treeLineOptions.height;
            treeOptions.canvas = canvas;
            treeOptions.delay = 100;
            var baseHeight = treeOptions.height;
            while (treeX < canvas.width) {
                var currentTreeOptions = treeOptions;
                currentTreeOptions.startPoint = _topiary2.default.Vector2d.new(treeX, canvas.height);
                currentTreeOptions.height = baseHeight * randomBetween(0.8, 1.2);
                var tree = _topiary2.default.new(currentTreeOptions);
                tree.draw(currentTreeOptions);
                treeX += treeLineOptions.spacing * randomBetween(1, 1.8);
            }
            return canvas;
        };

        var fillWithRandomGradient = function fillWithRandomGradient (canvas) {
            var ctx = canvas.getContext("2d");

            var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, _topiary2.default.Color.random().toStyle());
            gradient.addColorStop(1, _topiary2.default.Color.random().toStyle());

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        var canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        var ctx = canvas.getContext('2d');

        var sky = document.createElement('canvas');
        sky.width = canvas.width;
        sky.height = canvas.height;
        fillWithRandomGradient(sky);

        var treeColor = _topiary2.default.Color.random();
        var layer1 = createTreeLine({
            width: canvas.width + canvas.width / 12,
            height: canvas.height,
            spacing: 30,
            treeOptions: {
                height: 40,
                thickness: 2,
                depth: 6,
                color: treeColor
            }
        });

        treeColor = treeColor.darker(10);
        var layer2 = createTreeLine({
            width: canvas.width + canvas.width / 9,
            height: canvas.height,
            spacing: 60,
            treeOptions: {
                height: 60,
                thickness: 4,
                depth: 8,
                color: treeColor
            }
        });

        treeColor = treeColor.darker(10);
        var layer3 = createTreeLine({
            width: canvas.width + canvas.width / 6,
            height: canvas.height,
            spacing: 100,
            treeOptions: {
                height: 80,
                thickness: 6,
                depth: 10,
                color: treeColor
            }
        });

        treeColor = treeColor.darker(10);
        var layer4 = createTreeLine({
            width: canvas.width + canvas.width / 4,
            height: canvas.height,
            spacing: 150,
            treeOptions: {
                height: 100,
                thickness: 8,
                depth: 14,
                color: treeColor
            }
        });

        var draw = function draw () {
            ctx.drawImage(sky, 0, 0);
            ctx.drawImage(layer1, 0 - mouseX / 12, 0);
            ctx.drawImage(layer2, 0 - mouseX / 9, 0);
            ctx.drawImage(layer3, 0 - mouseX / 6, 0);
            ctx.drawImage(layer4, 0 - mouseX / 4, 0);
        };

        var mouseX = 0;
        canvas.addEventListener("mousemove", function (e) {
            e = e || window.event; // IE-ism
            mouseX = e.clientX - e.target.offsetLeft;
        }, false);

        var timeStep = 1 / 60 * 1000;
        var speed = 0.3333333333;
        var update = function update (delta) {
            // nothing for now
        };
        var currentTime = Date.now();
        var main = function main () {
            var newTime = Date.now();
            var frameTime = newTime - currentTime;
            currentTime = newTime;
            while (frameTime > 0) {
                var delta = Math.min(frameTime, timeStep);
                update(delta);
                frameTime -= delta;
            }
            draw();
            requestAnimationFrame(main);
        };

        main();

        /***/
},
/* 1 */
/***/ function (module, exports, __webpack_require__) {

        (function webpackUniversalModuleDefinition (root, factory) {
            if (true)
                module.exports = factory();
            else if (typeof define === 'function' && define.amd)
                define("Topiary", [], factory);
            else if (typeof exports === 'object')
                exports["Topiary"] = factory();
            else
                root["Topiary"] = factory();
        })(this, function () {
            return /******/ (function (modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__ (moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if (installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
                        /******/
};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
                    /******/
}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
                /******/
})
	/************************************************************************/
	/******/([
	/* 0 */
	/***/ function (module, exports, __webpack_require__) {

                    __webpack_require__(1);
                    __webpack_require__(2);
                    __webpack_require__(3);
                    module.exports = __webpack_require__(4);


                    /***/
},
	/* 1 */
	/***/ function (module, exports) {

                    "use strict";

                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var randomBetween = function randomBetween (min, max) {
                        return Math.random() * (max - min) + min;
                    };
                    exports.randomBetween = randomBetween;

                    /***/
},
	/* 2 */
	/***/ function (module, exports) {

                    "use strict";

                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    var Vector2d = function Vector2d (x, y) {
                        this.x = x;
                        this.y = y;
                    };

                    Vector2d.prototype.to = function (angle, length) {
                        var DEG_TO_RAD = Math.PI / 180;
                        var toX = this.x + Math.sin(angle * DEG_TO_RAD) * length;
                        var toY = this.y + Math.cos(angle * DEG_TO_RAD) * length;
                        return new Vector2d(toX, toY);
                    };

                    exports.default = Vector2d;

                    /***/
},
	/* 3 */
	/***/ function (module, exports, __webpack_require__) {

                    "use strict";

                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });

                    var _math_helpers = __webpack_require__(1);

                    var Color = function Color (h, s, l) {
                        if (typeof h == "string" && s === undefined) {
                            this.h = parseInt(style.split("(")[1]);
                            this.s = parseInt(style.split(",")[1]);
                            this.l = parseInt(style.split(",")[2]);
                        } else {
                            this.h = h;
                            this.s = s;
                            this.l = l;
                        }
                    }; // HSL colors


                    Color.prototype.toStyle = function () {
                        return "hsl(" + this.h + "," + this.s + "%," + this.l + "%)";
                    };

                    Color.prototype.darker = function (n) {
                        return new Color(this.h, this.s, Math.max(0, this.l - n));
                    };

                    Color.prototype.shiftHue = function (n) {
                        var newH = this.h + n % 359;
                        return new Color(newH, this.s, this.l);
                    };

                    Color.random = function () {
                        var h = (0, _math_helpers.randomBetween)(0, 359);
                        var s = (0, _math_helpers.randomBetween)(0, 100);
                        var l = (0, _math_helpers.randomBetween)(0, 100);
                        return new Color(h, s, l);
                    };

                    exports.default = Color;

                    /***/
},
	/* 4 */
	/***/ function (module, exports, __webpack_require__) {

                    'use strict';

                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });

                    var _color = __webpack_require__(3);

                    var _color2 = _interopRequireDefault(_color);

                    var _vector2d = __webpack_require__(2);

                    var _vector2d2 = _interopRequireDefault(_vector2d);

                    var _math_helpers = __webpack_require__(1);

                    function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj }; }

                    var TopiaryObject = function TopiaryObject (treeOptions, mutationOptions) {
                        var _this = this;

                        this.alive = true;
                        var mutate = function mutate (treeOptions, isRightBranch) {
                            var mOpts = _this.mutationOptions;
                            var tOpts = treeOptions;
                            return {
                                canvas: tOpts.canvas,
                                depth: tOpts.depth - 1,
                                angle: isRightBranch ? tOpts.angle + (0, _math_helpers.randomBetween)(mOpts.minRightAngle, mOpts.maxRightAngle) : tOpts.angle - (0, _math_helpers.randomBetween)(mOpts.minLeftAngle, mOpts.maxLeftAngle),
                                height: tOpts.height * (0, _math_helpers.randomBetween)(mOpts.minHeightChange, mOpts.maxHeightChange),
                                thickness: tOpts.thickness * (0, _math_helpers.randomBetween)(mOpts.minThicknessChange, mOpts.maxThicknessChange),
                                delay: tOpts.delay,
                                color: tOpts.color,
                                rainbow: tOpts.rainbow,
                                colorShiftRate: tOpts.colorShiftRate
                            };
                        };

                        var drawTree = function drawTree (treeOptions) {
                            var opts = treeOptions;
                            if (opts.depth > 0 && _this.alive) {
                                (function () {
                                    if (opts.angle === undefined) {
                                        opts.angle = 180;
                                    }
                                    var branch = drawBranch(opts);
                                    var leftOptions = mutate(opts, false);
                                    var rightOptions = mutate(opts, true);
                                    leftOptions.startPoint = rightOptions.startPoint = branch.endPoint;
                                    leftOptions.color = rightOptions.color = branch.endColor;
                                    if (opts.delay) {
                                        var timeout = window.setTimeout(function () {
                                            drawTree(leftOptions);
                                            drawTree(rightOptions);
                                        }, opts.delay);
                                    } else {
                                        drawTree(leftOptions);
                                        drawTree(rightOptions);
                                    }
                                })();
                            }
                        };

                        var drawBranch = function drawBranch (treeOptions) {
                            var opts = treeOptions;
                            var ctx = opts.canvas.getContext("2d");
                            var endPoint = opts.startPoint.to(opts.angle, opts.height);
                            var color = void 0,
                                nextColor = void 0;
                            if (opts.rainbow) {
                                nextColor = opts.color.shiftHue(opts.colorShiftRate);
                                var gradient = ctx.createLinearGradient(opts.startPoint.x, opts.startPoint.y, endPoint.x, endPoint.y);
                                gradient.addColorStop(0, opts.color.toStyle());
                                gradient.addColorStop(1, nextColor.toStyle());
                                color = gradient;
                            } else {
                                nextColor = opts.color;
                                color = opts.color.toStyle();
                            }
                            ctx.strokeStyle = color;
                            ctx.lineWidth = opts.thickness;
                            ctx.beginPath();
                            ctx.moveTo(opts.startPoint.x, opts.startPoint.y);
                            ctx.lineTo(endPoint.x, endPoint.y);
                            ctx.stroke();
                            return { endPoint: endPoint, endColor: nextColor };
                        };

                        var mutationDefaults = {
                            minLeftAngle: 10,
                            maxLeftAngle: 40,
                            minRightAngle: 10,
                            maxRightAngle: 40,
                            minHeightChange: 0.6,
                            maxHeightChange: 0.9,
                            minThicknessChange: 0.6,
                            maxThicknessChange: 0.9
                        };

                        this.treeOptions = treeOptions;
                        this.mutationOptions = mutationOptions || mutationDefaults;
                        this.draw = function () {
                            drawTree(this.treeOptions);
                        };
                        this.kill = function () {
                            this.alive = false;
                        };
                        return this;
                    };
                    var Topiary = {};
                    Topiary.new = function (treeOptions, mutationOptions) {
                        return new TopiaryObject(treeOptions, mutationOptions);
                    };
                    Topiary.Color = {};
                    Topiary.Vector2d = {};
                    Topiary.Color.new = function (h, s, l) {
                        return new _color2.default(h, s, l);
                    };
                    Topiary.Color.random = function () {
                        return _color2.default.random();
                    };
                    Topiary.Vector2d.new = function (x, y) {
                        return new _vector2d2.default(x, y);
                    };

                    exports.default = Topiary;

                    /***/
}
	/******/])
        });
        ;
        //# sourceMappingURL=bundle.js.map

        /***/
}
/******/]);
//# sourceMappingURL=bundle.js.map