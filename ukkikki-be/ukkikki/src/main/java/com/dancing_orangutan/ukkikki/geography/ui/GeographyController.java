package com.dancing_orangutan.ukkikki.geography.ui;

import com.dancing_orangutan.ukkikki.geography.application.GeographyService;
import com.dancing_orangutan.ukkikki.geography.application.query.FetchCountriesQuery;
import com.dancing_orangutan.ukkikki.geography.mapper.CountryMapper;
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
    private final CountryMapper countryMapper;

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
}
