package com.shuigraph.crapmap.lakes;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.shuigraph.crapmap.lakes.dao.LakesDao;
import com.shuigraph.crapmap.lakes.models.Lakes;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class LakesTest {

  @Mock private LakesDao lakesDao;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testLakes() {
    Lakes lake = new Lakes();

    lake.setId(1);
    lake.setLakeName("Testing Lake");
    lake.setLatitude(15.9f);
    lake.setLongitude(164.6f);
    lake.setAdditionalNotes("Testing Notes");

    assertEquals(1, lake.getId());
    assertEquals("Testing Lake", lake.getLakeName());
    assertEquals("Testing Notes", lake.getAdditionalNotes());
    assertEquals(15.9f, lake.getLatitude(), 0.00001f);
    assertEquals(164.6f, lake.getLongitude(), 0.00001f);
  }

  @Test
  void testLakeConstructor() {
    Lakes lake = new Lakes(1, "Testing Lake", 15.9f, 164.6f, "Testing Notes");

    assertEquals(1, lake.getId());
    assertEquals("Testing Lake", lake.getLakeName());
    assertEquals("Testing Notes", lake.getAdditionalNotes());
    assertEquals(15.9f, lake.getLatitude(), 0.00001f);
    assertEquals(164.6f, lake.getLongitude(), 0.00001f);
  }
}
