package com.dancing_orangutan.ukkikki.place.infrastructure;

import com.dancing_orangutan.ukkikki.place.domain.like.LikeEntity;
import com.dancing_orangutan.ukkikki.place.domain.like.LikeId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaceLikeRepository extends JpaRepository<LikeEntity, LikeId> {
    List<LikeEntity> findByLikeId_PlaceId(Integer placeId);
}
