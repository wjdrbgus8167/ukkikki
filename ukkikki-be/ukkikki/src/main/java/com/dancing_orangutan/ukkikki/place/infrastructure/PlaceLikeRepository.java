package com.dancing_orangutan.ukkikki.place.infrastructure;

import com.dancing_orangutan.ukkikki.place.domain.LikeEntity;
import com.dancing_orangutan.ukkikki.place.domain.LikeId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceLikeRepository extends JpaRepository<LikeEntity, LikeId> {
}
