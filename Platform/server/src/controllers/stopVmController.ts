import { Request, Response } from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { createRequire } from 'module';
import { getVmZone } from '../helpers/instance-zone-translator.js';

const require = createRequire(import.meta.url);


dotenv.config();

interface User {
  userEmail: string;
}

const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_PROJ_ID;


export const stopVm =  async (req: Request, res: Response) => {
  try {
    const email = req.body.userEmail;
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).send({ error: '404', message: 'User not found' });
      return;
    }

    // Check if user already has a VM
    if (user.virtualMachine) {
      

      // Collect the arguments for cloudVMStopper
      const vmZone = getVmZone(user.zone);
      const vmName = user.virtualMachine;
      console.log(vmZone, vmName);

      const cloudVmStopper = require('../google/cloud-vm-stop.cjs')
      try {
        await cloudVmStopper.main(vmName, GOOGLE_CLOUD_PROJECT_ID, vmZone);
      } catch (error) {
        console.error('Error calling main function:', error);
        res.status(500).json({ message: 'Error stopping vm' });
        return;
      }
    } else {
      return "User does not have a machine yet. (stopVMController)"
    }

    res.json({ success: true });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'an unknown error occurred' });
    }
  }
};