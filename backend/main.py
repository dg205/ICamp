from fastapi import FastAPI
#from geopy.geocoders import Nominatim
import json

app = FastAPI()

with open("floorplan.json", "r") as f:
    building_map = json.load(f)

print(json.dumps(building_map, indent=2))


@app.get("/route")
def get_route(start: str, end: str):
    """Returns a path from start to end based on indoor map data"""
    possible_keys = [key for key in building_map["routes"].keys() if end in key]

    if possible_keys:
        route_key = possible_keys[0]  # Assuming first match is the correct one
        route = building_map["routes"].get(route_key, [])
        return {"route": route}
    
    return {"route": []}  # Return an empty route if no path is found  # Return an empty route if no path is found

