package com.shuigraph.crapmap.lakes;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.shuigraph.crapmap.lakes.dao.LakesDao;
import com.shuigraph.crapmap.lakes.models.Lakes;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class LakeServiceImplTest {

  @Mock private LakesDao lakesDao;

  @InjectMocks private LakeServiceImpl lakeService;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testAllLakes() {

    List<Lakes> expectedLakes = new ArrayList<>();
    when(lakesDao.findAll()).thenReturn((expectedLakes));

    Iterable<Lakes> result = lakeService.allLakes();

    assertNotNull(result);
    assertEquals(expectedLakes, result);
    verify(lakesDao, times(1)).findAll();
  }
}
