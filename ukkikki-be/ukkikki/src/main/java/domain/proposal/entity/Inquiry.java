package domain.proposal.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Table(name = "inquiries")
public class Inquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inquiryId;

    @Column(nullable = false, length = 1000)
    private String title;

    @Column(nullable = false, length = 1000)
    private String content;

    @Column(nullable = false, length = 1000)
    private String answer;

    @CreatedDate
    @Column(nullable = false, name = "create_time")
    private LocalDateTime createTIme;

    @Column(name = "completed_time")
    private LocalDateTime completedTIme;
}
