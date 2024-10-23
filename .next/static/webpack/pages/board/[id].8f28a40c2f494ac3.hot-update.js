"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/board/[id]",{

/***/ "./pages/board/[id].js":
/*!*****************************!*\
  !*** ./pages/board/[id].js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Board)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _board_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board.module.css */ \"./pages/board/board.module.css\");\n/* harmony import */ var _board_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_board_module_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _components_EditDeleteModal_EditDeleteModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/EditDeleteModal/EditDeleteModal */ \"./components/EditDeleteModal/EditDeleteModal.jsx\");\n/* harmony import */ var _images_board_select_img_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../images/board/select_img.svg */ \"./images/board/select_img.svg\");\n/* harmony import */ var _images_board_profile_img_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../images/board/profile_img.svg */ \"./images/board/profile_img.svg\");\n/* harmony import */ var _images_board_heart_btn_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../images/board/heart_btn.svg */ \"./images/board/heart_btn.svg\");\n/* harmony import */ var _images_board_back_icon_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../images/board/back_icon.svg */ \"./images/board/back_icon.svg\");\n/* harmony import */ var _images_board_reply_empty_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../images/board/reply_empty.svg */ \"./images/board/reply_empty.svg\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_11__);\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\n\n/** TODO\r\n * 1. 전체적인 이미지에 alt 넣기\r\n * 2. 삭제하기는 피그마에 없어서 추후 업데이트 예정\r\n */ function Board() {\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_11__.useRouter)();\n    const { id } = router.query;\n    const [article, setArticle] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)();\n    const [comment, setComment] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)([]);\n    const [isModalOpen, setIsModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);\n    const fetchArticle = async ()=>{\n        if (id) {\n            try {\n                const data = await fetchApi(`/articles/${id}`);\n                setArticle(data);\n            } catch (error) {\n                console.error(error);\n            }\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{\n        fetchArticle();\n    }, [\n        id\n    ]);\n    const toggleModal = ()=>{\n        setIsModalOpen((prev)=>!prev);\n    };\n    const handleEditClick = ()=>{\n        setIsModalOpen(false);\n        Router.push(\"/board/:id\");\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().detail_content_container),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().detail_title),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                children: article.title\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                                lineNumber: 53,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                src: _images_board_select_img_svg__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n                                onClick: toggleModal\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                                lineNumber: 54,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                        lineNumber: 52,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().detail_user_stats),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                src: _images_board_profile_img_svg__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n                                className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().user_img)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                                lineNumber: 57,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h4\", {\n                                className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().nickname),\n                                children: \"총명한판다\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                                lineNumber: 58,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h4\", {\n                                className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().create_at),\n                                children: \"2024. 01. 02\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                                lineNumber: 59,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().line)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                                lineNumber: 60,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                src: _images_board_heart_btn_svg__WEBPACK_IMPORTED_MODULE_8__[\"default\"]\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                                lineNumber: 61,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                        lineNumber: 56,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().post_content),\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: article.content\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                            lineNumber: 64,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                        lineNumber: 63,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                lineNumber: 51,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().comment_register_container),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h4\", {\n                        children: \"댓글달기\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                        lineNumber: 68,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"textarea\", {\n                        placeholder: \"댓글을 입력해주세요.\",\n                        className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().comment_textarea)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                        lineNumber: 69,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().buttion_container),\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().register_buttion),\n                            children: \"등록\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                            lineNumber: 74,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                        lineNumber: 73,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                lineNumber: 67,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().comment_container),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().comment_title),\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    children: \"혹시 사용기간이 어떻게 되실까요?\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                                    lineNumber: 87,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                    src: _images_board_select_img_svg__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n                                    onClick: toggleModal\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                                    lineNumber: 88,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                            lineNumber: 86,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().detail_user_stats),\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                    src: _images_board_profile_img_svg__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n                                    className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().user_img)\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                                    lineNumber: 91,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().comment_user_stats_content),\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h5\", {\n                                            className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().nickname),\n                                            children: \"총명한판다\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                                            lineNumber: 93,\n                                            columnNumber: 15\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h5\", {\n                                            className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().create_at),\n                                            children: \"1시간 전\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                                            lineNumber: 94,\n                                            columnNumber: 15\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                                    lineNumber: 92,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                            lineNumber: 90,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                lineNumber: 78,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().return_button_container),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {\n                    href: \"/board\",\n                    className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().link_button),\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: (_board_module_css__WEBPACK_IMPORTED_MODULE_1___default().return_list),\n                        children: [\n                            \"목록으로 돌아가기\",\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                src: _images_board_back_icon_svg__WEBPACK_IMPORTED_MODULE_9__[\"default\"]\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                                lineNumber: 104,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                        lineNumber: 102,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                    lineNumber: 101,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                lineNumber: 100,\n                columnNumber: 7\n            }, this),\n            isModalOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_EditDeleteModal_EditDeleteModal__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                onEdit: handleEditClick\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\pc\\\\Desktop\\\\가현\\\\sprint8\\\\2-Sprint-Mission-FE\\\\pages\\\\board\\\\[id].js\",\n                lineNumber: 108,\n                columnNumber: 23\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(Board, \"ZlA8bEWGHc1QOhY/FJiqw6kLiOw=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_11__.useRouter\n    ];\n});\n_c = Board;\nvar _c;\n$RefreshReg$(_c, \"Board\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDhEQUFDMkQ7NENBQUcxQixXQUFXakMsbUVBQWU7c0RBQUU7Ozs7OztzREFDaEMsOERBQUMyRDs0Q0FBRzFCLFdBQVdqQyxvRUFBZ0I7c0RBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBTXpDLDhEQUFDZ0M7Z0JBQUlDLFdBQVdqQyxrRkFBOEI7MEJBQzVDLDRFQUFDRSxrREFBSUE7b0JBQUMyRCxNQUFNO29CQUFVNUIsV0FBV2pDLHNFQUFrQjs4QkFDakQsNEVBQUNzRDt3QkFBT3JCLFdBQVdqQyxzRUFBa0I7OzRCQUFFOzBDQUVyQyw4REFBQ0MsbURBQUtBO2dDQUFDcUMsS0FBSzdCLG1FQUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUlyQlcsNkJBQWUsOERBQUNmLG1GQUFlQTtnQkFBQzJELFFBQVFuQzs7Ozs7Ozs7QUFHL0M7R0E1RndCakI7O1FBQ1BELG1EQUFTQTs7O0tBREZDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL2JvYXJkL1tpZF0uanM/ZTU2NSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVzIGZyb20gXCIuL2JvYXJkLm1vZHVsZS5jc3NcIjtcclxuaW1wb3J0IEltYWdlIGZyb20gXCJuZXh0L2ltYWdlXCI7XHJcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcclxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgRWRpdERlbGV0ZU1vZGFsIGZyb20gXCJAL2NvbXBvbmVudHMvRWRpdERlbGV0ZU1vZGFsL0VkaXREZWxldGVNb2RhbFwiO1xyXG5cclxuaW1wb3J0IHNlbGVjdCBmcm9tIFwiLi4vLi4vaW1hZ2VzL2JvYXJkL3NlbGVjdF9pbWcuc3ZnXCI7XHJcbmltcG9ydCB1c2VyIGZyb20gXCIuLi8uLi9pbWFnZXMvYm9hcmQvcHJvZmlsZV9pbWcuc3ZnXCI7XHJcbmltcG9ydCBsaWtlX2J1dHRvbiBmcm9tIFwiLi4vLi4vaW1hZ2VzL2JvYXJkL2hlYXJ0X2J0bi5zdmdcIjtcclxuaW1wb3J0IGJhY2sgZnJvbSBcIi4uLy4uL2ltYWdlcy9ib2FyZC9iYWNrX2ljb24uc3ZnXCI7XHJcbmltcG9ydCBlbXB0eSBmcm9tIFwiLi4vLi4vaW1hZ2VzL2JvYXJkL3JlcGx5X2VtcHR5LnN2Z1wiO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcclxuXHJcbi8qKiBUT0RPXHJcbiAqIDEuIOyghOyytOyggeyduCDsnbTrr7jsp4Dsl5AgYWx0IOuEo+q4sFxyXG4gKiAyLiDsgq3soJztlZjquLDripQg7ZS86re466eI7JeQIOyXhuyWtOyEnCDstpTtm4Qg7JeF642w7J207Yq4IOyYiOyglVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEJvYXJkKCkge1xyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG4gIGNvbnN0IHsgaWQgfSA9IHJvdXRlci5xdWVyeTtcclxuXHJcbiAgY29uc3QgW2FydGljbGUsIHNldEFydGljbGVdID0gdXNlU3RhdGUoKTtcclxuICBjb25zdCBbY29tbWVudCwgc2V0Q29tbWVudF0gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2lzTW9kYWxPcGVuLCBzZXRJc01vZGFsT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGZldGNoQXJ0aWNsZSA9IGFzeW5jICgpID0+IHtcclxuICAgIGlmIChpZCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaEFwaShgL2FydGljbGVzLyR7aWR9YCk7XHJcbiAgICAgICAgc2V0QXJ0aWNsZShkYXRhKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGZldGNoQXJ0aWNsZSgpO1xyXG4gIH0sIFtpZF0pO1xyXG5cclxuICBjb25zdCB0b2dnbGVNb2RhbCA9ICgpID0+IHtcclxuICAgIHNldElzTW9kYWxPcGVuKChwcmV2KSA9PiAhcHJldik7XHJcbiAgfTtcclxuICBjb25zdCBoYW5kbGVFZGl0Q2xpY2sgPSAoKSA9PiB7XHJcbiAgICBzZXRJc01vZGFsT3BlbihmYWxzZSk7XHJcbiAgICBSb3V0ZXIucHVzaChcIi9ib2FyZC86aWRcIik7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZGV0YWlsX2NvbnRlbnRfY29udGFpbmVyfT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmRldGFpbF90aXRsZX0+XHJcbiAgICAgICAgICA8aDM+e2FydGljbGUudGl0bGV9PC9oMz5cclxuICAgICAgICAgIDxJbWFnZSBzcmM9e3NlbGVjdH0gb25DbGljaz17dG9nZ2xlTW9kYWx9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5kZXRhaWxfdXNlcl9zdGF0c30+XHJcbiAgICAgICAgICA8SW1hZ2Ugc3JjPXt1c2VyfSBjbGFzc05hbWU9e3N0eWxlcy51c2VyX2ltZ30gLz5cclxuICAgICAgICAgIDxoNCBjbGFzc05hbWU9e3N0eWxlcy5uaWNrbmFtZX0+7LSd66qF7ZWc7YyQ64ukPC9oND5cclxuICAgICAgICAgIDxoNCBjbGFzc05hbWU9e3N0eWxlcy5jcmVhdGVfYXR9PjIwMjQuIDAxLiAwMjwvaDQ+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmxpbmV9PjwvZGl2PlxyXG4gICAgICAgICAgPEltYWdlIHNyYz17bGlrZV9idXR0b259IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wb3N0X2NvbnRlbnR9PlxyXG4gICAgICAgICAgPHA+e2FydGljbGUuY29udGVudH08L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbW1lbnRfcmVnaXN0ZXJfY29udGFpbmVyfT5cclxuICAgICAgICA8aDQ+64yT6riA64us6riwPC9oND5cclxuICAgICAgICA8dGV4dGFyZWFcclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwi64yT6riA7J2EIOyeheugpe2VtOyjvOyEuOyalC5cIlxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuY29tbWVudF90ZXh0YXJlYX1cclxuICAgICAgICA+PC90ZXh0YXJlYT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJ1dHRpb25fY29udGFpbmVyfT5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtzdHlsZXMucmVnaXN0ZXJfYnV0dGlvbn0+65Ox66GdPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb21tZW50X2NvbnRhaW5lcn0+XHJcbiAgICAgICAgey8qIHtjb21tZW50Lmxlbmd0aCA9PT0gMCA/ICggKi99XHJcbiAgICAgICAgey8qIC8vIDw+ICovfVxyXG4gICAgICAgIHsvKiA8SW1hZ2Ugc3JjPXtlbXB0eX0gLz4gKi99XHJcbiAgICAgICAgey8qIDxwPuyVhOyngSDrjJPquIDsnbQg7JeG7Ja07JqUPC9wPiAqL31cclxuICAgICAgICB7LyogPC8+ICovfVxyXG4gICAgICAgIHsvKiAvLyApIDogKCAqL31cclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb21tZW50X3RpdGxlfT5cclxuICAgICAgICAgICAgPHA+7Zi57IucIOyCrOyaqeq4sOqwhOydtCDslrTrlrvqsowg65CY7Iuk6rmM7JqUPzwvcD5cclxuICAgICAgICAgICAgPEltYWdlIHNyYz17c2VsZWN0fSBvbkNsaWNrPXt0b2dnbGVNb2RhbH0gLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5kZXRhaWxfdXNlcl9zdGF0c30+XHJcbiAgICAgICAgICAgIDxJbWFnZSBzcmM9e3VzZXJ9IGNsYXNzTmFtZT17c3R5bGVzLnVzZXJfaW1nfSAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbW1lbnRfdXNlcl9zdGF0c19jb250ZW50fT5cclxuICAgICAgICAgICAgICA8aDUgY2xhc3NOYW1lPXtzdHlsZXMubmlja25hbWV9Puy0neuqhe2VnO2MkOuLpDwvaDU+XHJcbiAgICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT17c3R5bGVzLmNyZWF0ZV9hdH0+MeyLnOqwhCDsoIQ8L2g1PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvPlxyXG4gICAgICAgIHsvKiApfSAqL31cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucmV0dXJuX2J1dHRvbl9jb250YWluZXJ9PlxyXG4gICAgICAgIDxMaW5rIGhyZWY9e1wiL2JvYXJkXCJ9IGNsYXNzTmFtZT17c3R5bGVzLmxpbmtfYnV0dG9ufT5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtzdHlsZXMucmV0dXJuX2xpc3R9PlxyXG4gICAgICAgICAgICDrqqnroZ3snLzroZwg64+M7JWE6rCA6riwXHJcbiAgICAgICAgICAgIDxJbWFnZSBzcmM9e2JhY2t9IC8+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L0xpbms+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICB7aXNNb2RhbE9wZW4gJiYgPEVkaXREZWxldGVNb2RhbCBvbkVkaXQ9e2hhbmRsZUVkaXRDbGlja30gLz59XHJcbiAgICA8Lz5cclxuICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJzdHlsZXMiLCJJbWFnZSIsIkxpbmsiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkVkaXREZWxldGVNb2RhbCIsInNlbGVjdCIsInVzZXIiLCJsaWtlX2J1dHRvbiIsImJhY2siLCJlbXB0eSIsInVzZVJvdXRlciIsIkJvYXJkIiwicm91dGVyIiwiaWQiLCJxdWVyeSIsImFydGljbGUiLCJzZXRBcnRpY2xlIiwiY29tbWVudCIsInNldENvbW1lbnQiLCJpc01vZGFsT3BlbiIsInNldElzTW9kYWxPcGVuIiwiZmV0Y2hBcnRpY2xlIiwiZGF0YSIsImZldGNoQXBpIiwiZXJyb3IiLCJjb25zb2xlIiwidG9nZ2xlTW9kYWwiLCJwcmV2IiwiaGFuZGxlRWRpdENsaWNrIiwiUm91dGVyIiwicHVzaCIsImRpdiIsImNsYXNzTmFtZSIsImRldGFpbF9jb250ZW50X2NvbnRhaW5lciIsImRldGFpbF90aXRsZSIsImgzIiwidGl0bGUiLCJzcmMiLCJvbkNsaWNrIiwiZGV0YWlsX3VzZXJfc3RhdHMiLCJ1c2VyX2ltZyIsImg0Iiwibmlja25hbWUiLCJjcmVhdGVfYXQiLCJsaW5lIiwicG9zdF9jb250ZW50IiwicCIsImNvbnRlbnQiLCJjb21tZW50X3JlZ2lzdGVyX2NvbnRhaW5lciIsInRleHRhcmVhIiwicGxhY2Vob2xkZXIiLCJjb21tZW50X3RleHRhcmVhIiwiYnV0dGlvbl9jb250YWluZXIiLCJidXR0b24iLCJyZWdpc3Rlcl9idXR0aW9uIiwiY29tbWVudF9jb250YWluZXIiLCJjb21tZW50X3RpdGxlIiwiY29tbWVudF91c2VyX3N0YXRzX2NvbnRlbnQiLCJoNSIsInJldHVybl9idXR0b25fY29udGFpbmVyIiwiaHJlZiIsImxpbmtfYnV0dG9uIiwicmV0dXJuX2xpc3QiLCJvbkVkaXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/board/[id].js\n"));

/***/ })

});