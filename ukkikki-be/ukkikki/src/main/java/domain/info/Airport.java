package domain.info;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "airports")
public class Airport {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String airportCode;

	@Column(nullable = false, name = "airport_name", length = 20)
	private String airportName;
}
