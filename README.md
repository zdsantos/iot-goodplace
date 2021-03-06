# Good Place API
API that will be accessed by the mobile application for get contexts datas and all business logic and by the MQTT broker for publication of sensor readings.

## Endpoints
|endpoint|method|parameters|reponse|Description|
|-|-|-|-|-|
|/api/v1/users|POST|[User object](#user-document)|User Id|Create a new user|
|/api/v1/users/:id|GET|:id - user id|[User object](#user-document)|Retrieve a user with this Id|
|/api/v1/users/:id|PUT|:id - user id||Update the user with this Id|
|/api/v1/users/:id|DELETE|:id - user id||Delete the user with this Id|
|/api/v1/users/:id/preferences|GET|:id - user id|[Preferences object](#preference-document)|Retrieve preferences for user with this Id|
|/api/v1/users/:id/preferences|POST|:id - user id<br>[Preferences object](#preference-document)||Update preferences for user with this Id|
|/api/v1/users/:id/rooms|GET|:id - user id|[List of rooms](#room-document)|Get list of rooms ordered by preferences of this user|
|/api/v1/rooms|POST|[Room object](#room-document)|Room id|Create a new room|
|/api/v1/rooms/:id|GET|:id - room id|[Room object](#room-document)|Retrieve a room with this Id|
|/api/v1/rooms/:id|PUT|:id - room id||Update the room with this Id|
|/api/v1/rooms/:id|DELETE|:id - room id||Delete the room with this Id|
|/api/v1/publish|POST|[Sensor data](#sensor-data)||Publish a sensor reading|

## Data exemples
### User document
```
{
    "uid": "-asdas1213",
    "displayName": "Fulano de Tal",
    "login": "fulaninho",
    "photoUrl": "https://placehold.it/400",
    "preferencies": {
        "temperature": {
            "value": 27,
            "und": "C"
        },
        "noise": {
            "value": 15,
            "und": "db"
        },
        "luminosity": {
            "value": 600,
            "und": "X"
        }
    },
    "favoritesPlaces": [1, 3, 4]
}
```

### Room document
```
{
    "id": 1,
    "name": "Lab Aula",
    "description": "Laboratório de aula do GREat",
    "reference": "Perto de algum lugar no térreo",
    "photoUrl": "https://placehold.it/400",
    "address": "Rua dos Bobos, 0, Fortaleza - CE",
    "attributes": [
        "wifi", "arcondicionado", "lousa", "mesa para grupo", "mesa individual"
    ],
    "sensors": {
        "temperature": {
            "value": 27,
            "date": "2018-11-16 14:20:0000"
        },
        "luminosity": {
            "value": 600
            "date": "2018-11-16 14:20:0000"
        },
        "noise": {
            "value": 15
            "date": "2018-11-16 14:20:0000"
        }
    ]
}
```

### Preference Document
```
{
    "temperature": {
        "value": 27
    },
    "noise": {
        "value": 15
    },
    "luminosity": {
        "value": 600
    }
}
```

### Sensor Data
```
{
	"roomId": "1",
	"sensors": {
		"luminosity": {
			"value": 600
		},
		"noise": {
			"value": 45
		},
		"noise": {
			"value": 3
		}
                ...
	}
}
```

## Documents Schema
[Data Model Schema](./goodplace-schema.json)
