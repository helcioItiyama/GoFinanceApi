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