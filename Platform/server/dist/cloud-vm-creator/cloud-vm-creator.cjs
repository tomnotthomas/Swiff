var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
/**
 * TODO(developer): Uncomment and replace these variables before running the sample.
 */
// const projectId = 'YOUR_PROJECT_ID';
import * as Compute from '@google-cloud/compute';
// List all instances in the specified project.
function listAllInstances() {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const instancesClient = new Compute.InstancesClient();
        //Use the `maxResults` parameter to limit the number of results that the API returns per response page.
        const aggListRequest = instancesClient.aggregatedListAsync({
            project: '',
            maxResults: 5,
        });
        console.log('Instances found:');
        try {
            // Despite using the `maxResults` parameter, you don't need to handle the pagination
            // yourself. The returned object handles pagination automatically,
            // requesting next pages as you iterate over the results.
            for (var _d = true, aggListRequest_1 = __asyncValues(aggListRequest), aggListRequest_1_1; aggListRequest_1_1 = yield aggListRequest_1.next(), _a = aggListRequest_1_1.done, !_a; _d = true) {
                _c = aggListRequest_1_1.value;
                _d = false;
                const [zone, instancesObject] = _c;
                const instances = instancesObject.instances;
                if (instances && instances.length > 0) {
                    console.log(` ${zone}`);
                    for (const instance of instances) {
                        console.log(` - ${instance.name} (${instance.machineType})`);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = aggListRequest_1.return)) yield _b.call(aggListRequest_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
listAllInstances();
