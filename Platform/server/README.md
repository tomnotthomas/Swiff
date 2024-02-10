# Google Cloud Setup for Gaming Project/Backend 💻🎮

This project leverages the power of Google Cloud. Here's how to get started:

## Getting Started

### Step 1: Create a Google Cloud Account 🌐
First, sign up for a Google Cloud account. Visit:
[Google Cloud](https://cloud.google.com/)

### Step 2: Create a Project 🛠️
After account creation, you need to set up a new project. Follow the instructions here:
[Creating and Managing Projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects)

### Step 3: Enable Required Services ⚙️
You'll need to enable specific services in Google Cloud Platform (GCP). Detailed guidance is available at:
[Google API Support](https://support.google.com/googleapi/answer/6158841?hl=en)

- **Enable Compute Engine API**: Necessary for creating virtual machines/gaming computers.
- **Enable NVIDIA GAMING PC in GCP Marketplace**: Specifically, select the Windows Server 2019 option.

### Step 4: Configure and Deploy Your Gaming Machine 🎲
- **Increase GPU Quotas**: Adjust the GPU limits for regions where you'll deploy gaming machines.
- **Use the NVIDIA GAMING PC Image**: From the GCP marketplace, select the Windows Server 2019 image.
  - Upgrade the Windows server image to at least 300GB of hard drive space.
  - Remotely connect (RDP) into the machine.
  - Install Steam and Parsec.
  - For low latency streaming with Sunshine and Moonlight, ensure hardware compatibility. Note: Windows Server 2019 may not be supported.

### Step 5: Create a Machine Image 🖼️
- After setup, create a machine image from your VM. Right-click on the machine in the console and select "Create machine image".

### Step 6: Link Your Machine Image to the Project Repo 🔗
- In the project repository, navigate to `server/src/helpers/instance-resource-template`.
- Replace the `sourceMachineImage` link with your newly created machine image.

### Step 7: Integrate with VSCode and Cloud Code 🧑‍💻
- Connect your VSCode to Google Cloud using the Cloud Code add-in.
- Grant it permissions to create, delete, and update VMs.

Now, you should be fully equipped to deploy and manage your gaming machines in Google Cloud!

---

**Note**: Always check for the latest compatibility and updates for tools like Sunshine and Moonlight to ensure optimal performance. 🚀

## Project Setup

### Installing Dependencies

Run the following command to install all necessary dependencies:

```bash
npm i

## Environment Configuration

Create an `.env` file in the root directory of the project and add the following variables:

- `REACT_APP_STEAM_API_KEY` - Your Steam API Key.
- `DATABASE_PORT` - The port where your database is running.
- `DATABASE_NAME` - The name of your database.
- `GOOGLE_PROJ_ID` - Your Google Cloud Platform project ID.
- `JWT_SECRET` - Your JSON Web Token secret.

Ensure that each variable is correctly set to ensure the smooth running of the application.
