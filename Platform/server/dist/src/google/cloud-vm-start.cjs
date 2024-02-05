'use strict';
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
exports.main = void 0;
const dotenv = require('dotenv').config({ path: __dirname + '/../../../.env' });
function main(instance, project, zone) {
    return __awaiter(this, void 0, void 0, function* () {
        // Imports the Compute library
        const { InstancesClient } = require('@google-cloud/compute').v1;
        // Instantiates a client
        const computeClient = new InstancesClient();
        function callStart() {
            return __awaiter(this, void 0, void 0, function* () {
                // Construct request
                const request = {
                    instance,
                    project,
                    zone,
                };
                // Run request
                const response = yield computeClient.start(request);
                console.log(response);
            });
        }
        callStart();
        // [END compute_v1_generated_Instances_Start_async]
    });
}
exports.main = main;
process.on('unhandledRejection', err => {
    if (err instanceof Error) {
        console.error(err.message);
    }
    else {
        console.error('An unknown error occurred');
    }
});
