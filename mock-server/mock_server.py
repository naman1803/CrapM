from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
from datetime import date
import json

app = FastAPI()

# API Endpoints to serve the mock data
@app.get("/api/Inland_Lake_Drinking_Water_Quality")
def get_inland_lake_drinking_water_quality():
    with open('mock-data-lakes.json') as f:
        data = json.load(f)
        return JSONResponse(content=data)


@app.get("/api/Industrial_Sewage_By_Site")
def get_industrial_sewage_by_site():
    with open('mock-data-sewage.json') as f:
        data = json.load(f)
        return JSONResponse(content=data)

# Error simulation endpoint (optional for error handling tests)
@app.get("/nominatim/{address}")
def get_address(address: str):
    sections = str.split(address, ",")
    print(f"{address}, {sections[0]}")
    with open('mock-data-nominatim.json') as f:
        data = json.load(f)
        if sections[0] in data:
            return JSONResponse(content=data[sections[0]])
        else:
            raise HTTPException(status_code=500, detail="Mock server error for testing.")


@app.get("/api/error")
def get_error():
    raise HTTPException(status_code=500, detail="Mock server error for testing.")
