# SignUp

Used to create an account for a User.

**URL** : `/users`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "name": "[name required]",
    "username": "[valid email address]",
    "password": "[password required]"
}
```

**Data example**

```json
{
	"name": "John Doe",
	"email": "John.doe@example.com",
	"password": "123456"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "id": "7f0bc9ea-a6f8-495d-96c6-525e58e8e0ad",
  "created_at": "2020-08-31T00:39:36.487Z",
  "updated_at": "2020-08-31T00:39:36.487Z"
}
```

## Error Responses

**Condition** : If name, password or email are missing.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"password\" is not allowed to be empty",
  "validation": {
    "source": "body",
    "keys": [
      "password"
    ]
  }
}
```

