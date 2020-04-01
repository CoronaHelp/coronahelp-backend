# coronahelp-backend

## Backend URL
https://supplyhelper-be-staging.herokuapp.com/

## API Endpoints

### Authentication
| Method | Endpoints                     | Description            |
| ------ | ----------------------------- | ---------------------- |
| POST   | /api/auth/register            | Register               |
| POST   | /api/auth/login               | Login                  |

### Users
| Method | Endpoints                     | Description            |
| ------ | ----------------------------- | ---------------------- |
| GET    | /api/users                    | Get all users          |
| POST   | /api/users                    | Create user            |  
| GET    | /api/users/:id                | Get user by id         |
| PUT    | /api/users/:id                | Update a user          |
| DEL    | /api/users/:id                | Delete user by id      |  

### Inventory Categories
| Method | Endpoints                     | Description            |
| ------ | ----------------------------- | ---------------------- | 
| GET    | /api/categories               | Get all categories     |  
| POST   | /api/categories               | Post category          |  
| GET    | /api/categories/:id           | Get category by id     |  
| PUT    | /api/categories/:id           | Update cat by id       |  
| DEL    | /api/categories/:id           | Delete cat by id       |  

### Inventory Items
| Method | Endpoints                     | Description            |
| ------ | ----------------------------- | ---------------------- |
| GET    | /api/items                    | Get all items          |
| POST   | /api/items                    | Post an item           |  
| GET    | /api/items/:id                | Get item by id         |  
| PUT    | /api/items/:id                | Update item by id      |  
| DEL    | /api/items/:id                | Delete item by id      |

### Location Inventory
| Method | Endpoints                     | Description            |
| ------ | ----------------------------- | ---------------------- |
| GET    | /api/location-inventory/:id   | Get location inv by id |  
| POST   | /api/location-inventory       | Post location inv      |  

### Locations
| Method | Endpoints                     | Description            |
| ------ | ----------------------------- | ---------------------- |
| GET    | /api/locations/radius/:radius/:lat/:lon | Get all locations in given radius  |
| POST   | /api/locations                | Post a location        |  
| GET    | /api/locations/id/:id         | Get location by id     |  
| PUT    | /api/locations/:id            | Update location by id  |  
| DEL    | /api/locations/:id            | Delete location by id  |

### Requests
| Method | Endpoints                     | Description            |
| ------ | ----------------------------- | ---------------------- |
| GET    | /api/requests/all/:zipCode/:radius | Get all requests within a given radius from a given zip-code |
| POST   | /api/requests                 | Post an request        |  
| GET    | /api/requests/id/:id          | Get request by id      |  
| PUT    | /api/requests/:id             | Update request by id   |  
| DEL    | /api/requests/:id             | Delete request by id   |
