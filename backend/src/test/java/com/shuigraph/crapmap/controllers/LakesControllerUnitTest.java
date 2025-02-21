package com.shuigraph.crapmap.controllers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.shuigraph.crapmap.lakes.LakeService;
import com.shuigraph.crapmap.lakes.models.Lakes;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

@WebMvcTest(LakesController.class)
class LakesControllerTest {
  @Autowired private MockMvc mockMvc;

  @MockBean private LakeService lakeService;

  @Test
  void getAllLakes() throws Exception {
    List<Lakes> expectedLakes = new ArrayList<Lakes>();
    when(lakeService.allLakes()).thenReturn(expectedLakes);
    ResultActions response = mockMvc.perform(get("/api/maps/lakes/all"));

    response.andDo(print()).andExpect(status().isOk());
  }
}
