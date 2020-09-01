# Login

Used to collect a Token for a registered User.

**URL** : `/session`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
    "username": "[valid email address]",
    "password": "[password required]"
}
```

**Data example**

```json
{
	"email": "John.doe@example.com",
	"password": "123456"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "user": {
    "id": "5e572267-73254-4c0b-b8fd-2derasf",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "created_at": "2020-08-27T00:05:46.030Z",
    "updated_at": "2020-08-27T00:05:46.030Z"
  },
  "token": "eyJhbGciOTI2Mywic3ViIjoiNWU1NzIyNjctOTUyMi00NjBiLWM0owf1P5lSas"
}
```

## Error Responses

**Condition** : If password or email are missing.

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

### Or

**Condition** : If password or email are not found in the database.

**Code** : `401 Unauthorized`

**Content example**

```json
{
  "status": "error",
  "message": "Incorrect e-mail/password combination."
}
