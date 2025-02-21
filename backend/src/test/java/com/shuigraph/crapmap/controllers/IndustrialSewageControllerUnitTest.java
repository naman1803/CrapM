package com.shuigraph.crapmap.controllers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shuigraph.crapmap.industrialsewage.SewageService;
import com.shuigraph.crapmap.industrialsewage.models.Contaminants;
import com.shuigraph.crapmap.industrialsewage.models.IndustrialSewage;
import com.shuigraph.crapmap.industrialsewage.models.PollutionSeverity;
import com.shuigraph.crapmap.industrialsewage.models.SeverityRecords;
import com.shuigraph.crapmap.industrialsewage.models.SewageMarker;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

@WebMvcTest(IndustrialSewageController.class)
class IndustrialSewageControllerTest {
  @Autowired private MockMvc mockMvc;

  @MockBean private SewageService sewageService;

  @Autowired private ObjectMapper objectMapper;

  private SewageMarker marker;

  private PollutionSeverity pollutionSeverity;

  @BeforeEach
  public void setup() {
    marker = new SewageMarker();

    marker.setId(1);
    marker.setFacilityOwner("Evil Pollution Company");
    marker.setLatitude(10.9f);
    marker.setLongitude(10.5f);
    marker.setContaminant("Evil Contaminant");

    // Setup for PolltuionServerity

    HashMap<String, Contaminants> newContaminants = new HashMap<>();
    SeverityRecords[] records = new SeverityRecords[2];
    records[0] = new SeverityRecords(0.27f, "Low", "2024-11-06");
    records[1] = new SeverityRecords(0.63f, "Moderate", "2024-11-06");
    newContaminants.put(
        "Super Evil Contaminant", new Contaminants(0.56f, "Moderate", 123.4f, records));
    pollutionSeverity = new PollutionSeverity(1, "Super Evil Pollution Company", newContaminants);
  }

  @Test
  void getAllIndustrialSewageTest() throws Exception {
    List<IndustrialSewage> expectedSewage = new ArrayList<IndustrialSewage>();
    when(sewageService.allIndustrialSewage()).thenReturn(expectedSewage);
    ResultActions response = mockMvc.perform(get("/api/data/sewage/all"));

    response
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(content().string(objectMapper.writeValueAsString(expectedSewage)));
  }

  @Test
  void getAllSewageMarkersTest() throws Exception {
    List<SewageMarker> expectedSewageMarkers = new ArrayList<SewageMarker>();
    when(sewageService.allSewageMarkers()).thenReturn(expectedSewageMarkers);
    ResultActions response = mockMvc.perform(get("/api/maps/sewage/all"));

    response
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(content().string(objectMapper.writeValueAsString(expectedSewageMarkers)));
  }

  @Test
  void getSewageMarkerTest() throws Exception {
    when(sewageService.getSewageMarker(1)).thenReturn(marker);
    ResultActions response = mockMvc.perform(get("/api/data/sewage/get/1"));

    response
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(content().string(objectMapper.writeValueAsString(marker)));
  }

  @Test
  void getSewageSeverityTest() throws Exception {
    when(sewageService.getFacilityOwner(1)).thenReturn("Super Evil Pollution Company");
    when(sewageService.getSewageSeverity("Super Evil Pollution Company"))
        .thenReturn(pollutionSeverity);
    ResultActions response = mockMvc.perform(get("/api/data/sewage/severity/1"));

    String responseContent = response.andReturn().getResponse().getContentAsString();
    System.out.println("Response Content: " + responseContent);

    response
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(content().string(objectMapper.writeValueAsString(pollutionSeverity)));
  }
}
