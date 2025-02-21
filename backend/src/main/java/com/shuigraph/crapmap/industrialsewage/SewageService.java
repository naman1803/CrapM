package com.shuigraph.crapmap.industrialsewage;

import com.shuigraph.crapmap.industrialsewage.models.IndustrialSewage;
import com.shuigraph.crapmap.industrialsewage.models.PollutionSeverity;
import com.shuigraph.crapmap.industrialsewage.models.SewageMarker;

public interface SewageService {

  Iterable<IndustrialSewage> allIndustrialSewage();

  Iterable<SewageMarker> allSewageMarkers();

  SewageMarker getSewageMarker(Integer id);

  PollutionSeverity getSewageSeverity(String facilityOwner);

  String getFacilityOwner(Integer id);

  Integer getMinId(String facilityOwner);
}
