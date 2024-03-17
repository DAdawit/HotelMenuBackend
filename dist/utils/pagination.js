"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
function paginate(queryBuilder, { page, pageSize }) {
    return __awaiter(this, void 0, void 0, function* () {
        const total = yield queryBuilder.getCount();
        const totalPages = Math.ceil(total / pageSize);
        const data = yield queryBuilder
            .offset((page - 1) * pageSize)
            .limit(pageSize)
            .getMany();
        return {
            data,
            total,
            totalPages,
            currentPage: page,
            pageSize,
        };
    });
}
exports.paginate = paginate;
