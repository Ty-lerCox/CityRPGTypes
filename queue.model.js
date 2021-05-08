"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcceptanceType = exports.JobType = void 0;
var JobType;
(function (JobType) {
    JobType[JobType["None"] = 0] = "None";
    JobType[JobType["Robbery"] = 1] = "Robbery";
    JobType[JobType["Crime"] = 2] = "Crime";
})(JobType = exports.JobType || (exports.JobType = {}));
var AcceptanceType;
(function (AcceptanceType) {
    AcceptanceType[AcceptanceType["Anyone"] = 0] = "Anyone";
    AcceptanceType[AcceptanceType["Police"] = 1] = "Police";
})(AcceptanceType = exports.AcceptanceType || (exports.AcceptanceType = {}));
