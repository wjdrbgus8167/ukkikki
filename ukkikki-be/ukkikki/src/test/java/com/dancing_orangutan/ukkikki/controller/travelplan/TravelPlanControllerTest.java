package com.dancing_orangutan.ukkikki.controller.travelplan;

import com.dancing_orangutan.ukkikki.dto.travelPlan.request.CreateTravelPlanRequest;
import com.dancing_orangutan.ukkikki.dto.travelPlan.response.CreateTravelPlanResponse;
import com.dancing_orangutan.ukkikki.entity.travelPlan.PlanningStatus;
import com.dancing_orangutan.ukkikki.service.TravelPlanService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(TravelPlanController.class)
class TravelPlanControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockitoBean
	private TravelPlanService travelPlanService;

	@Test
	@DisplayName("POST /travel-plans - 여행 계획 생성 성공")
	void testCreateTravelPlan_Success() throws Exception {
		// Given
		CreateTravelPlanRequest request = CreateTravelPlanRequest.builder()
				.travelPlanRequest(CreateTravelPlanRequest.TravelPlanRequest.builder()
						.departureCityId(1)
						.arrivalCityId(2)
						.name("테스트 여행 계획")
						.startDate(LocalDate.of(2023, 1, 1))
						.endDate(LocalDate.of(2023, 1, 5))
						.keywords(List.of(CreateTravelPlanRequest.KeywordRequest.builder().keywordId(10).build()))
						.minPeople(2)
						.maxPeople(4)
						.planningStatus(PlanningStatus.IN_PROGRESS)
						.build())
				.host(CreateTravelPlanRequest.HostRequest.builder()
						.adultCount(2)
						.childCount(1)
						.infantCount(0)
						.build())
				.build();

		CreateTravelPlanResponse response = CreateTravelPlanResponse.builder()
				.travelPlan(CreateTravelPlanResponse.TravelPlanResponse.builder()
						.travelPlanId(0)
						.name(request.getTravelPlanRequest().getName())
						.arrivalCityId(request.getTravelPlanRequest().getArrivalCityId())
						.departureCityId(request.getTravelPlanRequest().getDepartureCityId())
						.maxPeople(request.getTravelPlanRequest().getMaxPeople())
						.minPeople(request.getTravelPlanRequest().getMinPeople())
						.planningStatus(request.getTravelPlanRequest().getPlanningStatus())
						.startDate(request.getTravelPlanRequest().getStartDate())
						.endDate(request.getTravelPlanRequest().getEndDate())
						.build())
				.build();

		BDDMockito.given(travelPlanService.createTravelPlan(any())).willReturn(response);

		// When & Then
		mockMvc.perform(post("/travel-plans")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.status").value(200))
				.andExpect(jsonPath("$.message").value("Success"))
				.andExpect(jsonPath("$.data.travelPlan.travelPlanId").value(0))
				.andExpect(jsonPath("$.data.travelPlan.name").value(request.getTravelPlanRequest().getName()))
				.andExpect(jsonPath("$.data.travelPlan.arrivalCityId").value(request.getTravelPlanRequest().getArrivalCityId()))
				.andExpect(jsonPath("$.data.travelPlan.departureCityId").value(request.getTravelPlanRequest().getDepartureCityId()))
				.andExpect(jsonPath("$.data.travelPlan.minPeople").value(request.getTravelPlanRequest().getMinPeople()))
				.andExpect(jsonPath("$.data.travelPlan.maxPeople").value(request.getTravelPlanRequest().getMaxPeople()))
				.andExpect(jsonPath("$.data.travelPlan.startDate").value(request.getTravelPlanRequest().getStartDate().toString()))
				.andExpect(jsonPath("$.data.travelPlan.endDate").value(request.getTravelPlanRequest().getEndDate().toString()))
				.andExpect(jsonPath("$.data.travelPlan.planningStatus").value(request.getTravelPlanRequest().getPlanningStatus().toString()))
				.andExpect(jsonPath("$.error").isEmpty());
	}
}
