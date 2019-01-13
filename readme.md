# Register and Login
1. Register: 
`POST /account/register`  (**do not need to implement**)  
payload:
```js
{
    userId: string,
    name: string,
    password: string,
    courses: [
        string
    ]
}
```
---
2. Login: `POST /account/login`  
payload:
```js
{
    userId: string,
    password: string
}
```
respond:  `200  -  {UUID: string}` or `400 - failed`  
UUID is like user ID but unique for each user 

---

3. Get profile: `GET /account/:UUID`  
response: 
```js
200 -  {
    name: string,
    courses: [
        string
    ]
}

or 

400 - failed
```

4. Get profile picture: `GET /account/picture/:UUID`   
response: image

---

1. Update profile: `PUT /account/:UUID`  
payload: 
```js
{
    name: string (optional),
    courses: [
        string
    ]
}
```


# Find groups
1. Sign up for study: `POST /study/schedule`  
payload: 
```js
{
    UUID: string,
    date: "DDMMYY",
    maxMembers: int,
    courses: [
        string
    ]
}
```

2. Remove for study: `DELETE /study/schedule`  
payload: 
```js
{
    UUID: string,
    date: "DDMMYY"
}
```

3. Check status for study group: `GET /study/schedule/:UUID`  
response:
```js
[
    {
        date: "DDMMYY", 
        courses: [
            string
        ],
        group: [
            (UUIDs of group numbers)
        ]
    }, 
    {
        date: "DDMMYY",
        courses: [
            string
        ],
        group: [
            (UUIDs of group numbers)
        ]
    } 
]
```

