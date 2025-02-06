package com.dancing_orangutan.ukkikki.geography.application;

import com.dancing_orangutan.ukkikki.geography.infrastructure.GeographyRepository;
import com.dancing_orangutan.ukkikki.geography.mapper.ContinentMapper;
import com.dancing_orangutan.ukkikki.geography.ui.response.FetchContinentsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GeographyService {

    private final GeographyRepository geographyRepository;
    private final ContinentMapper continentMapper;

    public List<FetchContinentsResponse> getContinents() {
        return continentMapper.domainsToResponses(geographyRepository.getContinents());
    }



}
