package com.shuigraph.crapmap.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(DemoController.class)
class DemoControllerUnitTest {
  @Autowired private MockMvc mockMvc;

  @Test
  void getDemoTest() throws Exception {
    mockMvc
        .perform(get("/api/nothingburger"))
        .andDo(print())
        .andExpect(content().contentType(MediaType.TEXT_PLAIN + ";charset=UTF-8"))
        .andExpect(content().string("this is a nothingburger request."));
  }
}
