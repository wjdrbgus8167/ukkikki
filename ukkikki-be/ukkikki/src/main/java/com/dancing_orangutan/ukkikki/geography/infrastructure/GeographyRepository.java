package com.dancing_orangutan.ukkikki.geography.infrastructure;


import com.dancing_orangutan.ukkikki.entity.info.ContinentEntity;
import com.dancing_orangutan.ukkikki.geography.domain.Continent;
import com.dancing_orangutan.ukkikki.geography.mapper.ContinentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class GeographyRepository {

    private final JpaContinentRepository jpaContinentRepository;
    private final ContinentMapper continentMapper;

    public List<Continent> getContinents() {
        List<ContinentEntity> continentEntities = jpaContinentRepository.findAll();

        return continentMapper.entitiesToDomains(continentEntities);
    }


}
