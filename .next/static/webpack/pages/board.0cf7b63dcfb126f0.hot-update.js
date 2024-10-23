"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/board",{

/***/ "./components/BestPost/BestPost.jsx":
/*!******************************************!*\
  !*** ./components/BestPost/BestPost.jsx ***!
  \******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ BestPost)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _BestPost_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BestPost.module.css */ \"./components/BestPost/BestPost.module.css\");\n/* harmony import */ var _BestPost_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_BestPost_module_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _images_board_best_badge_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../images/board/best_badge.svg */ \"./images/board/best_badge.svg\");\n/* harmony import */ var _images_board_laptop_img_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../images/board/laptop_img.svg */ \"./images/board/laptop_img.svg\");\n/* harmony import */ var _images_board_heart_img_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../images/board/heart_img.svg */ \"./images/board/heart_img.svg\");\n/* harmony import */ var _utils_fetchApi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/fetchApi */ \"./utils/fetchApi.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction BestPost() {\n    _s();\n    const fetchBestPosts = async ()=>{\n        try {\n            const data = await (0,_utils_fetchApi__WEBPACK_IMPORTED_MODULE_6__.fetchApi)(\"/articles/best\");\n            setBestPosts(data);\n        } catch (e) {\n            console.error(e);\n        }\n    };\n    useEffect(()=>{\n        fetchBestPosts();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: (_BestPost_module_css__WEBPACK_IMPORTED_MODULE_2___default().best_container),\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_BestPost_module_css__WEBPACK_IMPORTED_MODULE_2___default().best_wrapper),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {\n                        src: _images_board_best_badge_svg__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\components\\\\BestPost\\\\BestPost.jsx\",\n                        lineNumber: 26,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_BestPost_module_css__WEBPACK_IMPORTED_MODULE_2___default().title_img),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                children: \"맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\components\\\\BestPost\\\\BestPost.jsx\",\n                                lineNumber: 28,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                src: _images_board_laptop_img_svg__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\components\\\\BestPost\\\\BestPost.jsx\",\n                                lineNumber: 29,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\components\\\\BestPost\\\\BestPost.jsx\",\n                        lineNumber: 27,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_BestPost_module_css__WEBPACK_IMPORTED_MODULE_2___default().user_wrapper),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: (_BestPost_module_css__WEBPACK_IMPORTED_MODULE_2___default().user_stats),\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        children: \"총명\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\components\\\\BestPost\\\\BestPost.jsx\",\n                                        lineNumber: 33,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                        src: _images_board_heart_img_svg__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\components\\\\BestPost\\\\BestPost.jsx\",\n                                        lineNumber: 34,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        children: \"9999+\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\components\\\\BestPost\\\\BestPost.jsx\",\n                                        lineNumber: 35,\n                                        columnNumber: 15\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\components\\\\BestPost\\\\BestPost.jsx\",\n                                lineNumber: 32,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: (_BestPost_module_css__WEBPACK_IMPORTED_MODULE_2___default().create_at),\n                                children: \"2024. 04. 16\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\components\\\\BestPost\\\\BestPost.jsx\",\n                                lineNumber: 37,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\components\\\\BestPost\\\\BestPost.jsx\",\n                        lineNumber: 31,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\components\\\\BestPost\\\\BestPost.jsx\",\n                lineNumber: 25,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\components\\\\BestPost\\\\BestPost.jsx\",\n            lineNumber: 24,\n            columnNumber: 7\n        }, this)\n    }, void 0, false);\n}\n_s(BestPost, \"OD7bBpZva5O2jO+Puf00hKivP7c=\");\n_c = BestPost;\nvar _c;\n$RefreshReg$(_c, \"BestPost\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0Jlc3RQb3N0L0Jlc3RQb3N0LmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQStCO0FBQ1k7QUFDVztBQUNDO0FBQ0Y7QUFDVDtBQUU3QixTQUFTTTs7SUFDdEIsTUFBTUMsaUJBQWlCO1FBQ3JCLElBQUk7WUFDRixNQUFNQyxPQUFPLE1BQU1ILHlEQUFRQSxDQUFDO1lBQzVCSSxhQUFhRDtRQUNmLEVBQUUsT0FBT0UsR0FBRztZQUNWQyxRQUFRQyxLQUFLLENBQUNGO1FBQ2hCO0lBQ0Y7SUFFQUcsVUFBVTtRQUNSTjtJQUNGLEdBQUcsRUFBRTtJQUVMLHFCQUNFO2tCQUNFLDRFQUFDTztZQUFJQyxXQUFXZCw0RUFBcUI7c0JBQ25DLDRFQUFDYTtnQkFBSUMsV0FBV2QsMEVBQW1COztrQ0FDakMsOERBQUNELG1EQUFLQTt3QkFBQ2tCLEtBQUtoQixvRUFBS0E7Ozs7OztrQ0FDakIsOERBQUNZO3dCQUFJQyxXQUFXZCx1RUFBZ0I7OzBDQUM5Qiw4REFBQ21COzBDQUFHOzs7Ozs7MENBQ0osOERBQUNwQixtREFBS0E7Z0NBQUNrQixLQUFLZixvRUFBTUE7Ozs7Ozs7Ozs7OztrQ0FFcEIsOERBQUNXO3dCQUFJQyxXQUFXZCwwRUFBbUI7OzBDQUNqQyw4REFBQ2E7Z0NBQUlDLFdBQVdkLHdFQUFpQjs7a0RBQy9CLDhEQUFDc0I7a0RBQUU7Ozs7OztrREFDSCw4REFBQ3ZCLG1EQUFLQTt3Q0FBQ2tCLEtBQUtkLG1FQUFLQTs7Ozs7O2tEQUNqQiw4REFBQ21CO2tEQUFFOzs7Ozs7Ozs7Ozs7MENBRUwsOERBQUNUO2dDQUFJQyxXQUFXZCx1RUFBZ0I7MENBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU05QztHQW5Dd0JLO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvQmVzdFBvc3QvQmVzdFBvc3QuanN4P2YyZmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltYWdlIGZyb20gXCJuZXh0L2ltYWdlXCI7XHJcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4vQmVzdFBvc3QubW9kdWxlLmNzc1wiO1xyXG5pbXBvcnQgYmFkZ2UgZnJvbSBcIi4uLy4uL2ltYWdlcy9ib2FyZC9iZXN0X2JhZGdlLnN2Z1wiO1xyXG5pbXBvcnQgbGFwdG9wIGZyb20gXCIuLi8uLi9pbWFnZXMvYm9hcmQvbGFwdG9wX2ltZy5zdmdcIjtcclxuaW1wb3J0IGhlYXJ0IGZyb20gXCIuLi8uLi9pbWFnZXMvYm9hcmQvaGVhcnRfaW1nLnN2Z1wiO1xyXG5pbXBvcnQgeyBmZXRjaEFwaSB9IGZyb20gXCJAL3V0aWxzL2ZldGNoQXBpXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBCZXN0UG9zdCgpIHtcclxuICBjb25zdCBmZXRjaEJlc3RQb3N0cyA9IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaEFwaShcIi9hcnRpY2xlcy9iZXN0XCIpO1xyXG4gICAgICBzZXRCZXN0UG9zdHMoZGF0YSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGZldGNoQmVzdFBvc3RzKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5iZXN0X2NvbnRhaW5lcn0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5iZXN0X3dyYXBwZXJ9PlxyXG4gICAgICAgICAgPEltYWdlIHNyYz17YmFkZ2V9IC8+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRpdGxlX2ltZ30+XHJcbiAgICAgICAgICAgIDxoMz7rp6XrtoEgMTbsnbjsuZggMTbquLDqsIAgMe2FjOudvCDsoJXrj4Qg7IKs7JaR7J2066m0IOyWvOuniOyXkCDtjJTslYTslbztlZjrgpjsmpQ/PC9oMz5cclxuICAgICAgICAgICAgPEltYWdlIHNyYz17bGFwdG9wfSAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnVzZXJfd3JhcHBlcn0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudXNlcl9zdGF0c30+XHJcbiAgICAgICAgICAgICAgPHA+7LSd66qFPC9wPlxyXG4gICAgICAgICAgICAgIDxJbWFnZSBzcmM9e2hlYXJ0fSAvPlxyXG4gICAgICAgICAgICAgIDxwPjk5OTkrPC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jcmVhdGVfYXR9PjIwMjQuIDA0LiAxNjwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC8+XHJcbiAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsiSW1hZ2UiLCJzdHlsZXMiLCJiYWRnZSIsImxhcHRvcCIsImhlYXJ0IiwiZmV0Y2hBcGkiLCJCZXN0UG9zdCIsImZldGNoQmVzdFBvc3RzIiwiZGF0YSIsInNldEJlc3RQb3N0cyIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJ1c2VFZmZlY3QiLCJkaXYiLCJjbGFzc05hbWUiLCJiZXN0X2NvbnRhaW5lciIsImJlc3Rfd3JhcHBlciIsInNyYyIsInRpdGxlX2ltZyIsImgzIiwidXNlcl93cmFwcGVyIiwidXNlcl9zdGF0cyIsInAiLCJjcmVhdGVfYXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/BestPost/BestPost.jsx\n"));

/***/ })

});