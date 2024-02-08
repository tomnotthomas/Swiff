





//export function instanceConfigurator(zone: string, name: string): {} {
//  // Check out the structure of an instance resource here: https://cloud.google.com/compute/docs/reference/rest/v1/instances
//  const instanceResource = {
//    "name": `${name}`,
//    "machineType": `zones/${zone}/machineTypes/n1-standard-8`, // Higher performance machine type
//    "disks": [
//      {
//        "boot": true,
//        "initializeParams": {
//          "sourceImage": "projects/windows-cloud/global/images/family/windows-2022", // Windows Server 2022 image
//          "diskSizeGb": "50" // Disk size 50 GB
//        }
//      }
//    ],
//    "guestAccelerators": [
//      {
//        "acceleratorType": `zones/${zone}/acceleratorTypes/nvidia-tesla-t4`, // T4 GPU
//        "acceleratorCount": 1
//      }
//    ],
//    "networkInterfaces": [
//      {
//        "network": "global/networks/default",
//        "accessConfigs": [
//          {
//            "name": "External NAT",
//            "type": "ONE_TO_ONE_NAT"
//          }
//        ]
//      }
//    ],
//    "scheduling": {
//      "onHostMaintenance": "TERMINATE", // Required for instances with GPUs
//      "automaticRestart": false, // Recommended for gaming workloads
//      "preemptible": false // Recommended for stable performance
//    }
//  }
//  return instanceResource;
//}



export function instanceConfigurator(zone:string, name:string): {} {
  //Check out the structure of an instance resource here:https://cloud.google.com/compute/docs/reference/rest/v1/instances
  const instanceResource = {
    "name": `${name}`,
    "machineType": `zones/${zone}/machineTypes/e2-standard-2`,
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
  return instanceResource
}