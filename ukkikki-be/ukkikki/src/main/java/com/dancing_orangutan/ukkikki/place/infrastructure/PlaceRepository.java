package com.dancing_orangutan.ukkikki.place.infrastructure;

import com.dancing_orangutan.ukkikki.place.domain.place.PlaceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository extends JpaRepository<PlaceEntity, Integer> {

}
