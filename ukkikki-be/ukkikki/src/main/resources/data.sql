use ukkikki;

-- 1. 대륙 데이터 삽입
INSERT IGNORE INTO `continents` (`continent_id`, `continent_name`)
VALUES (1, 'Asia'), (2, 'Europe'), (3, 'NAmerica'), (4, 'SAmerica'), (5, 'Africa'), (6, 'Oceania');

-- 2. 국가 데이터 삽입
INSERT IGNORE INTO `countries` (`country_id`, `country_name`, `continent_id`)
VALUES (1, 'South Korea', 1), (2, 'Japan', 1), (3, 'United States', 3), (4, 'France', 2), (5, 'Brazil', 4);

-- 3. 도시 데이터 삽입
INSERT IGNORE INTO `cities` (`city_id`, `city_name`, `country_id`)
VALUES (1, 'Seoul', 1), (2, 'Tokyo', 2), (3, 'New York', 3), (4, 'Paris', 4), (5, 'Rio de Janeiro', 5);

-- 4. 공항 데이터 삽입
INSERT IGNORE INTO `airports` (`airport_code`, `city_id`, `airport_name`)
VALUES ('ICN', 1, '인천국제공항'), ('NRT', 2, '나리타국제공항'), ('JFK', 3, '존.F.케네디 국제공항'),
       ('CDG', 4, '샤를드골 국제공항'), ('GIG', 5, '리우 데 자네루 국제공항');

-- 5. 회원 데이터 삽입
INSERT IGNORE INTO `members` (`member_id`, `email`, `password`, `name`, `profile_image_url`, `create_time`, `provider`)
VALUES (1, 'user1@example.com', 'hashed_password1', 'Alice', 'https://example.com/profiles/alice.jpg', NOW(), 'kakao'),
       (2, 'user2@example.com', 'hashed_password2', 'Bob', 'https://example.com/profiles/bob.jpg', NOW(), 'google'),
       (3, 'user3@example.com', 'hashed_password3', 'Charlie', 'https://example.com/profiles/charlie.jpg', NOW(), '');

-- 6. 여행사(기업) 데이터 삽입
INSERT IGNORE INTO `companies` (`company_id`, `email`, `password`, `ceo_name`, `company_name`, `business_registration_number`, `phone_number`, `create_time`, `delete_time`, `profile_image_url`)
VALUES (1, 'ceo1@company.com', 'hashed_pw1', 'CEO1', 'TravelCo1', '123456789012', '01012345678', NOW(), NOW(), 'https://example.com/company1.jpg'),
       (2, 'ceo2@company.com', 'hashed_pw2', 'CEO2', 'TravelCo2', '234567890123', '01023456789', NOW(), NOW(), 'https://example.com/company2.jpg');

-- 7. 여행 계획 데이터 삽입
INSERT IGNORE INTO `travel_plans` (`travel_plan_id`, `departure_city_id`, `arrival_city_id`, `name`, `start_date`, `end_date`, `close_time`, `create_time`, `min_people`, `max_people`)
VALUES
(1, 1, 2, 'Korea to Japan Trip', '2025-05-01', '2025-05-07', '2025-04-25 23:59:59', NOW(), 2, 10),
(2, 3, 4, 'USA to France Tour', '2025-06-15', '2025-06-30', '2025-06-01 23:59:59', NOW(), 5, 20);

-- 8. 여행 제안 데이터 삽입
INSERT IGNORE INTO `proposals` (`proposal_id`, `company_id`, `travel_plan_id`, `start_date`, `end_date`, `airline`, `departure_airport_code`, `arrival_airport_code`, `start_date_boarding_time`, `start_date_arrival_time`, `end_date_boarding_time`, `end_date_arrival_time`, `deposit`, `min_people`, `guide_included`, `product_introduction`, `refund_policy`, `insurance_included`, `proposal_status`, `create_time`) VALUES
(1, 1, 1, '2025-05-01', '2025-05-07', 'Korean Air', 'ICN', 'NRT', '2025-05-01 09:00:00', '2025-05-01 12:00:00', '2025-05-07 14:00:00', '2025-05-07 17:00:00', 500, 2, 1, 'Exciting trip from Korea to Japan', 'Refund 50% if canceled before 7 days', 1, 'W', NOW()),
(2, 2, 2, '2025-06-15', '2025-06-30', 'Air France', 'JFK', 'CDG', '2025-06-15 13:00:00', '2025-06-15 18:00:00', '2025-06-30 10:00:00', '2025-06-30 15:00:00', 800, 5, 1, 'Luxury travel from the US to France', 'Refund 75% if canceled before 14 days', 1, 'A', NOW());


INSERT IGNORE INTO member_travel_plans (`travel_plan_id`, `member_id`, `host_yn`, `adult_count`, `child_count`, `infant_count`, `first_join_time`, `last_join_time`, `exit_yn`, `exit_time`)
VALUES (1, 1, 1, 2, 0, 0, NOW(), NOW(), 0, NOW());

-- 9. 문의 데이터 삽입
INSERT IGNORE INTO `inquiries` (`inquiry_id`, `proposal_id`, `member_id`, `travel_plan_id`, `title`, `content`,`answer`,`create_time`) VALUES
(1, 1, 1, 1, 'Trip details', 'Can I get vegetarian food options?',NULL, NOW());

-- 10. 비용 데이터 삽입
INSERT IGNORE INTO `costs` (`cost_id`, `proposal_id`, `max_people`, `min_people`, `cost`) VALUES
(1, 1, 10, 2, 1000),
(2, 2, 20, 5, 2500);

INSERT IGNORE INTO vote_surveys (`vote_survey_id`, `travel_plan_id`, `survey_start_time`, `survey_end_time`)
VALUES (1, 1, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY));


-- 11. 투표 데이터 삽입
INSERT IGNORE INTO `votes` (`vote_id`, `vote_survey_id`, `member_id`, `proposal_id`, `vote_time`) VALUES
(1, 1, 1, 1, NOW()),
(2, 1, 2, 2, NOW());

-- 12. 여행자 데이터 삽입
INSERT IGNORE INTO `travelers` (`traveler_id`, `member_id`, `travel_plan_id`, `proposal_id`, `korean_name`, `english_name`, `passport_number`, `expiration_date`, `birth_date`, `phone_number`) VALUES
(1, 1, 1, 1, '김철수', 'Chulsoo Kim', 'P1234567', '2030-12-31', '1990-01-01', '01011112222');

-- 13. 장소 데이터 삽입
INSERT IGNORE INTO `places` (`place_id`, `travel_plan_id`, `name`, `address`, `latitude`, `longitude`) VALUES
(1, 1, 'Tokyo Tower', '4 Chome-2-8 Shibakoen, Minato City, Tokyo', 35.6586, 139.7454),
(2, 2, 'Eiffel Tower', 'Champ de Mars, Paris', 48.8584, 2.2945);

-- 14. 일정 데이터 삽입
INSERT IGNORE INTO `schedules` (`schedule_id`, `proposal_id`, `schedule_name`, `start_time`, `end_time`) VALUES
(1, 1, 'Visit Tokyo Tower', '2025-05-02 10:00:00', '2025-05-02 12:00:00'),
(2, 2, 'Eiffel Tower Tour', '2025-06-16 15:00:00', '2025-06-16 18:00:00');

-- 15. 키워드 데이터 삽입
INSERT IGNORE INTO `keywords` (`keyword_id`, `name`) VALUES
(1, "행복"),
(2, "슬픔");

INSERT IGNORE INTO `travel_plan_keywords` (`keyword_id`,`travel_plan_id`) values
(1,1),
(2,1);
