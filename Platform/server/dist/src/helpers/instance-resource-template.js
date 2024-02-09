export function instanceConfigurator(zone, name) {
    // Check out the structure of an instance resource here: https://cloud.google.com/compute/docs/reference/rest/v1/instances
    const instanceResource = {
        "name": `${name}`,
        "machineType": `zones/${zone}/machineTypes/n1-standard-8`, // Higher performance machine type
        "sourceMachineImage": "projects/api-project-362391334008/global/machineImages/gamemachineimageparsec",
        "guestAccelerators": [
            {
                "acceleratorType": `zones/${zone}/acceleratorTypes/nvidia-tesla-t4`, // T4 GPU
                "acceleratorCount": 1
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
        ],
        "scheduling": {
            "onHostMaintenance": "TERMINATE", // Required for instances with GPUs
            "automaticRestart": false, // Recommended for gaming workloads
            "preemptible": false // Recommended for stable performance
        }
    };
    return instanceResource;
}
//export function instanceConfigurator(zone: string, name: string): {} {
//  const instanceResource = {
//    "name": `${name}`,
//    "machineType": `zones/${zone}/machineTypes/n2-standard-4`, // Adjust the machine type as needed
//    "disks": [
//      {
//        "boot": true,
//        "initializeParams": {
//          "sourceImage": "projects/windows-cloud/global/images/family/windows-2019",
//          "diskSizeGb": "100" // Adjust the disk size as needed
//        }
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
//      "onHostMaintenance": "TERMINATE",
//      "automaticRestart": false,
//      "preemptible": false
//    }
//  }
//  return instanceResource;
//}
