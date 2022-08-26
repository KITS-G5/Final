create database projectfinal;
use projectfinal;
-- 
drop database projectfinal;


insert into cities (city_name) values ("Can Tho");
insert into cities (city_name) values ("Da Nang");
insert into cities (city_name) values ("Hai Phong");
insert into cities (city_name) values ("Ha Noi");
insert into cities (city_name) values ("Ho Chi Minh City");
-- select * from cities;

-- select * from districts;
insert into districts (district_name, city_id) values ('Ba Dinh', 4);
insert into districts (district_name, city_id) values ('Cau Giay', 4);
insert into districts (district_name, city_id) values ('Dong Da', 4);
insert into districts (district_name, city_id) values ('Hai Ba Trung', 4);
insert into districts (district_name, city_id) values ('Hoan Kiem', 4);
insert into districts (district_name, city_id) values ('Hoang Mai', 4);
insert into districts (district_name, city_id) values ('Tay Ho', 4);
insert into districts (district_name, city_id) values ('District 1', 5);
insert into districts (district_name, city_id) values ('District 2', 5);
insert into districts (district_name, city_id) values ('District 3', 5);
insert into districts (district_name, city_id) values ('District 4', 5);
insert into districts (district_name, city_id) values ('District 7', 5);
insert into districts (district_name, city_id) values ('Ninh Kieu', 1);
insert into districts (district_name, city_id) values ('Cai Rang', 1);
insert into districts (district_name, city_id) values ('Thanh Khe', 2);
insert into districts (district_name, city_id) values ('Hai Chau', 2);
insert into districts (district_name, city_id) values ('Son Tra', 2);
insert into districts (district_name, city_id) values ('Ngu Hanh Son', 2);
insert into districts (district_name, city_id) values ('Kien Thuy', 3);
insert into districts (district_name, city_id) values ('Kien An', 3);
insert into districts (district_name, city_id) values ('An Lao', 3);
insert into districts (district_name, city_id) values ('Ngo Quyen', 3);

-- select * from stations;

insert into stations (station_name, latitude, longtitude, station_address, city_id, district_id) values ("S01-HN", 21.019426669741595, 105.82372927069846, 'Fake address', 4, 1);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S02-HN",21.021476463526863, 105.80128039773463, 'Fake address', 4, 2);
insert into stations (station_name, latitude, longtitude, station_address,city_id, district_id)  values ("S03-HP",20.812440535216766, 106.73926350866886, 'Fake address', 3, 22);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id) values ("S04-CT", 20.857041871959872, 106.74767491563738,  'Fake address',1, 13);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id) values ("S05-HN", 21.03780292085315, 105.85010307074732,  'Fake address',4, 3);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S06-SG",10.779750590331476, 106.60871032118085, 'Fake address', 5, 8);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S07-CT",10.031136954751043, 105.76546448987477,  'Fake address',1, 13);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S08-CT",10.032827322613745, 105.77061433087589,  'Fake address',1, 14);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S09-CT", 10.028094270369138, 105.77198762180953, 'Fake address', 3, 22);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S10-SG", 10.822917316868049, 106.5949774118445,  'Fake address',5, 12);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S11-HP", 20.868061102453677, 106.70539410179578, 'Fake address', 3, 21);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S12-DN", 16.043912981807264, 108.02178494698443, 'Fake address', 2, 15);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S13-DN", 16.154745401973308, 108.03689114725445, 'Fake address', 2, 18);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S14-SG", 10.75698815179588, 106.62915691314801,  'Fake address',5, 9);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S15-SG", 10.759686457776532, 106.58521160327163, 'Fake address', 5, 10);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S16-SG", 10.867598834209524, 106.57971843953707, 'Fake address', 5, 11);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S17-DN", 16.165297639393284, 107.9682266005726,  'Fake address',2, 16);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S18-SG",10.752768239936755, 106.71582701400455,  'Fake address',5, 12);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S19-DN", 16.167935610744017, 107.92428129069623, 'Fake address', 2, 17);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S20-HN",21.03836368655974, 105.84967391733056, 'Fake address', 4, 4);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S21-HN",21.03818344066998, 105.85012452841815, 'Fake address', 4, 5);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S22-HP", 20.858987181484054, 106.66946475852224, 'Fake address', 3, 20);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S23-HN",21.038343659249424, 105.85003869773482, 'Fake address', 4, 7);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S24-SG", 10.781272035810533, 106.62091716754618, 'Fake address', 5, 8);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S25-HP", 20.83176213372339, 106.70830729179092, 'Fake address', 3, 19);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S26-HN",21.034399615447168, 105.8102539901696, 'Fake address', 4, 6);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S27-DN", 16.116488824365, 107.93664090909894, 'Fake address', 2, 15);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S28-SG",10.773177625344973, 106.59345134887346,  'Fake address',5, 12);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S29-HN",21.032086381754468, 105.81231392657004,  'Fake address',4, 1);
insert into stations (station_name, latitude, longtitude,station_address, city_id, district_id)  values ("S30-CT",10.022008815894322, 105.77095765360932, 'Fake address', 1, 1);

-- select * from bikes;
insert into bikes(bike_name, status, station_id) values ('B0', 1, 14);
insert into bikes(bike_name, status, station_id) values ('B1', 0, 29);
insert into bikes(bike_name, status, station_id) values ('B2', 1, 5);
insert into bikes(bike_name, status, station_id) values ('B3', 1, 10);
insert into bikes(bike_name, status, station_id) values ('B4', 0, 17);
insert into bikes(bike_name, status, station_id) values ('B5', 0, 19);
insert into bikes(bike_name, status, station_id) values ('B6', 1, 14);
insert into bikes(bike_name, status, station_id) values ('B7', 1, 4);
insert into bikes(bike_name, status, station_id) values ('B8', 1, 8);
insert into bikes(bike_name, status, station_id) values ('B9', 1, 26);
insert into bikes(bike_name, status, station_id) values ('B10', 1, 17);
insert into bikes(bike_name, status, station_id) values ('B11', 1, 16);
insert into bikes(bike_name, status, station_id) values ('B12', 1, 16);
insert into bikes(bike_name, status, station_id) values ('B13', 0, 9);
insert into bikes(bike_name, status, station_id) values ('B14', 1, 18);
insert into bikes(bike_name, status, station_id) values ('B15', 0, 10);
insert into bikes(bike_name, status, station_id) values ('B16', 1, 5);
insert into bikes(bike_name, status, station_id) values ('B17', 1, 26);
insert into bikes(bike_name, status, station_id) values ('B18', 1, 30);
insert into bikes(bike_name, status, station_id) values ('B19', 1, 7);
insert into bikes(bike_name, status, station_id) values ('B20', 1, 27);
insert into bikes(bike_name, status, station_id) values ('B21', 1, 18);
insert into bikes(bike_name, status, station_id) values ('B22', 0, 23);
insert into bikes(bike_name, status, station_id) values ('B23', 0, 15);
insert into bikes(bike_name, status, station_id) values ('B24', 1, 26);
insert into bikes(bike_name, status, station_id) values ('B25', 1, 6);
insert into bikes(bike_name, status, station_id) values ('B26', 1, 29);
insert into bikes(bike_name, status, station_id) values ('B27', 1, 1);
insert into bikes(bike_name, status, station_id) values ('B28', 1, 8);
insert into bikes(bike_name, status, station_id) values ('B29', 0, 5);
insert into bikes(bike_name, status, station_id) values ('B30', 1, 7);
insert into bikes(bike_name, status, station_id) values ('B31', 1, 15);
insert into bikes(bike_name, status, station_id) values ('B32', 1, 5);
insert into bikes(bike_name, status, station_id) values ('B33', 1, 19);
insert into bikes(bike_name, status, station_id) values ('B34', 1, 5);
insert into bikes(bike_name, status, station_id) values ('B35', 1, 1);
insert into bikes(bike_name, status, station_id) values ('B36', 1, 8);
insert into bikes(bike_name, status, station_id) values ('B37', 1, 22);
insert into bikes(bike_name, status, station_id) values ('B38', 1, 6);
insert into bikes(bike_name, status, station_id) values ('B39', 0, 5);
insert into bikes(bike_name, status, station_id) values ('B40', 0, 26);
insert into bikes(bike_name, status, station_id) values ('B41', 0, 1);
insert into bikes(bike_name, status, station_id) values ('B42', 0, 5);
insert into bikes(bike_name, status, station_id) values ('B43', 1, 25);
insert into bikes(bike_name, status, station_id) values ('B44', 0, 16);
insert into bikes(bike_name, status, station_id) values ('B45', 1, 25);
insert into bikes(bike_name, status, station_id) values ('B46', 0, 27);
insert into bikes(bike_name, status, station_id) values ('B47', 1, 17);
insert into bikes(bike_name, status, station_id) values ('B48', 0, 4);
insert into bikes(bike_name, status, station_id) values ('B49', 0, 9);
insert into bikes(bike_name, status, station_id) values ('B50', 0, 30);

-- select * from customer;
insert into customer (name, address, phone) values ('Carole Peizer', '7596 Hauk Circle', '209-224-3554');
insert into customer (name, address, phone) values ('Shane Moye', '42105 Evergreen Lane', '468-265-1953');
insert into customer (name, address, phone) values ('Ediva Emeny', '9127 Erie Street', '220-208-8854');
insert into customer (name, address, phone) values ('Cheston Heisham', '7003 Blackbird Park', '999-889-5157');
insert into customer (name, address, phone) values ('Troy Meir', '511 Forster Terrace', '484-230-5582');
insert into customer (name, address, phone) values ('Kata Corrado', '0 Twin Pines Center', '232-789-4979');
insert into customer (name, address, phone) values ('Fabio Sancho', '23 Arizona Avenue', '500-775-8101');
insert into customer (name, address, phone) values ('Art Brightling', '36 Sullivan Court', '386-160-8506');
insert into customer (name, address, phone) values ('Kenn Gladebeck', '1 Longview Road', '245-438-9380');
insert into customer (name, address, phone) values ('Muffin Harrowsmith', '74 Dennis Junction', '390-841-1869');
insert into customer (name, address, phone) values ('Jessi Zamboniari', '382 Crownhardt Drive', '914-654-3686');
insert into customer (name, address, phone) values ('Arch Rame', '3 Roxbury Avenue', '594-241-2482');
insert into customer (name, address, phone) values ('Allison Willden', '257 Gina Alley', '755-178-9466');
insert into customer (name, address, phone) values ('Marleen Corter', '58 Burrows Street', '116-464-3857');
insert into customer (name, address, phone) values ('Roselin Lockney', '9 Old Gate Road', '927-965-6163');
insert into customer (name, address, phone) values ('Pryce Lewendon', '7618 Rieder Terrace', '360-310-4262');
insert into customer (name, address, phone) values ('Cari Blant', '9726 Bellgrove Court', '188-440-6117');
insert into customer (name, address, phone) values ('Florian Portchmouth', '6847 Towne Hill', '145-147-5032');
insert into customer (name, address, phone) values ('Pepi Bracey', '5 Moland Trail', '159-751-1186');
insert into customer (name, address, phone) values ('Leland Barfitt', '8416 Anniversary Lane', '670-608-2878');
insert into customer (name, address, phone) values ('Evvie Rosina', '02042 Larry Park', '831-202-6311');
insert into customer (name, address, phone) values ('Isabelle Bingley', '617 Fair Oaks Center', '590-829-8867');
insert into customer (name, address, phone) values ('Lurette Ick', '57 Chive Plaza', '610-902-1762');
insert into customer (name, address, phone) values ('Tadio Landells', '64991 Mcguire Alley', '739-581-2748');
insert into customer (name, address, phone) values ('Shadow Pettifer', '6 East Park', '171-283-6145');
insert into customer (name, address, phone) values ('Silva Iacopo', '0 Melvin Avenue', '343-356-0244');
insert into customer (name, address, phone) values ('Donavon Halloway', '71796 Coleman Place', '612-998-8381');
insert into customer (name, address, phone) values ('Horacio Bathersby', '52 Fallview Court', '417-911-5078');
insert into customer (name, address, phone) values ('Lemar Beiderbecke', '0857 Dottie Pass', '319-486-4627');
insert into customer (name, address, phone) values ('Brandy Denman', '153 Welch Hill', '964-362-3887');

-- select * from card_type;
insert into card_type (card_type) values ('Postpaid');
insert into card_type (card_type) values ('Prepaid');

insert into card(balance, card_ccv,  card_num, id_card_type, id_customer) values (4504817, '123','00112233445', 1, 1);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (5204063,'123', '00112223445', 2, 2);
insert into card(balance,card_ccv,    card_num,id_card_type, id_customer) values (5070358,'123','00112212445',  2, 3);
insert into card(balance, card_ccv,  card_num, id_card_type, id_customer) values (1478840,'123','00112233446',  1, 4);
insert into card(balance,card_ccv,    card_num,id_card_type, id_customer) values (9619473,'123','00112233447',  1, 5);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (3612608, '123','00112233485', 1, 6);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (2249540, '123','00112233495', 2, 7);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (3898614,'123','00112233441',  2, 8);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (5282481,'123','00112233433',  1, 9);
insert into card(balance,card_ccv,    card_num,id_card_type, id_customer) values (3028385,'123','00112233411',  1, 10);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (7120915,'123','00112233422',  2, 11);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (7645424,'123','001122334333',  2, 12);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (7500376,'123','00112233466',  1, 13);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (7078167,'123','00112233477',  2, 14);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (3266486,'123', '00112233885', 1, 15);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (5506107,'123','00112233499',  2, 16);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (1056002,'123', '00112233005', 1, 17);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (8062990,'123', '00112233115', 1, 18);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (1510642,'123', '00112233225', 1, 19);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (5630991,'123','00112233433',  1, 20);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (9902586,'123','001122334456',  1, 21);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (5329771,'123', '00112233121', 2, 22);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (4300566,'123', '00112233666', 1, 23);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (2954333,'123','00112232222',  2, 24);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (1655462,'123','00112233000',  2, 25);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (2865570,'123','001122331111',  2, 26);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (4434283,'123','00112233444',  1, 27);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (4087419,'123', '00112211115', 1, 28);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (8681467,'123', '001122312125', 1, 29);
insert into card(balance, card_ccv,   card_num,id_card_type, id_customer) values (8614523,'123', '00112233000', 1, 30);


desc tbl_order;


insert into tbl_order(payment_status, rend_end_date, rent_start_date, return_status, total_fee, bike_id, card_id) 
values 
(1, '2022-08-15',  '2022-08-18', 1, 200000, 1, 2)
(1, '2022-08-13',  '2022-08-18', 1, 200000, 1, 2)
(1, '2022-08-10',  '2022-08-18', 1, 200000, 1, 2)
