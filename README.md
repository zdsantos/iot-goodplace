# Good Place API
API que será consumida pela aplicação mobile para consulta no e 

### Endpoints
|endpoint|method|parameters|reponse|Description|
|-|-|-|-|-|
|/v1/users|POST|User object|User object with a Id|Create a new user|
|/v1/users/:id|GET|:id - user id|User object|Retrieve a user with this Id|
|/v1/users/:id|PUT|:id - user id|User object|Update the user with this Id|
|/v1/users/:id|DELETE|:id - user id||Delete the user with this Id|
|/v1/users/:id/preferences|GET|:id - user id|Preferences object|Retrieve preferences for user with this Id|
|/v1/users/:id/preferences|POST|:id - user id|Preferences object|Update preferences for user with this Id|
|/v1/rooms|POST|Rooms object|Rooms object with a Id|Create a new rooms|
|/v1/rooms/:id|GET|:id - rooms id|Rooms object|Retrieve a rooms with this Id|
|/v1/rooms/:id|PUT|:id - rooms id|Rooms object|Update the rooms with this Id|
|/v1/rooms/:id|DELETE|:id - rooms id||Delete the rooms with this Id|
|/v1/publish|POST|Sensor data||Publish a sensor reading|