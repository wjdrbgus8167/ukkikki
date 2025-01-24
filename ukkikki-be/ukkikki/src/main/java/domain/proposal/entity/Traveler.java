package domain.proposal.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "travelers")
public class Traveler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long travelerId;

    @Column(nullable = false, name = "korean_name", length = 10)
    private String koreanName;

    @Column(nullable = false, name = "english_name", length = 50)
    private String englishName;

    @Column(nullable = false, name = "passport_number", length = 30)
    private String passportNumber;

    @Column(nullable = false, name = "expiration_date")
    private LocalDate expirationDate;

    @Column(nullable = false, name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "phone_number", length = 11)
    private String phoneNumber;
}

