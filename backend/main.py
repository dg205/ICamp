from fastapi import FastAPI
from geopy.geocoders import Nominatim

app = FastAPI()

geolocator = Nominatim(user_agent="campus-safety")

buildings =[
    {"id": 1, "name": "Library", "latitude": 33.7756, "longitude": -84.3963},
    {"id": 2, "name": "Student Center", "latitude": 33.7758, "longitude": -84.3980},
]

alerts=[
    {"id": 1, "latitude": 33.7759, "longitude": -84.3975, "description": "Poor lighting in the area"}
]

@app.get("/buildings")
def get_buildings():
    return buildings

@app.get("/alerts")
def get_alerts():
    return alerts

@app.get("/geocode")
def get_coordinates(address: str):
    location = geolocator.geocode(address)
    if location:
        return {"latitude": location.latitude, "longitude": location.longitude}
    return {"error": "location not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host ="0.0.0.0", port=8000)



