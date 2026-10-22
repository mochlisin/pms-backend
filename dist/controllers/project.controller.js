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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.list = list;
exports.getById = getById;
exports.update = update;
exports.remove = remove;
const zod_1 = require("zod");
const service = __importStar(require("../services/project.service"));
const bodySchema = zod_1.z.object({ name: zod_1.z.string().min(1), description: zod_1.z.string().optional() });
async function create(req, res, next) {
    try {
        const data = bodySchema.parse(req.body);
        res.status(201).json(await service.create({ ...data, ownerId: req.user.id }));
    }
    catch (e) {
        next(e);
    }
}
async function list(_req, res, next) {
    try {
        res.json(await service.list());
    }
    catch (e) {
        next(e);
    }
}
async function getById(req, res, next) {
    try {
        res.json(await service.getById(req.params.id));
    }
    catch (e) {
        next(e);
    }
}
async function update(req, res, next) {
    try {
        res.json(await service.update(req.params.id, bodySchema.partial().parse(req.body)));
    }
    catch (e) {
        next(e);
    }
}
async function remove(req, res, next) {
    try {
        await service.remove(req.params.id);
        res.status(204).send();
    }
    catch (e) {
        next(e);
    }
}
