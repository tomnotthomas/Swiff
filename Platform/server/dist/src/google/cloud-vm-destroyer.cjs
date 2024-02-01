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
const dotenv = require('dotenv').config({ path: __dirname + '/../../../.env' });
function main(instance, project, zone) {
    // Imports the Compute library
    const { InstancesClient } = require('@google-cloud/compute').v1;
    // Instantiates a client
    const computeClient = new InstancesClient();
    function callDelete() {
        return __awaiter(this, void 0, void 0, function* () {
            // Construct request
            const request = {
                instance,
                project,
                zone,
            };
            // Run request
            const response = yield computeClient.delete(request);
            console.log(response);
        });
    }
    callDelete();
    // [END compute_v1_generated_Instances_Delete_async]
}
process.on('unhandledRejection', err => {
    if (err instanceof Error) {
        console.error(err.message);
    }
    else {
        console.error('An unknown error occurred');
    }
});
// [START compute_v1_generated_Instances_Delete_async]
/**
 * This snippet has been automatically generated and should be regarded as a code template only.
 * It will require modifications to work.
 * It may require correct/in-range values for request initialization.
 * TODO(developer): Uncomment these variables before running the sample.
 */
/**
 *  Name of the instance resource to delete.
 */
const instance = 'simplevmname1';
/**
 *  Project ID for this request.
 */
const project = process.env.GOOGLE_PROJ_ID;
/**
 *  An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported ( 00000000-0000-0000-0000-000000000000).
 */
// const requestId = 'abc123'
/**
 *  The name of the zone for this request.
 */
const zone = 'us-west1-a';
main(instance, project, zone);
