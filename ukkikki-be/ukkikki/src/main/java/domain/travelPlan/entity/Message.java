package domain.travelPlan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long messageId;

	@Column(nullable = false, length = 1000)
	private String content;

	@Column(nullable = false, name = "created_at")
	private LocalDate createdAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_travel_plan_id")
	private UserTravelPlan userTravelPlan;
}
