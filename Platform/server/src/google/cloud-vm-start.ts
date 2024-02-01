export {}
'use strict';

const dotenv = require('dotenv').config({path:__dirname+'/../../../.env'})

function main(instance:string, project:string, zone:string) {

  // Imports the Compute library
  const {InstancesClient} = require('@google-cloud/compute').v1;

  // Instantiates a client
  const computeClient = new InstancesClient();

  async function callStart() {
    // Construct request
    const request = {
      instance,
      project,
      zone,
    };

    // Run request
    const response = await computeClient.start(request);
    console.log(response);
  }

  callStart();
  // [END compute_v1_generated_Instances_Start_async]
}

process.on('unhandledRejection', err => {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error('An unknown error occurred');
  }
});

  // [START compute_v1_generated_Instances_Start_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Name of the instance resource to start.
   */
  const instance = 'simplevmname1'
  /**
   *  Project ID for this request.
   */
  const project = process.env.GOOGLE_PROJ_ID
  /**
   *  An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported ( 00000000-0000-0000-0000-000000000000).
   */
  // const requestId = 'abc123'
  /**
   *  The name of the zone for this request.
   */
   const zone = 'us-west1-a'


main(instance, project!, zone);