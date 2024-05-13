/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/styles.scss?");

/***/ }),

/***/ "./src/Stores/API/API.ts":
/*!*******************************!*\
  !*** ./src/Stores/API/API.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Users_1 = __importDefault(__webpack_require__(/*! ../../components/Users/Users */ \"./src/components/Users/Users.ts\"));\nconst app_1 = __importDefault(__webpack_require__(/*! ../../app */ \"./src/app.ts\"));\nconst MyMessage_1 = __importDefault(__webpack_require__(/*! ../../components/Chat/Messages/MyMessage */ \"./src/components/Chat/Messages/MyMessage.ts\"));\nconst UserMessage_1 = __importDefault(__webpack_require__(/*! ../../components/Chat/Messages/UserMessage */ \"./src/components/Chat/Messages/UserMessage.ts\"));\nconst UserState_1 = __importDefault(__webpack_require__(/*! ../UserState/UserState */ \"./src/Stores/UserState/UserState.ts\"));\nconst ModalDisconnect_1 = __importDefault(__webpack_require__(/*! ../../pages/Login/Modal/ModalDisconnect */ \"./src/pages/Login/Modal/ModalDisconnect.ts\"));\nclass API {\n    constructor() {\n        this.socket = new WebSocket('ws://localhost:4000');\n        this.id = Date.now().toString();\n    }\n    connect() {\n        const modal = document.querySelector('.modal_disconnect');\n        this.socket.onopen = () => {\n            modal === null || modal === void 0 ? void 0 : modal.remove();\n        };\n        this.socket.onclose = () => {\n            if (!document.querySelector('.modal_disconnect')) {\n                new ModalDisconnect_1.default('modal_disconnect', document.body);\n            }\n            this.reconnect();\n        };\n        this.socket.onmessage = (event) => {\n            const data = JSON.parse(event.data);\n            switch (data.type) {\n                case 'USER_LOGIN':\n                    break;\n                case 'USER_EXTERNAL_LOGIN':\n                    Users_1.default.updateUsers();\n                    this.getAllUsers();\n                    break;\n                case 'USER_ACTIVE':\n                    Users_1.default.renderOnlineUsers(data);\n                    break;\n                case 'USER_INACTIVE':\n                    Users_1.default.renderOfflineUsers(data);\n                    break;\n                case 'USER_LOGOUT':\n                    break;\n                case 'USER_EXTERNAL_LOGOUT':\n                    Users_1.default.updateUsers();\n                    this.getAllUsers();\n                    break;\n                case 'MSG_SEND':\n                    this.getStatusOfSendedMessage(data);\n                    break;\n                case 'MSG_FROM_USER':\n                    this.renderMessageHistory(data);\n                    break;\n                case 'ERROR':\n                    if (data.payload.error === 'a user with this login is already authorized') {\n                        const main = document.querySelector('.main');\n                        main === null || main === void 0 ? void 0 : main.remove();\n                        app_1.default.renderLoginModalUser();\n                    }\n                    if (data.payload.error === 'incorrect password') {\n                        const main = document.querySelector('.main');\n                        main === null || main === void 0 ? void 0 : main.remove();\n                        app_1.default.renderLoginModalPassword();\n                    }\n                    break;\n                default:\n                    break;\n            }\n        };\n    }\n    reconnect() {\n        return __awaiter(this, void 0, void 0, function* () {\n            this.socket = new WebSocket('ws://localhost:4000');\n            this.connect();\n        });\n    }\n    userAuth(name, password) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const requestData = {\n                id: this.id,\n                type: 'USER_LOGIN',\n                payload: {\n                    user: {\n                        login: name,\n                        password: password,\n                    },\n                },\n            };\n            this.socket.send(JSON.stringify(requestData));\n        });\n    }\n    getAllUsers() {\n        return __awaiter(this, void 0, void 0, function* () {\n            this.getUnauthUsers();\n            this.getAuthUsers();\n        });\n    }\n    getAuthUsers() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const requestData = {\n                id: this.id,\n                type: 'USER_ACTIVE',\n                payload: null,\n            };\n            this.socket.send(JSON.stringify(requestData));\n        });\n    }\n    getUnauthUsers() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const requestData = {\n                id: this.id,\n                type: 'USER_INACTIVE',\n                payload: null,\n            };\n            this.socket.send(JSON.stringify(requestData));\n        });\n    }\n    userLogout() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const requestData = {\n                id: this.id,\n                type: 'USER_LOGOUT',\n                payload: {\n                    user: {\n                        login: UserState_1.default.getNameData(),\n                        password: UserState_1.default.getPasswordData(),\n                    },\n                },\n            };\n            this.socket.send(JSON.stringify(requestData));\n        });\n    }\n    sendMessageToUser(username, inputText) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const requestData = {\n                id: this.id,\n                type: 'MSG_SEND',\n                payload: {\n                    message: {\n                        to: username,\n                        text: inputText,\n                    },\n                },\n            };\n            this.socket.send(JSON.stringify(requestData));\n        });\n    }\n    getStatusOfSendedMessage(data) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (data.id === this.id) {\n                const parseDate = new Date(data.payload.message.datetime);\n                const myMessage = new MyMessage_1.default('chat__my_message', parseDate.toLocaleString(), data.payload.message.text, 'send');\n                myMessage.render(document.querySelector('.chat__select_user'));\n                myMessage.element.scrollIntoView();\n            }\n            if (data.id === null &&\n                data.payload.message.to === UserState_1.default.getNameData() &&\n                data.payload.message.from === UserState_1.default.getSelectedUser()) {\n                const parseDate = new Date(data.payload.message.datetime);\n                const myMessage = new UserMessage_1.default('chat__user_message', parseDate.toLocaleString(), data.payload.message.text);\n                myMessage.render(document.querySelector('.chat__select_user'));\n                myMessage.element.scrollIntoView();\n            }\n        });\n    }\n    getMessageHistory(username) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const requestData = {\n                id: this.id,\n                type: 'MSG_FROM_USER',\n                payload: {\n                    user: {\n                        login: username,\n                    },\n                },\n            };\n            this.socket.send(JSON.stringify(requestData));\n        });\n    }\n    renderMessageHistory(data) {\n        for (let i = 0; i < data.payload.messages.length; i += 1) {\n            // @ts-expect-error Cant solve never type error\n            if (data.payload.messages[i].from === UserState_1.default.getNameData()) {\n                // @ts-expect-error Cant solve never type error\n                const parseDate = new Date(data.payload.messages[i].datetime);\n                const myMessage = new MyMessage_1.default('chat__my_message', parseDate.toLocaleString(), \n                // @ts-expect-error Cant solve never type error\n                data.payload.messages[i].text, 'send');\n                myMessage.render(document.querySelector('.chat__select_user'));\n                myMessage.element.scrollIntoView();\n            }\n            // @ts-expect-error Cant solve never type error\n            if (data.payload.messages[i].from === UserState_1.default.getSelectedUser()) {\n                // @ts-expect-error Cant solve never type error\n                const parseDate = new Date(data.payload.messages[i].datetime);\n                const myMessage = new UserMessage_1.default('chat__user_message', parseDate.toLocaleString(), \n                // @ts-expect-error Cant solve never type error\n                data.payload.messages[i].text);\n                myMessage.render(document.querySelector('.chat__select_user'));\n                myMessage.element.scrollIntoView();\n            }\n        }\n    }\n}\nconst api = new API();\nexports[\"default\"] = api;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/Stores/API/API.ts?");

/***/ }),

/***/ "./src/Stores/UserState/UserState.ts":
/*!*******************************************!*\
  !*** ./src/Stores/UserState/UserState.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass UserState {\n    saveLoginData() {\n        const nameData = document.querySelector('.login__input-name');\n        const passwordData = document.querySelector('.login__input-password');\n        sessionStorage.setItem('name', nameData.value);\n        sessionStorage.setItem('password', passwordData.value);\n    }\n    getNameData() {\n        return sessionStorage.getItem('name');\n    }\n    getPasswordData() {\n        return sessionStorage.getItem('password');\n    }\n    getSelectedUser() {\n        return sessionStorage.getItem('nickname');\n    }\n    isAuth() {\n        if (sessionStorage.getItem('name') && sessionStorage.getItem('password')) {\n            return true;\n        }\n        return false;\n    }\n}\nconst userState = new UserState();\nexports[\"default\"] = userState;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/Stores/UserState/UserState.ts?");

/***/ }),

/***/ "./src/UI-components/Button/Button.ts":
/*!********************************************!*\
  !*** ./src/UI-components/Button/Button.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Button {\n    constructor(title, className, parentElement) {\n        this.element = document.createElement('button');\n        this.element.classList.add(className);\n        this.element.innerText = title;\n        this.render(parentElement);\n    }\n    render(parentElement) {\n        parentElement.append(this.element);\n    }\n    addListener(callback) {\n        this.element.addEventListener('click', callback);\n    }\n}\nexports[\"default\"] = Button;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/UI-components/Button/Button.ts?");

/***/ }),

/***/ "./src/UI-components/Input/Input.ts":
/*!******************************************!*\
  !*** ./src/UI-components/Input/Input.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Input {\n    constructor(placeholder, className, parentElement) {\n        this.element = document.createElement('input');\n        this.element.classList.add(className);\n        this.element.setAttribute('type', 'text');\n        this.element.setAttribute('placeholder', placeholder);\n        this.render(parentElement);\n    }\n    isValidLength(minLength, maxLength) {\n        if (this.element.value.length > minLength && this.element.value.length <= maxLength) {\n            return true;\n        }\n        return false;\n    }\n    isFirstLetterBig() {\n        if (this.element.value[0] === this.element.value[0].toUpperCase()) {\n            return true;\n        }\n        return false;\n    }\n    addListener(callback) {\n        this.element.addEventListener('input', callback);\n    }\n    render(parentElement) {\n        parentElement.append(this.element);\n    }\n}\nexports[\"default\"] = Input;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/UI-components/Input/Input.ts?");

/***/ }),

/***/ "./src/UI-components/Label/Label.ts":
/*!******************************************!*\
  !*** ./src/UI-components/Label/Label.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Label {\n    constructor(title, className, parentElement) {\n        this.element = document.createElement('label');\n        this.element.classList.add(className);\n        this.element.innerText = title;\n        this.render(parentElement);\n    }\n    render(parentElement) {\n        parentElement.append(this.element);\n    }\n}\nexports[\"default\"] = Label;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/UI-components/Label/Label.ts?");

/***/ }),

/***/ "./src/UI-components/Span/Span.ts":
/*!****************************************!*\
  !*** ./src/UI-components/Span/Span.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Span {\n    constructor(title, className, parentElement) {\n        this.element = document.createElement('span');\n        this.element.classList.add(className);\n        this.element.innerText = title;\n        this.render(parentElement);\n    }\n    render(parentElement) {\n        parentElement.append(this.element);\n    }\n    addListener(callback) {\n        this.element.addEventListener('click', callback);\n    }\n}\nexports[\"default\"] = Span;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/UI-components/Span/Span.ts?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Login_1 = __importDefault(__webpack_require__(/*! ./pages/Login/Login */ \"./src/pages/Login/Login.ts\"));\nconst About_1 = __importDefault(__webpack_require__(/*! ./pages/About/About */ \"./src/pages/About/About.ts\"));\nconst ModalUser_1 = __importDefault(__webpack_require__(/*! ./pages/Login/Modal/ModalUser */ \"./src/pages/Login/Modal/ModalUser.ts\"));\nconst ModalPassword_1 = __importDefault(__webpack_require__(/*! ./pages/Login/Modal/ModalPassword */ \"./src/pages/Login/Modal/ModalPassword.ts\"));\nconst Main_1 = __importDefault(__webpack_require__(/*! ./pages/Main/Main */ \"./src/pages/Main/Main.ts\"));\nconst API_1 = __importDefault(__webpack_require__(/*! ./Stores/API/API */ \"./src/Stores/API/API.ts\"));\nconst UserState_1 = __importDefault(__webpack_require__(/*! ./Stores/UserState/UserState */ \"./src/Stores/UserState/UserState.ts\"));\nconst API_2 = __importDefault(__webpack_require__(/*! ./Stores/API/API */ \"./src/Stores/API/API.ts\"));\nclass App {\n    constructor() {\n        this.element = document.createElement('div');\n        this.element.classList.add('app');\n        document.body.append(this.element);\n    }\n    renderLogin() {\n        new Login_1.default('login', this.element);\n    }\n    renderLoginModalUser() {\n        new ModalUser_1.default('login__modal', this.element);\n    }\n    renderLoginModalPassword() {\n        new ModalPassword_1.default('login__modal', this.element);\n    }\n    renderAbout() {\n        new About_1.default('about', this.element);\n    }\n    renderMain() {\n        new Main_1.default('main', this.element);\n    }\n    render() {\n        API_1.default.connect();\n        setTimeout(() => {\n            this.refreshRender();\n        }, 100);\n    }\n    refreshRender() {\n        if (UserState_1.default.isAuth()) {\n            const loginData = UserState_1.default.getNameData();\n            const passwordData = UserState_1.default.getPasswordData();\n            if (loginData !== null && passwordData !== null) {\n                API_2.default.userAuth(loginData, passwordData);\n                setTimeout(() => {\n                    API_2.default.getAllUsers();\n                }, 1);\n            }\n            this.renderMain();\n        }\n        else {\n            this.renderLogin();\n        }\n    }\n}\nconst app = new App();\nexports[\"default\"] = app;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/app.ts?");

/***/ }),

/***/ "./src/components/Chat/BottomPanel/BottomPanel.ts":
/*!********************************************************!*\
  !*** ./src/components/Chat/BottomPanel/BottomPanel.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Button_1 = __importDefault(__webpack_require__(/*! ../../../UI-components/Button/Button */ \"./src/UI-components/Button/Button.ts\"));\nconst Input_1 = __importDefault(__webpack_require__(/*! ../../../UI-components/Input/Input */ \"./src/UI-components/Input/Input.ts\"));\nconst API_1 = __importDefault(__webpack_require__(/*! ../../../Stores/API/API */ \"./src/Stores/API/API.ts\"));\nconst UserState_1 = __importDefault(__webpack_require__(/*! ../../../Stores/UserState/UserState */ \"./src/Stores/UserState/UserState.ts\"));\nconst constants_1 = __webpack_require__(/*! ../../../components/constants */ \"./src/components/constants.ts\");\nclass BottomPanel {\n    constructor(className, parentElement) {\n        this.element = document.createElement('div');\n        this.element.classList.add(className);\n        this.render(parentElement);\n    }\n    render(parentElement) {\n        new Input_1.default(constants_1.strings.bottomPanel.inputMessage, 'chat__input_message', this.element);\n        const sendButton = new Button_1.default(constants_1.strings.bottomPanel.sendBtn, 'chat__send_btn', this.element);\n        sendButton.addListener(() => {\n            const input = document.querySelector('.chat__input_message');\n            if (input.value !== '' && UserState_1.default.getSelectedUser() !== null) {\n                API_1.default.sendMessageToUser(UserState_1.default.getSelectedUser(), input.value);\n            }\n            input.value = '';\n        });\n        parentElement.append(this.element);\n    }\n}\nexports[\"default\"] = BottomPanel;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/components/Chat/BottomPanel/BottomPanel.ts?");

/***/ }),

/***/ "./src/components/Chat/Chat.ts":
/*!*************************************!*\
  !*** ./src/components/Chat/Chat.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst StartScreen_1 = __importDefault(__webpack_require__(/*! ./StartScreen/StartScreen */ \"./src/components/Chat/StartScreen/StartScreen.ts\"));\nconst BottomPanel_1 = __importDefault(__webpack_require__(/*! ./BottomPanel/BottomPanel */ \"./src/components/Chat/BottomPanel/BottomPanel.ts\"));\nclass Chat {\n    constructor(className, parentElement) {\n        this.element = document.createElement('div');\n        this.element.classList.add(className);\n        this.render(parentElement);\n    }\n    render(parentElement) {\n        new StartScreen_1.default('chat__start_screen', this.element);\n        new BottomPanel_1.default('chat__bottom_panel', this.element);\n        parentElement.append(this.element);\n    }\n}\nexports[\"default\"] = Chat;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/components/Chat/Chat.ts?");

/***/ }),

/***/ "./src/components/Chat/Messages/MyMessage.ts":
/*!***************************************************!*\
  !*** ./src/components/Chat/Messages/MyMessage.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Span_1 = __importDefault(__webpack_require__(/*! ../../../UI-components/Span/Span */ \"./src/UI-components/Span/Span.ts\"));\nclass MyMessage {\n    constructor(className, dateTime, message, messageStatus) {\n        this.element = document.createElement('div');\n        this.element.classList.add(className);\n        this.you = 'Вы';\n        this.dateTime = dateTime;\n        this.message = message;\n        this.messageStatus = messageStatus;\n    }\n    render(parentElement) {\n        const innerDiv = document.createElement('div');\n        innerDiv.classList.add('chat__topLine');\n        new Span_1.default(this.you, 'chat__you', innerDiv);\n        new Span_1.default(this.dateTime, 'chat__client_dateTime', innerDiv);\n        this.element.append(innerDiv);\n        new Span_1.default(this.message, 'chat__client_message', this.element);\n        new Span_1.default(this.messageStatus, 'chat__client_message_status', this.element);\n        parentElement.append(this.element);\n    }\n}\nexports[\"default\"] = MyMessage;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/components/Chat/Messages/MyMessage.ts?");

/***/ }),

/***/ "./src/components/Chat/Messages/UserMessage.ts":
/*!*****************************************************!*\
  !*** ./src/components/Chat/Messages/UserMessage.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Span_1 = __importDefault(__webpack_require__(/*! ../../../UI-components/Span/Span */ \"./src/UI-components/Span/Span.ts\"));\nclass UserMessage {\n    constructor(className, dateTime, message) {\n        this.element = document.createElement('div');\n        this.element.classList.add(className);\n        this.you = sessionStorage.getItem('name');\n        this.dateTime = dateTime;\n        this.message = message;\n    }\n    render(parentElement) {\n        const innerDiv = document.createElement('div');\n        innerDiv.classList.add('chat__topLine');\n        new Span_1.default(this.you, 'chat__you', innerDiv);\n        new Span_1.default(this.dateTime, 'chat__user_dateTime', innerDiv);\n        this.element.append(innerDiv);\n        new Span_1.default(this.message, 'chat__users_message', this.element);\n        parentElement.append(this.element);\n    }\n}\nexports[\"default\"] = UserMessage;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/components/Chat/Messages/UserMessage.ts?");

/***/ }),

/***/ "./src/components/Chat/SelectUser/SelectUser.ts":
/*!******************************************************!*\
  !*** ./src/components/Chat/SelectUser/SelectUser.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass SelectUser {\n    constructor(className, parentElement) {\n        this.element = document.createElement('div');\n        this.element.classList.add(className);\n        this.render(parentElement);\n    }\n    render(parentElement) {\n        parentElement.prepend(this.element);\n    }\n}\nexports[\"default\"] = SelectUser;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/components/Chat/SelectUser/SelectUser.ts?");

/***/ }),

/***/ "./src/components/Chat/SelectUser/UserInfo.ts":
/*!****************************************************!*\
  !*** ./src/components/Chat/SelectUser/UserInfo.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Span_1 = __importDefault(__webpack_require__(/*! ../../../UI-components/Span/Span */ \"./src/UI-components/Span/Span.ts\"));\nclass UserInfo {\n    constructor(userName, status, className) {\n        this.element = document.createElement('div');\n        this.element.classList.add(className);\n        this.userName = userName;\n        this.status = status;\n    }\n    render(parentElement) {\n        new Span_1.default(this.userName, 'chat__user_info', this.element);\n        new Span_1.default(this.status, 'chat__user_status', this.element);\n        parentElement === null || parentElement === void 0 ? void 0 : parentElement.append(this.element);\n    }\n}\nexports[\"default\"] = UserInfo;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/components/Chat/SelectUser/UserInfo.ts?");

/***/ }),

/***/ "./src/components/Chat/StartScreen/StartScreen.ts":
/*!********************************************************!*\
  !*** ./src/components/Chat/StartScreen/StartScreen.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Span_1 = __importDefault(__webpack_require__(/*! ../../../UI-components/Span/Span */ \"./src/UI-components/Span/Span.ts\"));\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/components/constants.ts\");\nclass StartScreen {\n    constructor(className, parentElement) {\n        this.element = document.createElement('div');\n        this.element.classList.add(className);\n        this.render(parentElement);\n    }\n    render(parentElement) {\n        new Span_1.default(constants_1.strings.startScreen.description, 'chat__description', this.element);\n        parentElement.append(this.element);\n    }\n}\nexports[\"default\"] = StartScreen;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/components/Chat/StartScreen/StartScreen.ts?");

/***/ }),

/***/ "./src/components/Users/Users.ts":
/*!***************************************!*\
  !*** ./src/components/Users/Users.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Input_1 = __importDefault(__webpack_require__(/*! ../../UI-components/Input/Input */ \"./src/UI-components/Input/Input.ts\"));\nconst Span_1 = __importDefault(__webpack_require__(/*! ../../UI-components/Span/Span */ \"./src/UI-components/Span/Span.ts\"));\nconst UserInfo_1 = __importDefault(__webpack_require__(/*! ../Chat/SelectUser/UserInfo */ \"./src/components/Chat/SelectUser/UserInfo.ts\"));\nconst SelectUser_1 = __importDefault(__webpack_require__(/*! ../Chat/SelectUser/SelectUser */ \"./src/components/Chat/SelectUser/SelectUser.ts\"));\nconst API_1 = __importDefault(__webpack_require__(/*! ../../Stores/API/API */ \"./src/Stores/API/API.ts\"));\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/components/constants.ts\");\nclass Users {\n    constructor(className) {\n        this.element = document.createElement('div');\n        this.element.classList.add(className);\n        this.onlineUsers = document.createElement('div');\n        this.onlineUsers.classList.add('users__online');\n        this.offlineUsers = document.createElement('div');\n        this.offlineUsers.classList.add('users__offline');\n    }\n    render(parentElement) {\n        new Input_1.default(constants_1.strings.users.inputSearch, 'users__input_search', this.element);\n        this.element.append(this.onlineUsers, this.offlineUsers);\n        parentElement.append(this.element);\n    }\n    removes() {\n        while (this.element.firstChild) {\n            this.element.removeChild(this.element.firstChild);\n        }\n        while (this.onlineUsers.firstChild) {\n            this.onlineUsers.removeChild(this.onlineUsers.firstChild);\n        }\n        while (this.offlineUsers.firstChild) {\n            this.offlineUsers.removeChild(this.offlineUsers.firstChild);\n        }\n    }\n    renderOnlineUsers(data) {\n        for (let i = 0; i < data.payload.users.length; i += 1) {\n            if (sessionStorage.getItem('name') === data.payload.users[i].login) {\n                continue;\n            }\n            this.chatWithOnline(data.payload.users[i].login);\n        }\n    }\n    renderOfflineUsers(data) {\n        for (let i = 0; i < data.payload.users.length; i += 1) {\n            if (sessionStorage.getItem('name') === data.payload.users[i].login) {\n                continue;\n            }\n            this.chatWithOffline(data.payload.users[i].login);\n        }\n    }\n    renderUser(userName, isActive) {\n        if (isActive) {\n            new Span_1.default(userName, 'users__user_online', this.onlineUsers);\n        }\n        else {\n            new Span_1.default(userName, 'users__user_offline', this.offlineUsers);\n        }\n    }\n    updateUsers() {\n        while (this.onlineUsers.firstChild) {\n            this.onlineUsers.removeChild(this.onlineUsers.firstChild);\n        }\n        while (this.offlineUsers.firstChild) {\n            this.offlineUsers.removeChild(this.offlineUsers.firstChild);\n        }\n    }\n    chatWithOnline(data) {\n        const userName = new Span_1.default(data, 'users__user_online', this.onlineUsers);\n        userName.addListener(() => {\n            sessionStorage.setItem('nickname', data);\n            const startScreen = document.querySelector('.chat__start_screen');\n            const selectUser = document.querySelector('.chat__select_user');\n            const chat = document.querySelector('.chat');\n            if (startScreen) {\n                startScreen.remove();\n            }\n            if (selectUser) {\n                selectUser.remove();\n            }\n            new SelectUser_1.default('chat__select_user', chat);\n            const userInfo = new UserInfo_1.default(data, constants_1.strings.users.userInfoOnline, 'users__user_status');\n            userInfo.render(document.querySelector('.chat__select_user'));\n            API_1.default.getMessageHistory(sessionStorage.getItem('nickname'));\n        });\n    }\n    chatWithOffline(data) {\n        sessionStorage.setItem('nickname', data);\n        const userName = new Span_1.default(data, 'users__user_offline', this.offlineUsers);\n        userName.addListener(() => {\n            const startScreen = document.querySelector('.chat__start_screen');\n            const selectUser = document.querySelector('.chat__select_user');\n            const chat = document.querySelector('.chat');\n            if (startScreen) {\n                startScreen.remove();\n            }\n            if (selectUser) {\n                selectUser.remove();\n            }\n            new SelectUser_1.default('chat__select_user', chat);\n            const userInfo = new UserInfo_1.default(data, constants_1.strings.users.userInfoOffline, 'users__user_status');\n            userInfo.render(document.querySelector('.chat__select_user'));\n        });\n    }\n}\nconst users = new Users('users');\nexports[\"default\"] = users;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/components/Users/Users.ts?");

/***/ }),

/***/ "./src/components/constants.ts":
/*!*************************************!*\
  !*** ./src/components/constants.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.strings = void 0;\nexports.strings = {\n    footer: {\n        school: 'RS School',\n        author: 'Hanunagrez',\n    },\n    header: {\n        client: 'Пользователь:',\n        title: 'Весёлый чат',\n        aboutBtn: 'Инфо',\n        logoutBtn: 'Выйти',\n    },\n    login: {\n        loginBtn: 'Войти в приложение',\n        infoBtn: 'Инфо',\n    },\n    modalUser: {\n        title: 'Пользователь с таким логином уже зарегистрирован в системе!',\n        returnBtn: 'Назад',\n    },\n    modalPassword: {\n        title: 'Неверный пароль!',\n        modalBtn: 'Назад',\n    },\n    modalDisconnect: {\n        title: 'Соединение с сервером разорвано, ожидайте...',\n    },\n    loginForm: {\n        labelName: 'Имя',\n        inputName: 'Введите имя',\n        spanName: 'Имя должно быть от 4 до 10 символов',\n        labelPassword: 'Пароль',\n        inputPassword: 'Введите пароль',\n        spanPassword: 'Пароль должен начинаться с большой буквы или цифры и быть от 5 до 10 символов',\n    },\n    about: {\n        title: 'Весёлый чат',\n        description: 'Данное приложение сделано в рамках задания RS School',\n        returnBtn: 'Назад',\n    },\n    users: {\n        inputSearch: 'Поиск',\n        userInfoOnline: 'В сети',\n        userInfoOffline: 'Не в сети',\n    },\n    startScreen: {\n        description: 'Выберите собеседника для начала общения',\n    },\n    bottomPanel: {\n        sendBtn: 'Отправить',\n        inputMessage: 'Начните писать здесь...',\n    },\n};\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/components/constants.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__webpack_require__(/*! ./styles.scss */ \"./src/styles.scss\");\nconst app_1 = __importDefault(__webpack_require__(/*! ./app */ \"./src/app.ts\"));\napp_1.default.render();\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/index.ts?");

/***/ }),

/***/ "./src/pages/About/About.ts":
/*!**********************************!*\
  !*** ./src/pages/About/About.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Span_1 = __importDefault(__webpack_require__(/*! ../../UI-components/Span/Span */ \"./src/UI-components/Span/Span.ts\"));\nconst Button_1 = __importDefault(__webpack_require__(/*! ../../UI-components/Button/Button */ \"./src/UI-components/Button/Button.ts\"));\nconst app_1 = __importDefault(__webpack_require__(/*! ../../app */ \"./src/app.ts\"));\nconst constants_1 = __webpack_require__(/*! ../../components/constants */ \"./src/components/constants.ts\");\nclass About {\n    constructor(className, parentElement) {\n        this.element = document.createElement('div');\n        this.element.classList.add(className);\n        this.render(parentElement);\n    }\n    render(parentElement) {\n        new Span_1.default(constants_1.strings.about.title, 'about__title', this.element);\n        new Span_1.default(constants_1.strings.about.description, 'about__description', this.element);\n        const author = document.createElement('a');\n        author.classList.add('about__author');\n        author.href = 'https://github.com/hanunagrez';\n        author.innerText = 'hanunagrez';\n        author.target = '_blank';\n        const returnBtn = new Button_1.default(constants_1.strings.about.returnBtn, 'about__return_btn', this.element);\n        returnBtn.addListener(() => {\n            this.element.remove();\n            app_1.default.renderLogin();\n        });\n        this.element.append(author);\n        parentElement.append(this.element);\n    }\n}\nexports[\"default\"] = About;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/pages/About/About.ts?");

/***/ }),

/***/ "./src/pages/Login/Login.ts":
/*!**********************************!*\
  !*** ./src/pages/Login/Login.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Button_1 = __importDefault(__webpack_require__(/*! ../../UI-components/Button/Button */ \"./src/UI-components/Button/Button.ts\"));\nconst LoginForm_1 = __importDefault(__webpack_require__(/*! ./LoginForm/LoginForm */ \"./src/pages/Login/LoginForm/LoginForm.ts\"));\nconst app_1 = __importDefault(__webpack_require__(/*! ../../app */ \"./src/app.ts\"));\nconst UserState_1 = __importDefault(__webpack_require__(/*! ../../Stores/UserState/UserState */ \"./src/Stores/UserState/UserState.ts\"));\nconst API_1 = __importDefault(__webpack_require__(/*! ../../Stores/API/API */ \"./src/Stores/API/API.ts\"));\nconst Users_1 = __importDefault(__webpack_require__(/*! ../../components/Users/Users */ \"./src/components/Users/Users.ts\"));\nconst constants_1 = __webpack_require__(/*! ../../components/constants */ \"./src/components/constants.ts\");\nclass Login {\n    constructor(className, parentElement) {\n        this.element = document.createElement('div');\n        this.element.classList.add(className);\n        this.render(parentElement);\n    }\n    render(parentElement) {\n        const loginForm = new LoginForm_1.default('login__form');\n        loginForm.render(this.element);\n        const loginBtn = new Button_1.default(constants_1.strings.login.loginBtn, 'login__login_btn', this.element);\n        loginBtn.element.setAttribute('disabled', 'true');\n        loginBtn.addListener(() => {\n            UserState_1.default.saveLoginData();\n            Users_1.default.removes();\n            API_1.default.getAllUsers();\n            API_1.default.userAuth(loginForm.getNameData(), loginForm.getPasswordData());\n            this.element.remove();\n            app_1.default.renderMain();\n        });\n        const infoBtn = new Button_1.default(constants_1.strings.login.infoBtn, 'login__info_btn', this.element);\n        infoBtn.addListener(() => {\n            this.element.remove();\n            app_1.default.renderAbout();\n        });\n        parentElement.append(this.element);\n    }\n}\nexports[\"default\"] = Login;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/pages/Login/Login.ts?");

/***/ }),

/***/ "./src/pages/Login/LoginForm/LoginForm.ts":
/*!************************************************!*\
  !*** ./src/pages/Login/LoginForm/LoginForm.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Label_1 = __importDefault(__webpack_require__(/*! ../../../UI-components/Label/Label */ \"./src/UI-components/Label/Label.ts\"));\nconst Input_1 = __importDefault(__webpack_require__(/*! ../../../UI-components/Input/Input */ \"./src/UI-components/Input/Input.ts\"));\nconst Span_1 = __importDefault(__webpack_require__(/*! ../../../UI-components/Span/Span */ \"./src/UI-components/Span/Span.ts\"));\nconst constants_1 = __webpack_require__(/*! ../../../components/constants */ \"./src/components/constants.ts\");\nclass LoginForm {\n    constructor(className) {\n        this.element = document.createElement('div');\n        this.element.classList.add(className);\n    }\n    render(parentElement) {\n        const labelName = new Label_1.default(constants_1.strings.loginForm.labelName, 'login__label-name', this.element);\n        const inputName = new Input_1.default(constants_1.strings.loginForm.inputName, 'login__input-name', labelName.element);\n        const spanName = new Span_1.default(constants_1.strings.loginForm.spanName, 'login__span-name', this.element);\n        const labelPassword = new Label_1.default(constants_1.strings.loginForm.labelPassword, 'login__label-password', this.element);\n        const inputPassword = new Input_1.default(constants_1.strings.loginForm.inputPassword, 'login__input-password', labelPassword.element);\n        const spanPassword = new Span_1.default(constants_1.strings.loginForm.spanPassword, 'login__span-password', this.element);\n        inputName.addListener(() => {\n            const loginBtn = document.querySelector('.login__login_btn');\n            if (inputName.isValidLength(3, 10)) {\n                inputName.element.style.borderColor = 'green';\n                spanName.element.style.visibility = 'hidden';\n                if (inputPassword.isValidLength(4, 10) && inputPassword.isFirstLetterBig()) {\n                    loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.removeAttribute('disabled');\n                }\n            }\n            else {\n                loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.setAttribute('disabled', 'true');\n                inputName.element.style.borderColor = 'red';\n                spanName.element.style.visibility = 'visible';\n            }\n        });\n        inputPassword.addListener(() => {\n            const loginBtn = document.querySelector('.login__login_btn');\n            if (inputPassword.isValidLength(4, 10) && inputPassword.isFirstLetterBig()) {\n                inputPassword.element.style.borderColor = 'green';\n                spanPassword.element.style.visibility = 'hidden';\n                if (inputName.isValidLength(3, 10)) {\n                    loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.removeAttribute('disabled');\n                }\n            }\n            else {\n                loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.setAttribute('disabled', 'true');\n                inputPassword.element.style.borderColor = 'red';\n                spanPassword.element.style.visibility = 'visible';\n            }\n        });\n        parentElement.append(this.element);\n    }\n    getNameData() {\n        const inputName = document.querySelector('.login__input-name');\n        return inputName.value;\n    }\n    getPasswordData() {\n        const inputPassword = document.querySelector('.login__input-password');\n        return inputPassword.value;\n    }\n}\nexports[\"default\"] = LoginForm;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/pages/Login/LoginForm/LoginForm.ts?");

/***/ }),

/***/ "./src/pages/Login/Modal/ModalDisconnect.ts":
/*!**************************************************!*\
  !*** ./src/pages/Login/Modal/ModalDisconnect.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Span_1 = __importDefault(__webpack_require__(/*! ../../../UI-components/Span/Span */ \"./src/UI-components/Span/Span.ts\"));\nconst constants_1 = __webpack_require__(/*! ../../../components/constants */ \"./src/components/constants.ts\");\nclass ModalDisconnect {\n    constructor(className, parentElement) {\n        this.element = document.createElement('div');\n        this.element.classList.add(className);\n        this.render(parentElement);\n    }\n    render(parentElement) {\n        new Span_1.default(constants_1.strings.modalDisconnect.title, 'login__modal_span', this.element);\n        parentElement.append(this.element);\n    }\n}\nexports[\"default\"] = ModalDisconnect;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/pages/Login/Modal/ModalDisconnect.ts?");

/***/ }),

/***/ "./src/pages/Login/Modal/ModalPassword.ts":
/*!************************************************!*\
  !*** ./src/pages/Login/Modal/ModalPassword.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Span_1 = __importDefault(__webpack_require__(/*! ../../../UI-components/Span/Span */ \"./src/UI-components/Span/Span.ts\"));\nconst Button_1 = __importDefault(__webpack_require__(/*! ../../../UI-components/Button/Button */ \"./src/UI-components/Button/Button.ts\"));\nconst app_1 = __importDefault(__webpack_require__(/*! ../../../app */ \"./src/app.ts\"));\nconst constants_1 = __webpack_require__(/*! ../../../components/constants */ \"./src/components/constants.ts\");\nclass ModalPassword {\n    constructor(className, parentElement) {\n        this.element = document.createElement('div');\n        this.element.classList.add(className);\n        this.render(parentElement);\n    }\n    render(parentElement) {\n        new Span_1.default(constants_1.strings.modalPassword.title, 'login__modal_span', this.element);\n        const modalBtn = new Button_1.default(constants_1.strings.modalPassword.modalBtn, 'about__return_btn', this.element);\n        modalBtn.addListener(() => {\n            this.element.remove();\n            app_1.default.renderLogin();\n        });\n        parentElement.append(this.element);\n    }\n}\nexports[\"default\"] = ModalPassword;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/pages/Login/Modal/ModalPassword.ts?");

/***/ }),

/***/ "./src/pages/Login/Modal/ModalUser.ts":
/*!********************************************!*\
  !*** ./src/pages/Login/Modal/ModalUser.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Span_1 = __importDefault(__webpack_require__(/*! ../../../UI-components/Span/Span */ \"./src/UI-components/Span/Span.ts\"));\nconst Button_1 = __importDefault(__webpack_require__(/*! ../../../UI-components/Button/Button */ \"./src/UI-components/Button/Button.ts\"));\nconst app_1 = __importDefault(__webpack_require__(/*! ../../../app */ \"./src/app.ts\"));\nconst constants_1 = __webpack_require__(/*! ../../../components/constants */ \"./src/components/constants.ts\");\nclass ModalUser {\n    constructor(className, parentElement) {\n        this.element = document.createElement('div');\n        this.element.classList.add(className);\n        this.render(parentElement);\n    }\n    render(parentElement) {\n        new Span_1.default(constants_1.strings.modalUser.title, 'login__modal_span', this.element);\n        const modalBtn = new Button_1.default(constants_1.strings.modalUser.returnBtn, 'about__return_btn', this.element);\n        modalBtn.addListener(() => {\n            this.element.remove();\n            app_1.default.renderLogin();\n        });\n        parentElement.append(this.element);\n    }\n}\nexports[\"default\"] = ModalUser;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/pages/Login/Modal/ModalUser.ts?");

/***/ }),

/***/ "./src/pages/Main/Footer/Footer.ts":
/*!*****************************************!*\
  !*** ./src/pages/Main/Footer/Footer.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Span_1 = __importDefault(__webpack_require__(/*! ../../../UI-components/Span/Span */ \"./src/UI-components/Span/Span.ts\"));\nconst constants_1 = __webpack_require__(/*! ../../../components/constants */ \"./src/components/constants.ts\");\nclass Footer {\n    constructor(className, parentElement) {\n        this.element = document.createElement('footer');\n        this.element.classList.add(className);\n        this.render(parentElement);\n    }\n    render(parentElement) {\n        new Span_1.default(constants_1.strings.footer.school, 'footer__school', this.element);\n        new Span_1.default(constants_1.strings.footer.author, 'footer__author', this.element);\n        const date = new Date().getFullYear().toString();\n        new Span_1.default(date, 'footer__year', this.element);\n        parentElement.append(this.element);\n    }\n}\nexports[\"default\"] = Footer;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/pages/Main/Footer/Footer.ts?");

/***/ }),

/***/ "./src/pages/Main/Header/Header.ts":
/*!*****************************************!*\
  !*** ./src/pages/Main/Header/Header.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Span_1 = __importDefault(__webpack_require__(/*! ../../../UI-components/Span/Span */ \"./src/UI-components/Span/Span.ts\"));\nconst Button_1 = __importDefault(__webpack_require__(/*! ../../../UI-components/Button/Button */ \"./src/UI-components/Button/Button.ts\"));\nconst app_1 = __importDefault(__webpack_require__(/*! ../../../app */ \"./src/app.ts\"));\nconst UserState_1 = __importDefault(__webpack_require__(/*! ../../../Stores/UserState/UserState */ \"./src/Stores/UserState/UserState.ts\"));\nconst API_1 = __importDefault(__webpack_require__(/*! ../../../Stores/API/API */ \"./src/Stores/API/API.ts\"));\nconst Users_1 = __importDefault(__webpack_require__(/*! ../../../components/Users/Users */ \"./src/components/Users/Users.ts\"));\nconst constants_1 = __webpack_require__(/*! ../../../components/constants */ \"./src/components/constants.ts\");\nclass Header {\n    constructor(className, parentElement) {\n        this.element = document.createElement('header');\n        this.element.classList.add(className);\n        this.render(parentElement);\n    }\n    render(parentElement) {\n        new Span_1.default(constants_1.strings.header.client + ` ${UserState_1.default.getNameData()}`, 'header__client', this.element);\n        new Span_1.default(constants_1.strings.header.title, 'header__title', this.element);\n        const aboutBtn = new Button_1.default(constants_1.strings.header.aboutBtn, 'header__about_btn', this.element);\n        aboutBtn.addListener(() => {\n            const main = document.querySelector('.main');\n            main === null || main === void 0 ? void 0 : main.remove();\n            app_1.default.renderAbout();\n        });\n        const logoutBtn = new Button_1.default(constants_1.strings.header.logoutBtn, 'header__logout_btn', this.element);\n        logoutBtn.addListener(() => {\n            API_1.default.userLogout();\n            const main = document.querySelector('.main');\n            main === null || main === void 0 ? void 0 : main.remove();\n            sessionStorage.clear();\n            app_1.default.renderLogin();\n            Users_1.default.removes();\n        });\n        parentElement.append(this.element);\n    }\n}\nexports[\"default\"] = Header;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/pages/Main/Header/Header.ts?");

/***/ }),

/***/ "./src/pages/Main/Main.ts":
/*!********************************!*\
  !*** ./src/pages/Main/Main.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Header_1 = __importDefault(__webpack_require__(/*! ./Header/Header */ \"./src/pages/Main/Header/Header.ts\"));\nconst Footer_1 = __importDefault(__webpack_require__(/*! ./Footer/Footer */ \"./src/pages/Main/Footer/Footer.ts\"));\nconst Users_1 = __importDefault(__webpack_require__(/*! ../../components/Users/Users */ \"./src/components/Users/Users.ts\"));\nconst Chat_1 = __importDefault(__webpack_require__(/*! ../../components/Chat/Chat */ \"./src/components/Chat/Chat.ts\"));\nclass Main {\n    constructor(className, parentElement) {\n        this.element = document.createElement('div');\n        this.element.classList.add(className);\n        this.render(parentElement);\n    }\n    render(parentElement) {\n        new Header_1.default('header', this.element);\n        Users_1.default.render(this.element);\n        new Chat_1.default('chat', this.element);\n        new Footer_1.default('footer', this.element);\n        parentElement.append(this.element);\n    }\n}\nexports[\"default\"] = Main;\n\n\n//# sourceURL=webpack://hanunagrez-jsfe2023q4/./src/pages/Main/Main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;