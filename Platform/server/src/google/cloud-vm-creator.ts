const dotenv = require('dotenv').config({path:__dirname+'/../../../.env'})


console.log(process.env.GOOGLE_PROJ_ID)


const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_PROJ_ID



function main(instanceResource: any, project:string, zone:string) {

  // Imports the Compute library
  const {InstancesClient} = require('@google-cloud/compute').v1;

  // Instantiates a client
  const computeClient = new InstancesClient();

  async function callInsert() {
    // Construct request
    const request = {
      instanceResource,
      project,
      zone,
    };

    // Run request
    const response = await computeClient.insert(request);
    console.log(response);
  }

  callInsert();
  // [END compute_v1_generated_Instances_Insert_async]
}

/**
 *  The body resource for this request
 */

//Check out the structure of an instance resource here:https://cloud.google.com/compute/docs/reference/rest/v1/instances
 const instanceResource = {
  "name": "free-tier-instance",
  "machineType": `projects/${GOOGLE_CLOUD_PROJECT_ID}/zones/us-west1-a/machineTypes/f1-micro`,
  "disks": [
    {
      "boot": true,
      "initializeParams": {
        "sourceImage": "projects/debian-cloud/global/images/family/debian-10",
        "diskSizeGb": "10"
      }
    }
  ],
  "networkInterfaces": [
    {
      "network": "global/networks/default",
      "accessConfigs": [
        {
          "name": "External NAT",
          "type": "ONE_TO_ONE_NAT"
        }
      ]
    }
  ]
}
/**
 *  Project ID for this request.
 */
 const project = GOOGLE_CLOUD_PROJECT_ID
/**
 *  An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported ( 00000000-0000-0000-0000-000000000000).
 */
// const requestId = 'abc123'
/**
 *  Specifies instance template to create the instance. This field is optional. It can be a full or partial URL. For example, the following are all valid URLs to an instance template: - https://www.googleapis.com/compute/v1/projects/project /global/instanceTemplates/instanceTemplate - projects/project/global/instanceTemplates/instanceTemplate - global/instanceTemplates/instanceTemplate
 */
// const sourceInstanceTemplate = 'abc123'
/**
 *  Specifies the machine image to use to create the instance. This field is optional. It can be a full or partial URL. For example, the following are all valid URLs to a machine image: - https://www.googleapis.com/compute/v1/projects/project/global/global /machineImages/machineImage - projects/project/global/global/machineImages/machineImage - global/machineImages/machineImage
 */
// const sourceMachineImage = 'abc123'
/**
 *  The name of the zone for this request.
 */
 const zone = 'us-west1-a'




 process.on('unhandledRejection', err => {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error('An unknown error occurred');
  }
});

main(instanceResource, project!, zone);

