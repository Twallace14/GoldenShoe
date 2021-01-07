CREATE DATABASE goldenshoe;

CREATE TABLE orders (
  orderNo VARCHAR(50) NOT NULL PRIMARY KEY
  username VARCHAR(50) NOT NULL
  orderDate DATE NOT NULL
  delivered BOOLEAN NOT NULL

);

CREATE TABLE ordereditems(
itemid
itemName
colour
price
odrerNo
) 



CREATE TABLE returnordrs(

  returnNo VARCHAR(50) NOT NULL PRIMARY KEY,
  user VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  orderDate DATE NOT NULL,
  received BOOLEAN NOT NULL DEFAULT FALSE

)

CREATE TABLE returnitems(
returnNo VARCHAR(50) REFERENCES returnorders(returnNO) UNIQUE,
reason VARCHAR(50),
colour VARCHAR(50) NOT NULL,
itemName VARCHAR(50) NOT NULL,
itemId VARCHAR (50) PRIMARY KEY,
Size INT,
itemInfo VARCHAR(50),
returned BOOLEAN NOT NULL
)

CREATE TABLE returningItems(
itemNum VARCHAR(50) UNIQUE PRIMARY KEY, 
returnNum VARCHAR(50) NOT NULL REFERENCES returnorders(returnnum),
requestDate DATE NOT NULL REFERENCES returnorders(requestdate),
name VARCHAR(50) NOT NULL,
colour VARCHAR(50) NOT NULL,
reason VARCHAR(50) NOT NULL,
size SMALLINT NOT NULL,
received BOOLEAN DEFAULT FALSE )

INSERT INTO orders (
  ordernum,
  name,
  delivered
)
VALUES ('BX0040122C', 'Phillip idunohu', DATE '2021-01-02');

CREATE TABLE orderedItems(
itemid VARCHAR(50) UNIQUE PRIMARY KEY, 
ordernum VARCHAR(50) NOT NULL REFERENCES orders(ordernum),
delivered DATE NOT NULL,
itemname VARCHAR(50) NOT NULL,
colour VARCHAR(50) NOT NULL,
size SMALLINT NOT NULL,
imageURL VARCHAR(255) NOT NULL)

INSERT INTO ordereditems (
itemid,
itemname,
colour,
ordernum,
size,
delivered,
imageurl
) VALUES ('WAL994', 'Classic Trims', 'black', 'BX0040122C', 6, DATE '2021-01-02', 'https://www.getthelabel.com/blog/wp-content/uploads/2018/07/Deakins-school-shoes-250x250.jpg')