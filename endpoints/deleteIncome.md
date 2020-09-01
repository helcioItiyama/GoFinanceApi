# Delete income

Used to delete an income for a registered User.

**URL** : `/incomes/:id`

**Method** : `PUT`

**Auth required** : YES

**No Data required**

## Success Response

**Code** : `204 No Content`

## Error Responses

**Condition** : If the id is not found in the database.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
  "status": "error",
  "message": "This income does not exist!"
}
```
