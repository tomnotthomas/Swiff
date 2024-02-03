import dotenv from 'dotenv';
import User from '../models/User.js';
import generateVmName from '../helpers/instance-resource-name-generator.js';
import { getVmZone } from '../helpers/instance-zone-translator.js';
import { instanceConfigurator } from '../helpers/instance-resource-template.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
dotenv.config();
const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_PROJ_ID;
export const setPaymentStatus = async (req, res) => {
    try {
        const email = req.body.userEmail;
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(404).send({ error: '404', message: 'User not found' });
            return;
        }
        // Check if user already has a VM
        if (!user.virtualMachine) {
            const vm = await generateVmName();
            user.virtualMachine = vm;
            user.SubscriptionStatus = true;
            await user.save();
            // VM creation process
            const vmZone = getVmZone(user.zone);
            const vmName = user.virtualMachine;
            const configuredResource = instanceConfigurator(vmZone, vmName);
            console.log(vmZone, vmName, configuredResource);
            const cloudVmCreator = require('../google/cloud-vm-creator.cjs');
            try {
                await cloudVmCreator.main(configuredResource, GOOGLE_CLOUD_PROJECT_ID, vmZone);
            }
            catch (error) {
                console.error('Error calling main function:', error);
                res.status(500).json({ message: 'Error creating VM' });
                return;
            }
        }
        res.json({ success: true, redirectTo: '/steam-login' });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: 'an unknown error occurred' });
        }
    }
};
