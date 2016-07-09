/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _binaryTree = __webpack_require__(1);
	
	var _binaryTree2 = _interopRequireDefault(_binaryTree);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var a = new _binaryTree2.default([1, 20, 5, 4, 13, 22, 10, 21]);
	a.removeNode(20);
	a.removeNode(5);
	a.removeNode(4);
	a.removeNode(1);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = BSTree;
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function BSTree(rootVal) {
	    var _this = this;
	
	    if (rootVal instanceof Array) {
	        var values = [].concat(_toConsumableArray(rootVal));
	        this.root = new TreeNode(values.shift());
	        values.forEach(function (val) {
	            _this.addNode(val);
	        });
	    } else {
	        this.root = new TreeNode(rootVal);
	    }
	}
	
	BSTree.prototype.getChangeRef = function (value) {
	    var child = this.root,
	        childDirection = void 0,
	        parent = void 0;
	
	    while (child && child.value !== value) {
	        parent = child;
	        childDirection = child.value > value ? child.LEFT : child.RIGHT;
	        child = parent[childDirection];
	    }
	
	    return {
	        parentRef: parent,
	        childDirection: childDirection,
	        isNull: !child
	    };
	};
	
	BSTree.prototype.addNode = function (value) {
	    var _getChangeRef = this.getChangeRef(value);
	
	    var parentRef = _getChangeRef.parentRef;
	    var childDirection = _getChangeRef.childDirection;
	
	    parentRef[childDirection] = new TreeNode(value);
	};
	
	BSTree.prototype.removeNode = function (value) {
	    var _getChangeRef2 = this.getChangeRef(value);
	
	    var parentRef = _getChangeRef2.parentRef;
	    var childDirection = _getChangeRef2.childDirection;
	    var isNull = _getChangeRef2.isNull;
	
	
	    if (!parentRef) {
	        // Removing root node.
	        parentRef = this;
	        childDirection = 'root';
	    }
	
	    if (isNull) {
	        return false;
	    } else {
	        var child = parentRef ? parentRef[childDirection] : this.root,
	            isLeaf = child.isLeaf(),
	            isFull = child.left !== null && child.right !== null;
	
	        if (isLeaf) {
	            // need to dereference to make the change
	            parentRef[childDirection] = null;
	        } else if (isFull) {
	            var smNode = getAndRemoveSmallestNode(child.right, child);
	
	            smNode.left = child.left;
	            smNode.right = child.right;
	
	            parentRef[childDirection] = smNode;
	        } else {
	            var nextChildDirection = child.left ? child.LEFT : child.RIGHT;
	            parentRef[childDirection] = child[nextChildDirection];
	        }
	        return true;
	    }
	
	    // Returns a reference to the smallest node beginning with startRef,
	    // while deleting the node from the tree.
	    function getAndRemoveSmallestNode(startRef, parentRef) {
	        var startValue = startRef.value,
	            smDirection = void 0,
	            result = void 0;
	
	        while (startRef.left) {
	            parentRef = startRef;
	            startRef = startRef.left;
	        }
	
	        result = startRef;
	        // in case startRef is smallest value, meaning it will be on it's parent's right
	        smDirection = startValue === startRef.value ? startRef.RIGHT : startRef.LEFT;
	
	        parentRef[smDirection] = null;
	
	        return result;
	    }
	};
	
	function TreeNode(val) {
	    this.value = val;
	    this.left = null;
	    this.right = null;
	}
	
	TreeNode.prototype.LEFT = 'left';
	TreeNode.prototype.RIGHT = 'right';
	
	TreeNode.prototype.isLeaf = function () {
	    return this.left === null && this.right === null;
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjljNjgxNzE5M2EyODM3YzM4YTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5hcnktc2VhcmNoLXRyZWUvYmluYXJ5LXRyZWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7Ozs7O0FBRUEsS0FBSSxJQUFJLHlCQUFXLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLEVBQWQsRUFBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsQ0FBWCxDQUFSO0FBQ0EsR0FBRSxVQUFGLENBQWEsRUFBYjtBQUNBLEdBQUUsVUFBRixDQUFhLENBQWI7QUFDQSxHQUFFLFVBQUYsQ0FBYSxDQUFiO0FBQ0EsR0FBRSxVQUFGLENBQWEsQ0FBYixFOzs7Ozs7Ozs7OzttQkNOd0IsTTs7OztBQUFULFVBQVMsTUFBVCxDQUFnQixPQUFoQixFQUF5QjtBQUFBOztBQUNwQyxTQUFHLG1CQUFtQixLQUF0QixFQUE2QjtBQUN6QixhQUFJLHNDQUFjLE9BQWQsRUFBSjtBQUNBLGNBQUssSUFBTCxHQUFZLElBQUksUUFBSixDQUFhLE9BQU8sS0FBUCxFQUFiLENBQVo7QUFDQSxnQkFBTyxPQUFQLENBQWUsZUFBTztBQUNsQixtQkFBSyxPQUFMLENBQWEsR0FBYjtBQUNILFVBRkQ7QUFHSCxNQU5ELE1BTU87QUFDSCxjQUFLLElBQUwsR0FBWSxJQUFJLFFBQUosQ0FBYSxPQUFiLENBQVo7QUFDSDtBQUNKOztBQUVELFFBQU8sU0FBUCxD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U0FBVCxDQUFtQixJQUFuQixHQUEwQixNQUExQjtBQUNBLFVBQVMsU0FBVCxDQUFtQixLQUFuQixHQUEyQixPQUEzQjs7QUFFQSxVQUFTLFNBQVQsQ0FBbUIsTUFBbkIsR0FBNEIsWUFBVztBQUNuQyxZQUFPLEtBQUssSUFBTCxLQUFjLElBQWQsSUFBc0IsS0FBSyxLQUFMLEtBQWUsSUFBNUM7QUFDSCxFQUZELEMiLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDY5YzY4MTcxOTNhMjgzN2MzOGEwXG4gKiovIiwiaW1wb3J0IEJTVHJlZSBmcm9tICcuL2JpbmFyeS1zZWFyY2gtdHJlZS9iaW5hcnktdHJlZSc7XG5cbmxldCBhID0gbmV3IEJTVHJlZShbMSwgMjAsIDUsIDQsIDEzLCAyMiwgMTAsIDIxXSk7XG5hLnJlbW92ZU5vZGUoMjApO1xuYS5yZW1vdmVOb2RlKDUpO1xuYS5yZW1vdmVOb2RlKDQpO1xuYS5yZW1vdmVOb2RlKDEpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQlNUcmVlKHJvb3RWYWwpIHtcbiAgICBpZihyb290VmFsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgbGV0IHZhbHVlcyA9IFsgLi4ucm9vdFZhbCBdO1xuICAgICAgICB0aGlzLnJvb3QgPSBuZXcgVHJlZU5vZGUodmFsdWVzLnNoaWZ0KCkpO1xuICAgICAgICB2YWx1ZXMuZm9yRWFjaCh2YWwgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGROb2RlKHZhbCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucm9vdCA9IG5ldyBUcmVlTm9kZShyb290VmFsKTtcbiAgICB9XG59XG5cbkJTVHJlZS5wcm90b3R5cGUuZ2V0Q2hhbmdlUmVmID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBsZXQgY2hpbGQgPSB0aGlzLnJvb3QsXG4gICAgICAgIGNoaWxkRGlyZWN0aW9uLFxuICAgICAgICBwYXJlbnQ7XG5cbiAgICB3aGlsZShjaGlsZCAmJiBjaGlsZC52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgcGFyZW50ID0gY2hpbGQ7XG4gICAgICAgIGNoaWxkRGlyZWN0aW9uID0gY2hpbGQudmFsdWUgPiB2YWx1ZSA/IGNoaWxkLkxFRlQgOiBjaGlsZC5SSUdIVDtcbiAgICAgICAgY2hpbGQgPSBwYXJlbnRbY2hpbGREaXJlY3Rpb25dO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHBhcmVudFJlZjogcGFyZW50LFxuICAgICAgICBjaGlsZERpcmVjdGlvbjogY2hpbGREaXJlY3Rpb24sXG4gICAgICAgIGlzTnVsbDogIWNoaWxkXG4gICAgfVxufTtcblxuQlNUcmVlLnByb3RvdHlwZS5hZGROb2RlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBsZXQgeyBwYXJlbnRSZWYsIGNoaWxkRGlyZWN0aW9uIH0gPSB0aGlzLmdldENoYW5nZVJlZih2YWx1ZSk7XG4gICAgcGFyZW50UmVmW2NoaWxkRGlyZWN0aW9uXSA9IG5ldyBUcmVlTm9kZSh2YWx1ZSk7XG59O1xuXG5CU1RyZWUucHJvdG90eXBlLnJlbW92ZU5vZGUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGxldCB7XG4gICAgICAgICAgICBwYXJlbnRSZWYsXG4gICAgICAgICAgICBjaGlsZERpcmVjdGlvbixcbiAgICAgICAgICAgIGlzTnVsbFxuICAgICAgICB9ID0gdGhpcy5nZXRDaGFuZ2VSZWYodmFsdWUpO1xuXG4gICAgaWYgKCFwYXJlbnRSZWYpIHsgLy8gUmVtb3Zpbmcgcm9vdCBub2RlLlxuICAgICAgICBwYXJlbnRSZWYgPSB0aGlzO1xuICAgICAgICBjaGlsZERpcmVjdGlvbiA9ICdyb290JztcbiAgICB9XG5cbiAgICBpZiAoaXNOdWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgY2hpbGQgPSBwYXJlbnRSZWYgPyBwYXJlbnRSZWZbY2hpbGREaXJlY3Rpb25dIDogdGhpcy5yb290LFxuICAgICAgICAgICAgaXNMZWFmID0gY2hpbGQuaXNMZWFmKCksXG4gICAgICAgICAgICBpc0Z1bGwgPSBjaGlsZC5sZWZ0ICE9PSBudWxsICYmIGNoaWxkLnJpZ2h0ICE9PSBudWxsO1xuXG4gICAgICAgIGlmIChpc0xlYWYpIHtcbiAgICAgICAgICAgIC8vIG5lZWQgdG8gZGVyZWZlcmVuY2UgdG8gbWFrZSB0aGUgY2hhbmdlXG4gICAgICAgICAgICBwYXJlbnRSZWZbY2hpbGREaXJlY3Rpb25dID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmIChpc0Z1bGwpIHtcbiAgICAgICAgICAgIGxldCBzbU5vZGUgPSBnZXRBbmRSZW1vdmVTbWFsbGVzdE5vZGUoY2hpbGQucmlnaHQsIGNoaWxkKTtcblxuICAgICAgICAgICAgc21Ob2RlLmxlZnQgPSBjaGlsZC5sZWZ0O1xuICAgICAgICAgICAgc21Ob2RlLnJpZ2h0ID0gY2hpbGQucmlnaHQ7XG5cbiAgICAgICAgICAgIHBhcmVudFJlZltjaGlsZERpcmVjdGlvbl0gPSBzbU5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbmV4dENoaWxkRGlyZWN0aW9uID0gY2hpbGQubGVmdCA/IGNoaWxkLkxFRlQgOiBjaGlsZC5SSUdIVDtcbiAgICAgICAgICAgIHBhcmVudFJlZltjaGlsZERpcmVjdGlvbl0gPSBjaGlsZFtuZXh0Q2hpbGREaXJlY3Rpb25dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIHNtYWxsZXN0IG5vZGUgYmVnaW5uaW5nIHdpdGggc3RhcnRSZWYsXG4gICAgLy8gd2hpbGUgZGVsZXRpbmcgdGhlIG5vZGUgZnJvbSB0aGUgdHJlZS5cbiAgICBmdW5jdGlvbiBnZXRBbmRSZW1vdmVTbWFsbGVzdE5vZGUoc3RhcnRSZWYsIHBhcmVudFJlZikge1xuICAgICAgICBsZXQgc3RhcnRWYWx1ZSA9IHN0YXJ0UmVmLnZhbHVlLFxuICAgICAgICAgICAgc21EaXJlY3Rpb24sXG4gICAgICAgICAgICByZXN1bHQ7XG5cbiAgICAgICAgd2hpbGUgKHN0YXJ0UmVmLmxlZnQpIHtcbiAgICAgICAgICAgIHBhcmVudFJlZiA9IHN0YXJ0UmVmO1xuICAgICAgICAgICAgc3RhcnRSZWYgPSBzdGFydFJlZi5sZWZ0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0ID0gc3RhcnRSZWY7XG4gICAgICAgIC8vIGluIGNhc2Ugc3RhcnRSZWYgaXMgc21hbGxlc3QgdmFsdWUsIG1lYW5pbmcgaXQgd2lsbCBiZSBvbiBpdCdzIHBhcmVudCdzIHJpZ2h0XG4gICAgICAgIHNtRGlyZWN0aW9uID0gKHN0YXJ0VmFsdWUgPT09IHN0YXJ0UmVmLnZhbHVlKSA/IHN0YXJ0UmVmLlJJR0hUIDogc3RhcnRSZWYuTEVGVDtcblxuICAgICAgICBwYXJlbnRSZWZbc21EaXJlY3Rpb25dID0gbnVsbDtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn07XG5cblxuZnVuY3Rpb24gVHJlZU5vZGUodmFsKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbDtcbiAgICB0aGlzLmxlZnQgPSBudWxsO1xuICAgIHRoaXMucmlnaHQgPSBudWxsO1xufVxuXG5UcmVlTm9kZS5wcm90b3R5cGUuTEVGVCA9ICdsZWZ0JztcblRyZWVOb2RlLnByb3RvdHlwZS5SSUdIVCA9ICdyaWdodCc7XG5cblRyZWVOb2RlLnByb3RvdHlwZS5pc0xlYWYgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5sZWZ0ID09PSBudWxsICYmIHRoaXMucmlnaHQgPT09IG51bGw7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluYXJ5LXNlYXJjaC10cmVlL2JpbmFyeS10cmVlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==