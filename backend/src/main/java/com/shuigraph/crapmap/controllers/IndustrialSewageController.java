package com.shuigraph.crapmap.controllers;

import com.shuigraph.crapmap.industrialsewage.SewageService;
import com.shuigraph.crapmap.industrialsewage.models.IndustrialSewage;
import com.shuigraph.crapmap.industrialsewage.models.PollutionSeverity;
import com.shuigraph.crapmap.industrialsewage.models.SewageMarker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/")
public class IndustrialSewageController {
  private SewageService sewageService;

  @Autowired
  IndustrialSewageController(SewageService sewageServiceParam) {
    this.sewageService = sewageServiceParam;
  }

  @GetMapping("/data/sewage/all")
  public Iterable<IndustrialSewage> allIndustrialSewage() {
    return sewageService.allIndustrialSewage();
  }

  @GetMapping("/maps/sewage/all")
  public Iterable<SewageMarker> allSewageMarkers() {
    return sewageService.allSewageMarkers();
  }

  @GetMapping("/data/sewage/get/{id}")
  public SewageMarker getSewageMarker(@PathVariable Integer id) {
    return sewageService.getSewageMarker(id);
  }

  @GetMapping("/data/sewage/severity/{id}")
  public PollutionSeverity getSewageSeverity(@PathVariable Integer id) {
    String facilityOwner = sewageService.getFacilityOwner(id);

    return sewageService.getSewageSeverity(facilityOwner);
  }
}
