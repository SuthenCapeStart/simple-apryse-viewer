(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{1349:function(t,e,o){var n=o(1371).default,r=o(1348);t.exports=function(t,e){if(e&&("object"===n(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return r(t)},t.exports.__esModule=!0,t.exports.default=t.exports},1350:function(t,e){function o(e){return t.exports=o=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},t.exports.__esModule=!0,t.exports.default=t.exports,o(e)}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},1351:function(t,e,o){var n=o(1424);t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&n(t,e)},t.exports.__esModule=!0,t.exports.default=t.exports},1358:function(t,e,o){"use strict";function n(){var t=this.constructor.getDerivedStateFromProps(this.props,this.state);null!=t&&this.setState(t)}function r(t){this.setState(function(e){var o=this.constructor.getDerivedStateFromProps(t,e);return null!=o?o:null}.bind(this))}function p(t,e){try{var o=this.props,n=this.state;this.props=t,this.state=e,this.__reactInternalSnapshotFlag=!0,this.__reactInternalSnapshot=this.getSnapshotBeforeUpdate(o,n)}finally{this.props=o,this.state=n}}function i(t){var e=t.prototype;if(!e||!e.isReactComponent)throw new Error("Can only polyfill class components");if("function"!=typeof t.getDerivedStateFromProps&&"function"!=typeof e.getSnapshotBeforeUpdate)return t;var o=null,i=null,l=null;if("function"==typeof e.componentWillMount?o="componentWillMount":"function"==typeof e.UNSAFE_componentWillMount&&(o="UNSAFE_componentWillMount"),"function"==typeof e.componentWillReceiveProps?i="componentWillReceiveProps":"function"==typeof e.UNSAFE_componentWillReceiveProps&&(i="UNSAFE_componentWillReceiveProps"),"function"==typeof e.componentWillUpdate?l="componentWillUpdate":"function"==typeof e.UNSAFE_componentWillUpdate&&(l="UNSAFE_componentWillUpdate"),null!==o||null!==i||null!==l){var s=t.displayName||t.name,c="function"==typeof t.getDerivedStateFromProps?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";throw Error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n"+s+" uses "+c+" but also contains the following legacy lifecycles:"+(null!==o?"\n  "+o:"")+(null!==i?"\n  "+i:"")+(null!==l?"\n  "+l:"")+"\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks")}if("function"==typeof t.getDerivedStateFromProps&&(e.componentWillMount=n,e.componentWillReceiveProps=r),"function"==typeof e.getSnapshotBeforeUpdate){if("function"!=typeof e.componentDidUpdate)throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");e.componentWillUpdate=p;var a=e.componentDidUpdate;e.componentDidUpdate=function(t,e,o){var n=this.__reactInternalSnapshotFlag?this.__reactInternalSnapshot:o;a.call(this,t,e,n)}}return t}o.r(e),o.d(e,"polyfill",(function(){return i})),n.__suppressDeprecationWarning=!0,r.__suppressDeprecationWarning=!0,p.__suppressDeprecationWarning=!0},1368:function(t,e,o){"use strict";o.r(e),o.d(e,"default",(function(){return p}));var n,r=!("undefined"==typeof window||!window.document||!window.document.createElement);function p(t){if((!n&&0!==n||t)&&r){var e=document.createElement("div");e.style.position="absolute",e.style.top="-9999px",e.style.width="50px",e.style.height="50px",e.style.overflow="scroll",document.body.appendChild(e),n=e.offsetWidth-e.clientWidth,document.body.removeChild(e)}return n}}}]);
//# sourceMappingURL=8.chunk.js.map