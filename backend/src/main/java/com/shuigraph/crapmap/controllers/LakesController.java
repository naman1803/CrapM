package com.shuigraph.crapmap.controllers;

import com.shuigraph.crapmap.lakes.LakeService;
import com.shuigraph.crapmap.lakes.models.Lakes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/")
public class LakesController {
  private LakeService lakeService;

  @Autowired
  LakesController(LakeService lakeServiceParam) {
    this.lakeService = lakeServiceParam;
  }

  @GetMapping("/maps/lakes/all")
  public Iterable<Lakes> allLakes() {
    return lakeService.allLakes();
  }
}
