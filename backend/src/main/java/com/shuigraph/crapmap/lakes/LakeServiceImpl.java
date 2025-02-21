package com.shuigraph.crapmap.lakes;

import com.shuigraph.crapmap.lakes.dao.LakesDao;
import com.shuigraph.crapmap.lakes.models.Lakes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LakeServiceImpl implements LakeService {
  private final LakesDao lakesDao;

  @Autowired
  LakeServiceImpl(LakesDao newLakesDao) {
    this.lakesDao = newLakesDao;
  }

  @Override
  public Iterable<Lakes> allLakes() {
    return lakesDao.findAll();
  }
}
