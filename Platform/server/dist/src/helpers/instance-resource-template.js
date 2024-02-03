export function instanceConfigurator(zone, name) {
    //Check out the structure of an instance resource here:https://cloud.google.com/compute/docs/reference/rest/v1/instances
    const instanceResource = {
        "name": `${name}`,
        "machineType": `zones/${zone}/machineTypes/f1-micro`,
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
    };
    return instanceResource;
}
