package com.dancing_orangutan.ukkikki.geography.application;

import com.dancing_orangutan.ukkikki.geography.application.query.FetchAirportsQuery;
import com.dancing_orangutan.ukkikki.geography.application.query.FetchCitiesQuery;
import com.dancing_orangutan.ukkikki.geography.application.query.FetchCountriesQuery;
import com.dancing_orangutan.ukkikki.geography.domain.airport.Airport;
import com.dancing_orangutan.ukkikki.geography.domain.city.City;
import com.dancing_orangutan.ukkikki.geography.domain.Country;
import com.dancing_orangutan.ukkikki.geography.infrastructure.GeographyRepository;
import com.dancing_orangutan.ukkikki.geography.mapper.AirportMapper;
import com.dancing_orangutan.ukkikki.geography.mapper.CityMapper;
import com.dancing_orangutan.ukkikki.geography.mapper.ContinentMapper;
import com.dancing_orangutan.ukkikki.geography.mapper.CountryMapper;
import com.dancing_orangutan.ukkikki.geography.ui.response.FetchAirportsResponse;
import com.dancing_orangutan.ukkikki.geography.ui.response.FetchCitiesResponse;
import com.dancing_orangutan.ukkikki.geography.ui.response.FetchContinentsResponse;
import com.dancing_orangutan.ukkikki.geography.ui.response.FetchCountriesResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GeographyService {

    private final GeographyRepository geographyRepository;
    private final ContinentMapper continentMapper;
    private final CountryMapper countryMapper;
    private final CityMapper cityMapper;
    private final AirportMapper airportMapper;

    public List<FetchContinentsResponse> getContinents() {
        return continentMapper.domainsToResponses(geographyRepository.getContinents());
    }

    public List<FetchCountriesResponse> getCountries(FetchCountriesQuery query) {
        Country domain = countryMapper.queryToDomain(query);
        return countryMapper.domainsToResponses(geographyRepository.getCountries(domain));
    }

    public List<FetchCitiesResponse> getCities(FetchCitiesQuery query) {
        City domain = cityMapper.queryToDomain(query);
        return cityMapper.domainsToResponses(geographyRepository.getCities(domain));
    }

    public List<FetchAirportsResponse> getAirports(FetchAirportsQuery query) {
        Airport domain = query.queryToDomain();
        return airportMapper.domainsToResponse(geographyRepository.getAirports(domain));
    }
}
