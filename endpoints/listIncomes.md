# List Incomes

Used to list all the User's incomes.

**URL** : `/incomes`

**Method** : `GET`

**Auth required** : YES

**No Data required**

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
  {
    "id": "6aa86354-8d41-4952-bce7-6aff9ceea98d",
    "type": "renda-fixa",
    "value": "900.55",
    "user_id": "7f0bc9ea-a6f8-495d-96c6-525e58e8e0ad",
    "date": "2019-10-01T00:00:00.000Z",
    "created_at": "2020-08-29T20:01:09.801Z",
    "updated_at": "2020-08-30T16:27:53.589Z"
  },
  {
    "id": "307abd8a4-8694-9854-a93e-0lkhhf9cef7f6",
    "type": "renda-variavel",
    "value": "1200",
    "user_id": "7f0bc9ea-a6f8-495d-96c6-525e58e8e0ad",
    "date": "2020-08-04T00:00:00.000Z",
    "created_at": "2020-08-29T21:09:41.649Z",
    "updated_at": "2020-08-29T21:09:41.649Z"
  },
  {
    "id": "9d39ce522-437d-4257-b358-b45235235a",
    "type": "renda-fixa",
    "value": "1200",
    "user_id": "7f0bc9ea-a6f8-495d-96c6-525e58e8e0ad",
    "date": "2020-08-05T00:00:00.000Z",
    "created_at": "2020-08-30T16:22:31.258Z",
    "updated_at": "2020-08-30T16:22:31.258Z"
  }
]
```
