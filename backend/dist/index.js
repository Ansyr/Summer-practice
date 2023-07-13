"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const models_1 = require("./models");
const express_1 = __importDefault(require("express"));
const process = __importStar(require("process"));
const router = require("./routes");
const cors = require('cors');
const PORT = 4000 || process.env;
const app = (0, express_1.default)();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, typeorm_1.createConnection)({
            type: "postgres",
            host: "localhost",
            port: 12345,
            username: "postgres",
            password: "1234",
            database: "Bookmail",
            entities: models_1.models,
            synchronize: true
        });
        console.log("Connected to Postgres");
        app.use(cors());
        app.use(express_1.default.json());
        app.use(router);
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    }
    catch (e) {
        console.error("Unable to connect to Postgres");
        throw new Error("Unable to connect to db");
    }
});
main();
//# sourceMappingURL=index.js.map