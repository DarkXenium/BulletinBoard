# Bulletin Board

This repository contains the source code and necessary files for the Bulletin Board application. The application consists of a React front-end and C# backend APIs. The database content is stored in a SQL Server database.

## Prerequisites

Before running the Bulletin Board application, please make sure you have the following installed:

- Node.js (version 12 or higher)
- Visual Studio or Visual Studio Code (for running the backend APIs)
- SQL Server Management Studio (SSMS) or a similar tool (for managing the database)

## Installation

To set up the Bulletin Board application, follow these steps:

1. Clone the repository to your local machine:

git clone https://github.com/DarkXenium/BulletinBoard.git

2. Install the dependencies for the React front-end:

npm install

3. Open the backend solution file which is in DxBulletinBoardApis folder (`DxBulletinBoardApis.sln`) in Visual Studio or Visual Studio Code.

4. Configure the connection string for the database:

- Open the `appsettings.json` file located in the `BulletinBoard/backend/BulletinBoard.Api` directory.
- Update the `DefaultConnection` string to match your SQL Server instance and database.

5. Restore the database using the provided `db.bak` file:

- Open SQL Server Management Studio (SSMS) or a similar tool.
- Connect to your SQL Server instance.
- Right-click on the "Databases" node and choose "Restore Database".
- Select the `bulletinBoardPostsdb.bak` file from the repository and restore it to your desired database.

## Running the Application

To run the Bulletin Board application, follow these steps:

1. Start the React front-end:

npm start


This will start the development server and launch the application in your default browser.

2. Start the backend APIs:

- Build and run the backend solution in Visual Studio or Visual Studio Code.
- The APIs will be hosted on `http://localhost:5000` by default.

3. Access the application:

Open your browser and navigate to `http://localhost:3000` to use the Bulletin Board application.

## Contributing

If you would like to contribute to the Bulletin Board application, please follow the guidelines below:

1. Fork the repository and clone it to your local machine.

2. Create a new branch for your feature or bug fix:

git checkout -b my-feature

3. Make the necessary changes and commit them:
   
git commit -m "Add my feature"

4. Push your changes to your forked repository:

git push origin my-feature

5. Open a pull request on the main repository, describing your changes and why they should be merged.

6. Wait for the maintainers to review your pull request and provide feedback.

7. Once approved, your changes will be merged into the main repository.

