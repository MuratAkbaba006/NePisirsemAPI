you need a token for continue after /api root.
You can get this token by logging in or as a member.
after that you can send body {token:'your_token'} or send 
header {x-access-token:your_token}

# Users

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/users/:user_id | `GET` | Empty | get a single user |
| /api/users/mail_update/:user_id | `PUT` | {email:'fooo@gmail.com'} | update email  |
| /api/users/password_update/:user_id | `PUT` | {oldpassword:'1234',password:'123',repassword:'123'} | update password |
| /api/users/pp_update/:user_id | `PUT` | { file:image } | update profile image | 

# Meal

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/meal | `POST` | {meal_name:'mantı' ,time:100 , cuisine:'Turkish' , ingredients:[...],recipe:'lorem ipsum ...' , image:file , video:file } | add a new meal |
| /api/meal/aggregate | `GET` | Empty | get Meal list with fav count |
| /api/meal/cuisine/:cuisine | `GET` | Empty | get random 3 meal for the given parameter |
| /api/meal/ingredient | `POST` | {ingredientlist:[...]} | get meals for the given ingredientlist | 
| /api/meal/random  | `GET` | Empty | get random 3 meal |
| /api/meal/pratic  | `GET` | Empty | get pratic 5 meal |
| /api/meal/mostpopular  | `GET` | Empty | get most popular 5 meal |
| /api/meal/newadded  | `GET` | Empty | get last added 5 meal |
| /api/meal/:meal_id  | `GET` | Empty | get a single meal |
| /api/meal/:meal_id  | `PUT` | {meal_name:'kuru fasulye' ,time:100 , cuisine:'Turkish' , ingredients:[...],recipe:'lorem ipsum ...' , image:file , video:file } | update a meal |
| /api/meal/:meal_id  | `DELETE` | Empty | delete a meal |

# Favs

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/favs | `POST`  | {userId:1, mealId:1} | Add Fav | 
| /api/favs/getfavs/:meal_id | `GET`  | Empty | get list favs for a meal |
| /api/favs/getfavsforuser/:user_id | `GET`  | Empty | get list favs for a user |
| /api/favs/:fav_id | `DELETE`  | Empty | delete a fav |

# Ingredient

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/ingredients/add | `POST`  | {name:'onion'} | Add Ingredient |
| /api/ingredients/getlist | `GET`  | Empty | get Ingredients List | 


# Index

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| / | `GET`  | Empty | Open Meal Dashboard Page | 
| /register | `POST` | { name: 'foo', email:'foo@gmail.com' ,password:'1234' } | Create a new user and Login |
| /login | `POST` | { email: 'foo@gmail.com', password:'1234' } | Login |



