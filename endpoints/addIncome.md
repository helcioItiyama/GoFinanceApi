# Add income

Used to add an income for a registered User.

**URL** : `/incomes`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
	"type": ["choose between 'renda-fixa' or 'renda-variavel'" ],
	"value": ["value must be a number"],
	"date": ["date must be a timestamp"]
}
```

**Data example**

```json
{
	"type": "renda-fixa",
	"value": 3000,
	"date": 1598703953762
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "type": "renda-fixa",
  "value": 3000,
  "user_id": "5e572267-9522-460b-bafd-2d81da2af0b2",
  "date": "2020-08-29T12:25:53.762Z",
  "id": "a3sds407-cfds3-40f9-9485-f888555aa56",
  "created_at": "2020-08-31T04:06:39.568Z",
  "updated_at": "2020-08-31T04:06:39.568Z"
}
```

## Error Responses

**Condition** : If the value for type is not found in the database.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
  "status": "error",
  "message": "You should choose either renda-variavel or renda-fixa"
}
```

### Or

**Condition** : If the date is in the future.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
  "status": "error",
  "message": "You should not choose a date in the future"
}
```

### Or

**Condition** : If the value is less than 1.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"value\" must be a positive number",
  "validation": {
    "source": "body",
    "keys": [
      "value"
    ]
  }
}
```
