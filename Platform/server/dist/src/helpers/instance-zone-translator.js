const allocatedZones = [
    { "Changhua County, Taiwan, APAC": "asia-east1-c" },
    { "Hong Kong, APAC": "asia-east2-a" },
    { "Tokyo, Japan, APAC": "asia-northeast1-a" },
    { "Seoul, South Korea, APAC": "asia-northeast3-b" },
    { "Mumbai, India, APAC": "asia-south1-a" },
    { "Jurong West, Singapore, APAC": "asia-southeast1-a" },
    { "Jakarta, Indonesia, APAC": "asia-southeast2-b" },
    { "Sydney, Australia, APAC": "australia-southeast1-a" },
    { "Warsaw, Poland, Europe": "europe-central2-c" },
    { "St. Ghislain, Belgium, Europe": "europe-west1-b" },
    { "London, England, Europe": "europe-west2-b" },
    { "Frankfurt, Germany, Europe": "europe-west3-b" },
    { "Eemshaven, Netherlands, Europe": "europe-west4-a" },
    { "Tel Aviv, Israel, Middle East": "me-west1-b" },
    { "Montréal, Québec, North America": "northamerica-northeast1-c" },
    { "Osasco, São Paulo, Brazil, South America": "southamerica-east1-a" },
    { "Council Bluffs, Iowa, North America": "us-central1-a" },
    { "Moncks Corner, South Carolina, North America": "us-east1-c" },
    { "Ashburn, Virginia, North America": "us-east4-a" },
    { "The Dalles, Oregon, North America": "us-west1-a" },
    { "Los Angeles, California, North America": "us-west2-c" },
    { "Salt Lake City, Utah, North America": "us-west3-b" },
    { "Las Vegas, Nevada, North America": "us-west4-a" }
];
//This translates the zone that the user chose to a zone in gcp
export function getVmZone(area) {
    const cityObject = allocatedZones.find(obj => obj.hasOwnProperty(area));
    if (cityObject && area in cityObject) {
        return cityObject[area];
    }
    return null;
}
