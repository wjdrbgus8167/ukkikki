package com.dancing_orangutan.ukkikki.geography.infrastructure;

import com.dancing_orangutan.ukkikki.geography.domain.ContinentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaContinentRepository extends JpaRepository<ContinentEntity, Integer> {

}
