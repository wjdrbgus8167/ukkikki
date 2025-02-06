package com.dancing_orangutan.ukkikki.geography.ui;

import com.dancing_orangutan.ukkikki.geography.application.GeographyService;
import com.dancing_orangutan.ukkikki.geography.ui.response.FetchContinentsResponse;
import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
