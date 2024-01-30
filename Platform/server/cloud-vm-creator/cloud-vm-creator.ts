/**
 * TODO(developer): Uncomment and replace these variables before running the sample.
 */
// const projectId = 'YOUR_PROJECT_ID';
import * as Compute from '@google-cloud/compute'
// List all instances in the specified project.
async function listAllInstances() {
  const instancesClient = new Compute.InstancesClient();


  //Use the `maxResults` parameter to limit the number of results that the API returns per response page.
  const aggListRequest = instancesClient.aggregatedListAsync({
    project: '',
    maxResults: 5,
  });

  console.log('Instances found:');

  // Despite using the `maxResults` parameter, you don't need to handle the pagination
  // yourself. The returned object handles pagination automatically,
  // requesting next pages as you iterate over the results.
  for await (const [zone, instancesObject] of aggListRequest) {
    const instances = instancesObject.instances;

    if (instances && instances.length > 0) {
      console.log(` ${zone}`);
      for (const instance of instances) {
        console.log(` - ${instance.name} (${instance.machineType})`);
      }
    }
  }
}

listAllInstances();