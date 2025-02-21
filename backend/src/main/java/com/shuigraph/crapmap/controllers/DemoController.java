package com.shuigraph.crapmap.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/nothingburger")
public class DemoController {

  @GetMapping()
  public String getDemo() {
    return "this is a nothingburger request.";
  }
}
