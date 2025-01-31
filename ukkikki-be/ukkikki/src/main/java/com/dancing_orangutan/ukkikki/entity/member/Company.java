package com.dancing_orangutan.ukkikki.entity.member;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "companies")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer companyId;

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

    @CreatedDate
    @Column(nullable = false, name = "create_time", updatable = false)
    private LocalDateTime createTime;

    @CreatedDate
    @Column(nullable = false, name = "delete_time", updatable = false)
    private LocalDateTime deleteTime;

    @Column(name = "profile_image_url", nullable = false, length = 2000)
    private String profileImageUrl;

    @Builder
    public Company(String email, String password, String ceoName, String companyName,
                   String businessRegistrationNumber, String phoneNumber, String profileImageUrl) {
        this.email = email;
        this.password = password;
        this.ceoName = ceoName;
        this.companyName = companyName;
        this.businessRegistrationNumber = businessRegistrationNumber;
        this.phoneNumber = phoneNumber;
        this.profileImageUrl = profileImageUrl;
    }
}
