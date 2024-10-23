"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/board/register",{

/***/ "./pages/board/register.js":
/*!*********************************!*\
  !*** ./pages/board/register.js ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Register)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _board_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./board.module.css */ \"./pages/board/board.module.css\");\n/* harmony import */ var _board_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_board_module_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _utils_axiosInstance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/axiosInstance */ \"./utils/axiosInstance.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\n\nvar _s = $RefreshSig$();\n\n\n\n\nfunction Register() {\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n    const [title, setTitle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [content, setContent] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        try {\n            const response = (0,_utils_axiosInstance__WEBPACK_IMPORTED_MODULE_3__.fetchApi)(\"/articles\", {\n                title,\n                content\n            }, \"POST\");\n            router.push(\"/board\");\n        } catch (e) {\n            console.error(e);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: (_board_module_css__WEBPACK_IMPORTED_MODULE_2___default().register_container),\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_board_module_css__WEBPACK_IMPORTED_MODULE_2___default().register_title),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                            children: \"게시글 쓰기\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\register.js\",\n                            lineNumber: 33,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            className: (_board_module_css__WEBPACK_IMPORTED_MODULE_2___default().register_buttion),\n                            onClick: handleSubmit,\n                            children: \"등록\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\register.js\",\n                            lineNumber: 34,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\register.js\",\n                    lineNumber: 32,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_board_module_css__WEBPACK_IMPORTED_MODULE_2___default().register_form),\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                children: \"*제목\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\register.js\",\n                                lineNumber: 40,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"text\",\n                                placeholder: \"제목을 입력해주세요\",\n                                className: (_board_module_css__WEBPACK_IMPORTED_MODULE_2___default().register_input),\n                                value: title,\n                                onChange: (e)=>setTitle(e.target.value),\n                                required: true\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\register.js\",\n                                lineNumber: 41,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                children: \"*내용\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\register.js\",\n                                lineNumber: 49,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"textarea\", {\n                                placeholder: \"내용을 입력해주세요\",\n                                className: `${(_board_module_css__WEBPACK_IMPORTED_MODULE_2___default().register_input)} ${(_board_module_css__WEBPACK_IMPORTED_MODULE_2___default().register_textarea)}`,\n                                value: content,\n                                onChange: (e)=>setContent(e.target.value),\n                                required: true\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\register.js\",\n                                lineNumber: 50,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\register.js\",\n                        lineNumber: 39,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\register.js\",\n                    lineNumber: 38,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\register.js\",\n            lineNumber: 31,\n            columnNumber: 7\n        }, this)\n    }, void 0, false);\n}\n_s(Register, \"ji4HZdNw3FeiaCMCGc/vhtJAGKE=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter\n    ];\n});\n_c = Register;\nvar _c;\n$RefreshReg$(_c, \"Register\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9ib2FyZC9yZWdpc3Rlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBaUM7QUFDTztBQUNTO0FBQ1Q7QUFFekIsU0FBU0k7O0lBQ3RCLE1BQU1DLFNBQVNGLHNEQUFTQTtJQUV4QixNQUFNLENBQUNHLE9BQU9DLFNBQVMsR0FBR1AsK0NBQVFBLENBQUM7SUFDbkMsTUFBTSxDQUFDUSxTQUFTQyxXQUFXLEdBQUdULCtDQUFRQSxDQUFDO0lBRXZDLE1BQU1VLGVBQWUsT0FBT0M7UUFDMUJBLEVBQUVDLGNBQWM7UUFFaEIsSUFBSTtZQUNGLE1BQU1DLFdBQVdYLDhEQUFRQSxDQUN2QixhQUNBO2dCQUNFSTtnQkFDQUU7WUFDRixHQUNBO1lBRUZILE9BQU9TLElBQUksQ0FBQztRQUNkLEVBQUUsT0FBT0gsR0FBRztZQUNWSSxRQUFRQyxLQUFLLENBQUNMO1FBQ2hCO0lBQ0Y7SUFDQSxxQkFDRTtrQkFDRSw0RUFBQ007WUFBSUMsV0FBV2pCLDZFQUF5Qjs7OEJBQ3ZDLDhEQUFDZ0I7b0JBQUlDLFdBQVdqQix5RUFBcUI7O3NDQUNuQyw4REFBQ29CO3NDQUFHOzs7Ozs7c0NBQ0osOERBQUNDOzRCQUFPSixXQUFXakIsMkVBQXVCOzRCQUFFdUIsU0FBU2Q7c0NBQWM7Ozs7Ozs7Ozs7Ozs4QkFJckUsOERBQUNPO29CQUFJQyxXQUFXakIsd0VBQW9COzhCQUNsQyw0RUFBQ3lCOzswQ0FDQyw4REFBQ0M7MENBQUc7Ozs7OzswQ0FDSiw4REFBQ0M7Z0NBQ0NDLE1BQUs7Z0NBQ0xDLGFBQVk7Z0NBQ1paLFdBQVdqQix5RUFBcUI7Z0NBQ2hDK0IsT0FBTzFCO2dDQUNQMkIsVUFBVSxDQUFDdEIsSUFBTUosU0FBU0ksRUFBRXVCLE1BQU0sQ0FBQ0YsS0FBSztnQ0FDeENHLFFBQVE7Ozs7OzswQ0FFViw4REFBQ1I7MENBQUc7Ozs7OzswQ0FDSiw4REFBQ1M7Z0NBQ0NOLGFBQVk7Z0NBQ1paLFdBQVcsR0FBR2pCLHlFQUFxQixDQUFDLENBQUMsRUFBRUEsNEVBQXdCLEVBQUU7Z0NBQ2pFK0IsT0FBT3hCO2dDQUNQeUIsVUFBVSxDQUFDdEIsSUFBTUYsV0FBV0UsRUFBRXVCLE1BQU0sQ0FBQ0YsS0FBSztnQ0FDMUNHLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU90QjtHQXhEd0IvQjs7UUFDUEQsa0RBQVNBOzs7S0FERkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvYm9hcmQvcmVnaXN0ZXIuanM/OTRmNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuL2JvYXJkLm1vZHVsZS5jc3NcIjtcclxuaW1wb3J0IHsgZmV0Y2hBcGkgfSBmcm9tIFwiQC91dGlscy9heGlvc0luc3RhbmNlXCI7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVnaXN0ZXIoKSB7XHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcblxyXG4gIGNvbnN0IFt0aXRsZSwgc2V0VGl0bGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2NvbnRlbnQsIHNldENvbnRlbnRdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBmZXRjaEFwaShcclxuICAgICAgICBcIi9hcnRpY2xlc1wiLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgY29udGVudCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiUE9TVFwiXHJcbiAgICAgICk7XHJcbiAgICAgIHJvdXRlci5wdXNoKFwiL2JvYXJkXCIpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucmVnaXN0ZXJfY29udGFpbmVyfT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnJlZ2lzdGVyX3RpdGxlfT5cclxuICAgICAgICAgIDxoMj7qsozsi5zquIAg7JOw6riwPC9oMj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtzdHlsZXMucmVnaXN0ZXJfYnV0dGlvbn0gb25DbGljaz17aGFuZGxlU3VibWl0fT5cclxuICAgICAgICAgICAg65Ox66GdXHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnJlZ2lzdGVyX2Zvcm19PlxyXG4gICAgICAgICAgPGZvcm0+XHJcbiAgICAgICAgICAgIDxoMz4q7KCc66qpPC9oMz5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi7KCc66qp7J2EIOyeheugpe2VtOyjvOyEuOyalFwiXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMucmVnaXN0ZXJfaW5wdXR9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e3RpdGxlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VGl0bGUoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxoMz4q64K07JqpPC9oMz5cclxuICAgICAgICAgICAgPHRleHRhcmVhXHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLrgrTsmqnsnYQg7J6F66Cl7ZW07KO87IS47JqUXCJcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5yZWdpc3Rlcl9pbnB1dH0gJHtzdHlsZXMucmVnaXN0ZXJfdGV4dGFyZWF9YH1cclxuICAgICAgICAgICAgICB2YWx1ZT17Y29udGVudH1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldENvbnRlbnQoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC8+XHJcbiAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJzdHlsZXMiLCJmZXRjaEFwaSIsInVzZVJvdXRlciIsIlJlZ2lzdGVyIiwicm91dGVyIiwidGl0bGUiLCJzZXRUaXRsZSIsImNvbnRlbnQiLCJzZXRDb250ZW50IiwiaGFuZGxlU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0IiwicmVzcG9uc2UiLCJwdXNoIiwiY29uc29sZSIsImVycm9yIiwiZGl2IiwiY2xhc3NOYW1lIiwicmVnaXN0ZXJfY29udGFpbmVyIiwicmVnaXN0ZXJfdGl0bGUiLCJoMiIsImJ1dHRvbiIsInJlZ2lzdGVyX2J1dHRpb24iLCJvbkNsaWNrIiwicmVnaXN0ZXJfZm9ybSIsImZvcm0iLCJoMyIsImlucHV0IiwidHlwZSIsInBsYWNlaG9sZGVyIiwicmVnaXN0ZXJfaW5wdXQiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwidGFyZ2V0IiwicmVxdWlyZWQiLCJ0ZXh0YXJlYSIsInJlZ2lzdGVyX3RleHRhcmVhIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/board/register.js\n"));

/***/ })

});