# Salesforce DX Project: Next Steps

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## How Do You Plan to Deploy Your Changes?

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)

// About the project:
This project utilizes Salesforce Lightning Web Components to build an educational platform where administrators can manage courses, sections, topics, and content, while students can access and download educational materials.

Features:

Admin Capabilities:

Create and Manage Content:
Courses: Admins can create and update courses.
Sections: Each course can have multiple sections.
Topics: Each section can include multiple topics.
Content: Admins can add various formats of content to topics.
Batch Operations:
Use Visualforce pages to perform bulk delete and update operations on courses, sections, topics, and content.
Student Capabilities:

Access and Download Material:
Students can read material and download files through a single-screen interface.
Notifications:

Material Change Alerts:
When an admin updates any material, students receive email notifications to confirm the changes. This functionality is managed by an email trigger.
Cloud Integration:

File Management and Analytics:
Utilize CloudFiles service for handling file storage, generating analytics, and providing protected links for secure content access.
Technical Details:
Salesforce Lightning Web Components:

Develop a unified user interface where admins and students interact with the educational content.
Implement user roles to distinguish between admin and student functionalities.
Visualforce Pages:

Create Visualforce pages for administrators to efficiently manage bulk operations on courses, sections, topics, and content.
Email Triggers:

Set up email triggers to notify students about content updates, ensuring they are always informed of the latest material changes.
CloudFiles Service:

Integrate CloudFiles for secure file storage and distribution.
Leverage analytics to monitor file usage and access patterns.
Generate protected links to maintain content security.
User Flows:
Admin User Flow:

Login: Admin logs into the system.
Manage Content: Admin navigates to the content management section.
Create or update courses, sections, topics, and content.
Use Visualforce pages for batch operations.
Content Update: When content is updated, email triggers notify students.
Student User Flow:

Login: Student logs into the system.
Access Material: Student accesses the course material on a single screen.
Read material directly on the platform.
Download files using the download button.
Email Notification: Student receives email notifications for any updates made to the course material.
