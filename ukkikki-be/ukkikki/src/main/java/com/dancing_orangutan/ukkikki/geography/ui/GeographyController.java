package com.dancing_orangutan.ukkikki.geography.ui;

import com.dancing_orangutan.ukkikki.geography.application.GeographyService;
import com.dancing_orangutan.ukkikki.geography.application.query.FetchCitiesQuery;
import com.dancing_orangutan.ukkikki.geography.application.query.FetchCountriesQuery;
import com.dancing_orangutan.ukkikki.geography.ui.response.FetchCitiesResponse;
import com.dancing_orangutan.ukkikki.geography.ui.response.FetchContinentsResponse;
import com.dancing_orangutan.ukkikki.geography.ui.response.FetchCountriesResponse;
import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/geography")
public class GeographyController {

    private final GeographyService geographyService;

    @GetMapping("/continents")
    public ApiUtils.ApiResponse<List<FetchContinentsResponse>> getContinents() {
        return ApiUtils.success(geographyService.getContinents());
    }

    @GetMapping("/continents/{continentId}/countries")
    public ApiUtils.ApiResponse<List<FetchCountriesResponse>> getCountries(
            @PathVariable(name = "continentId") int continentId
    ) {
        FetchCountriesQuery query = FetchCountriesQuery.builder()
                .continentId(continentId)
                .build();
        return ApiUtils.success(geographyService.getCountries(query));
    }

    @GetMapping("/continents/{continentId}/countries/{countryId}/cities")
    public ApiUtils.ApiResponse<List<FetchCitiesResponse>> getCities(
            @PathVariable(name = "continentId") Integer continentId,
            @PathVariable(name = "countryId") Integer countryId
    ) {
        FetchCitiesQuery query = FetchCitiesQuery.builder()
                .countryId(countryId)
                .continentId(continentId)
                .build();
        return ApiUtils.success(geographyService.getCities(query));
    }
}
