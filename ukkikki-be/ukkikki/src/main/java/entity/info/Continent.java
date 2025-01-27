package entity.info;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Table(name = "continents")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Continent {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long continentId;

	@Column(nullable = false, name = "continent_name", length = 10)
	private String continentName;
}
