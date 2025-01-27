package Entity.member.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "companies")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyId;

    @Column(nullable = false, length = 30)
    private String email;

    @Column(nullable = false, length = 64)
    private String password;

    @Column(nullable = false, name = "ceo_name", length = 20)
    private String ceoName;

    @Column(nullable = false, name = "company_name", length = 30)
    private String companyName;

    @Column(nullable = false, name = "business_registration_number", length = 12)
    private String businessRegistrationNumber;

    @Column(nullable = false, name = "phone_number", length = 11)
    private String phoneNumber;

    @Column(nullable = false, name = "create_time", updatable = false)
    private LocalDateTime createTime;

    @Column(nullable = false, name = "delete_time", updatable = false)
    private LocalDateTime deleteTime;

    @Column(name = "profile_image_url", nullable = false, length = 2000)
    private String profileImageUrl;
}
