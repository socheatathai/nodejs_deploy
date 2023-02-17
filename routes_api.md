http://localhost:3001/api/createUser  method : "post"
{
    "username":"admin",
    "password":"admin123",
    "tel":"093786128",
    "email":"admin@gmail.com"
}
http://localhost:3001/api/login  method : "post"
{
  "username": "admin",
  "password": "$2b$10$gDtU5QkXcg/JqBk2BDd.l.k"
}
http://localhost:3001/api/teacher method : "post"
{
  "firstname":"Soheata",
  "lastname":"Thai",
  "gender":1,
  "tel":"093786128",
  "email":"Socheata@gmail.com",
  "description":"testing"
}
INSERT INTO `course`(`category_id`, `name`, `full_price`, `description`, `status`, `create_at`, `update_at`) VALUES (1,'HTML',30,'Testing',1,'2020/10/12','2023/02/14')
INSERT INTO `student`( `firstname`, `lastname`, `gender`, `tel`, `email`, `description`, `create_at`, `status`) 
VALUES ('chenda','heng',1,'0967773332','chenda@gmail.com','Testing','2023/01/12',1)