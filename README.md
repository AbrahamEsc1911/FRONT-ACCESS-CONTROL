![Alt text](/images/logonaves.svg "Optional title")
# Coworking Access Control and Room Management System

## Table of Contents
- [General Description](#general-description)
- [Project Objectives](#project-objectives)
- [Scope](#scope)
- [Prerequisites](#prerequisites)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Architecture](#project-architecture)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## General Description
This project is an access control and space management system for a coworking center. The application allows users to log their entry and exit from rooms, manage reservations, monitor room availability in real-time, and generate usage reports. Additionally, the system ensures that the maximum occupancy of each room is not exceeded.

## Project Objectives
- Facilitate the administration of coworking spaces by logging user access.
- Provide administrators the ability to monitor room occupancy in real-time.
- Allow users to make reservations and check room availability.
- Generate administrative reports on room usage, absence control, and access statistics.

## Scope
This system includes:
- **Access Control:** Users can log their entries and exits in real-time.
- **Capacity Management:** Constant monitoring of room capacity to prevent overcrowding.
- **Room Management:** Visualization of room availability and reservations.
- **Administrative Reports:** Reports on facility usage, user absences, and other relevant data for management.

It does not include the implementation of:
- Payment or billing processes.
- Integration with physical security systems (automatic doors, etc.).

## Prerequisites
Before getting started, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MySQL** or any other compatible database system

You will also need a user account to access the APIs that manage access and administration.

## Technologies Used
This project has been developed using the following technologies:
- **Frontend:**
  - React.js
  - CSS for the design and layout of pop-ups and other visual elements.

- **Backend:**
  - Node.js with Express.js for API creation.
  - MySQL for relational database management.
  - TypeORM for database interaction.

- **Authentication and Security:**
  - JWT (JSON Web Tokens) for user authentication.

- **Others:**
  - Docker (optional) for virtualization and environment management.

## Installation
1. Clone the repository:
   - `git clone https://github.com/your-username/coworking-access-control.git`
   - `cd coworking-access-control`

2. Install the dependencies:
   - `npm install`

3. Set up the environment variables in a `.env` file with the necessary parameters:
   - `DB_HOST=localhost`
   - `DB_USER=user`
   - `DB_PASS=password`
   - `DB_NAME=coworking_db`
   - `JWT_SECRET=your_jwt_secret`

4. Run the database migrations:
   - `npm run typeorm migration:run`

5. Start the application:
   - `npm start`

## Usage

### Main Features:
- **Application Access:** Users must register and authenticate to use the system.
- **Room Management:** Users can view room availability and make reservations.
- **Access Control:** Users can log their entry and exit from rooms.

### Example API Request:
You can test the system features using tools like Postman. Here’s an example request to log an entry:

**POST** `/accesses/entry`

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <your_jwt_token>`

**Body:**
    ```json
{
  "roomId": 1,
  "entryTime": "2024-10-17T09:00:00Z"
}

## Project Architecture

The basic project structure is as follows:


├── src/
│   ├── modules/
│   │   ├── authentication/
│   │   ├── person/
│   │   ├── room/
│   │   ├── access/
│   ├── middlewares/
│   ├── types/
│   ├── database/
│   ├── server.ts
│   ├── app.ts
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json


Each module (such as `authentication`, `person`, `room`, and `access`) contains controllers, services, routes, and specific entities.

## API Endpoints

### Access Control
- **POST** `/accesses/entry`: Registers a new entry.
- **POST** `/accesses/exit`: Registers a new exit.
- **GET** `/accesses/current/room/{room_id}`: Retrieves the list of people currently in a specific room.

### User Management
- **GET** `/persons/{id}/current-access`: Retrieves the current access of a specific person.
- **GET** `/persons/{id}/access-history`: Retrieves the access history of a specific person.

### Administration
- **POST** `/administration/daily-report`: Generates a daily report with access and absence statistics.
- **GET** `/administration/reports`: Retrieves a report based on a date range.

### Room Management
- **GET** `/rooms/{id}/current-status`: Retrieves the current status of a room, including the list of people present.

## Contributing
Contributions are welcome. If you would like to contribute:
1. Fork the repository.
2. Create a branch for your new feature or fix.
3. Submit a pull request.

## License
This project is licensed under the MIT License. For more information, see the LICENSE file.
