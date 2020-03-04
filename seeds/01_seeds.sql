INSERT INTO users (name, email, password)
VALUES
  ('Pratik' ,'wingdings@hotmail.com' ,'$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Joe' ,'janky_joe@hotmail.com' ,'$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Sam' ,'short_sam@hotmail.com' ,'$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Bob' ,'hot_bob@hotmail.com' ,'$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, thumbnail_photo_url, cover_photo_url, country, street, city, province, post_code)
VALUES
  ('1', 'Big House', 'MuchSpace.png', 'Sobig.lol', 'canada', '401 East Hastings', 'Vancouver', 'BC', 'v7c5a3'),
  ('2', 'Small House', 'NoSpace.png', 'sosmal.lol', 'canada', '401 East Hastings', 'Vancouver', 'BC', 'v7c5a3'),
  ('3', 'penthouse', 'expensive.png', 'ripwallet.lol', 'canada', '401 East Hastings', 'Vancouver', 'BC', 'v7c5a3'),
  ('4', 'shed', 'noroof.png', 'socold.lol', 'canada', '401 East Hastings', 'Vancouver', 'BC', 'v7c5a3');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES 
  ('2016-06-22 19:10:25', '2017-06-22 19:10:25', 1 , 1),
  ('2017-06-22 19:10:25', '2018-06-22 19:10:25', 2 , 2),
  ('2018-06-22 19:10:25', '2019-06-22 19:10:25', 3 , 3),
  ('2019-06-22 19:10:25', '2020-06-22 19:10:25', 4 , 4);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES 
  (1 ,1 ,1 ,5 ,'I hate BIG houses'),
  (2 ,2 ,2 ,1 ,'I REALLY hate SMALL houses'),
  (3 ,3 ,3 ,10 ,'I LOVE my PENTHOUSE'),
  (4 ,4 ,4 ,10 ,'SHEDS ARE MY PASSION');