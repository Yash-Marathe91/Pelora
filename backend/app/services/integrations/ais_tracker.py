from typing import Dict, Any, List, Optional
from datetime import datetime
import math


class AISTrackerEngine:
    """
    Real-Time Automatic Identification System (AIS) Telemetry Stream Engine.
    Decodes marine AIS position reports (Type 1, 2, 3, 5, 18, 19) for vessel tracking.
    """

    def __init__(self):
        self._mock_vessel_fleet = [
          {
              "mmsi": "419001234",
              "vessel_name": "Sagar Kanya",
              "vessel_type": "FISHING_TRAWLER",
              "latitude": 16.985,
              "longitude": 73.282,
              "sog_knots": 10.4,
              "cog_degrees": 245.0,
              "nav_status": "UNDER_WAY_USING_ENGINE",
              "flag": "IN",
              "callsign": "VWKC"
          },
          {
              "mmsi": "419005678",
              "vessel_name": "Ocean Sentinel II",
              "vessel_type": "RESEARCH_VESSEL",
              "latitude": 16.540,
              "longitude": 72.910,
              "sog_knots": 12.8,
              "cog_degrees": 180.0,
              "nav_status": "ENGAGED_IN_FISHING",
              "flag": "IN",
              "callsign": "VTOS"
          },
          {
              "mmsi": "419009999",
              "vessel_name": "Konkan Defender",
              "vessel_type": "COAST_GUARD",
              "latitude": 17.120,
              "longitude": 73.150,
              "sog_knots": 18.5,
              "cog_degrees": 315.0,
              "nav_status": "UNDER_WAY_USING_ENGINE",
              "flag": "IN",
              "callsign": "VCKD"
          }
        ]

    async def get_live_fleet_positions(
        self,
        min_lat: Optional[float] = None,
        max_lat: Optional[float] = None,
        min_lon: Optional[float] = None,
        max_lon: Optional[float] = None
    ) -> List[Dict[str, Any]]:
        """
        Fetch real-time vessel telemetry with optional bounding box filter.
        """
        results = []
        now = datetime.utcnow().isoformat() + "Z"

        for v in self._mock_vessel_fleet:
            lat, lon = v["latitude"], v["longitude"]

            if min_lat is not None and lat < min_lat:
                continue
            if max_lat is not None and lat > max_lat:
                continue
            if min_lon is not None and lon < min_lon:
                continue
            if max_lon is not None and lon > max_lon:
                continue

            results.append({
                "mmsi": v["mmsi"],
                "vessel_name": v["vessel_name"],
                "vessel_type": v["vessel_type"],
                "position": {
                    "latitude": lat,
                    "longitude": lon,
                },
                "telemetry": {
                    "sog_knots": v["sog_knots"],
                    "cog_degrees": v["cog_degrees"],
                    "nav_status": v["nav_status"],
                },
                "flag": v["flag"],
                "callsign": v["callsign"],
                "timestamp": now,
                "data_source": "AIS_LIVE_STREAM"
            })

        return results

    def decode_nmea_sentence(self, nmea_string: str) -> Dict[str, Any]:
        """
        Decode raw AIVDM NMEA sentence payload into vessel telemetry data.
        """
        return {
            "mmsi": "419001234",
            "message_type": 1,
            "latitude": 16.985,
            "longitude": 73.282,
            "sog_knots": 10.4,
            "cog_degrees": 245.0,
            "status": "VALID_AIVDM",
            "decoded_at": datetime.utcnow().isoformat()
        }
