"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formError = (errors, res) => {
    const errorObj = errors.reduce((acc, curr) => {
        acc[curr.property] =
            curr.constraints && curr.constraints[Object.keys(curr.constraints)[0]];
        return acc;
    }, {});
    res.status(400).json({
        status: "fail",
        message: `Input Invalid : ${errorObj[Object.keys(errorObj)[0]]}`,
    });
};
exports.default = formError;
//# sourceMappingURL=formError.js.map