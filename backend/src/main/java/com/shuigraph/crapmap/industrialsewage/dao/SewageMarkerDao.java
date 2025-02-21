package com.shuigraph.crapmap.industrialsewage.dao;

import com.shuigraph.crapmap.industrialsewage.models.SewageMarker;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface SewageMarkerDao extends CrudRepository<SewageMarker, Integer> {

  @Query(
      value =
          "SELECT id, facility_owner, CAST(latitude AS FLOAT) as latitude, CAST(longitude AS FLOAT) as longitude, "
              + " GROUP_CONCAT(contaminant) AS contaminant "
              + "FROM industrial_sewage_markers GROUP BY facility_owner",
      nativeQuery = true)
  Iterable<Object[]> getSewageMarkers();

  @Query(
      value =
          "SELECT GROUP_CONCAT(IFNULL(severity_score, '-1.0')) as severity_score "
              + "FROM industrial_sewage_by_site "
              + "WHERE TRIM(facility_owner) =:facilityOwner GROUP BY facility_owner",
      nativeQuery = true)
  String getSeveritySum(@Param("facilityOwner") String facilityOwner);

  @Query(
      value =
          "SELECT MIN(id) as id FROM industrial_sewage_by_site "
              + "WHERE TRIM(facility_owner) = :facilityOwner GROUP BY facility_owner",
      nativeQuery = true)
  Integer getMinId(@Param("facilityOwner") String facilityOwner);
}
