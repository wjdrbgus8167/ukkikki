package com.dancing_orangutan.ukkikki.place.infrastructure;

import com.dancing_orangutan.ukkikki.place.domain.PlaceTagEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceTagRepository extends JpaRepository<PlaceTagEntity, Integer> {
}
