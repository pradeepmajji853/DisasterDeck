import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "./MapwithShelter.css"

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fixing marker icons issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow
});

const MapWithShelters = () => {
  const [selectedShelter, setSelectedShelter] = useState(null);

  // Hardcoded shelter data for Hyderabad
  const shelters = [
    // Hyderabad Shelters
    { id: 1, name: 'Mother Teresa Home for the Destitute', description: 'A shelter for the homeless and destitute.', capacity: 50, address: 'Banjara Hills, Hyderabad, Telangana 500034', latitude: 17.4117, longitude: 78.4354 },
    { id: 2, name: 'Hyderabad City Shelter Home', description: 'Provides accommodation and food for the needy.', capacity: 80, address: 'Shah Ali Banda, Hyderabad, Telangana 500065', latitude: 17.3783, longitude: 78.4761 },
    { id: 3, name: 'Sri Sai Seva Trust', description: 'Offers shelter and support services for underprivileged.', capacity: 100, address: 'Malkajgiri, Hyderabad, Telangana 500047', latitude: 17.4232, longitude: 78.5400 },
    { id: 4, name: 'Children’s Home Hyderabad', description: 'Shelter for orphaned and abandoned children.', capacity: 40, address: 'Secunderabad, Hyderabad, Telangana 500003', latitude: 17.4434, longitude: 78.4986 },
    { id: 5, name: 'Sadhana Shelter', description: 'Provides temporary shelter for women and children.', capacity: 60, address: 'Kachiguda, Hyderabad, Telangana 500027', latitude: 17.3926, longitude: 78.4853 },
    { id: 6, name: 'Ashray Akruti', description: 'Supports and shelters the homeless and poor.', capacity: 75, address: 'Miyapur, Hyderabad, Telangana 500049', latitude: 17.5136, longitude: 78.3692 },
    { id: 7, name: 'Sahara Old Age Home', description: 'Provides shelter and care for elderly people.', capacity: 50, address: 'Dilsukhnagar, Hyderabad, Telangana 500060', latitude: 17.3804, longitude: 78.5400 },
    { id: 8, name: 'Bharathi Old Age Home', description: 'Shelters and supports elderly individuals.', capacity: 40, address: 'Nallakunta, Hyderabad, Telangana 500044', latitude: 17.4131, longitude: 78.4838 },
    { id: 9, name: 'Karuna Old Age Home', description: 'A home for the elderly in need of care.', capacity: 55, address: 'Kukatpally, Hyderabad, Telangana 500072', latitude: 17.4922, longitude: 78.3876 },
    { id: 10, name: 'Aashraya - Home for Abandoned', description: 'Provides shelter and support for abandoned individuals.', capacity: 65, address: 'Nagole, Hyderabad, Telangana 500068', latitude: 17.3859, longitude: 78.5588 },
    { id: 11, name: 'Home of Hope', description: 'A shelter providing aid and accommodation for families.', capacity: 45, address: 'Madhapur, Hyderabad, Telangana 500081', latitude: 17.4489, longitude: 78.3800 },
    { id: 12, name: 'Gowthami Old Age Home', description: 'A safe haven for the elderly.', capacity: 70, address: 'Lingampally, Hyderabad, Telangana 500019', latitude: 17.4880, longitude: 78.3777 },
    { id: 13, name: 'Happiness Home', description: 'Shelter and care for abandoned children.', capacity: 60, address: 'Boduppal, Hyderabad, Telangana 500092', latitude: 17.3999, longitude: 78.5621 },
    { id: 14, name: 'Santhwanam', description: 'Provides accommodation and support for homeless.', capacity: 80, address: 'Kothapet, Hyderabad, Telangana 500035', latitude: 17.3710, longitude: 78.4830 },
    { id: 15, name: 'Haritha Old Age Home', description: 'Shelters and cares for senior citizens.', capacity: 55, address: 'Attapur, Hyderabad, Telangana 500048', latitude: 17.3690, longitude: 78.4340 },
    { id: 16, name: 'Navajeevan Trust', description: 'Offers temporary shelter and aid for the needy.', capacity: 90, address: 'Ramanthapur, Hyderabad, Telangana 500013', latitude: 17.4067, longitude: 78.5394 },
    { id: 17, name: 'Akshaya Old Age Home', description: 'A sanctuary for elderly individuals.', capacity: 50, address: 'Gachibowli, Hyderabad, Telangana 500032', latitude: 17.4470, longitude: 78.3822 },
    { id: 18, name: 'Horizon Old Age Home', description: 'Provides accommodation and care for seniors.', capacity: 45, address: 'Kompally, Hyderabad, Telangana 500014', latitude: 17.5571, longitude: 78.4855 },
    { id: 19, name: 'Aashraya Old Age Home', description: 'Shelters elderly individuals and offers support.', capacity: 60, address: 'Chandanagar, Hyderabad, Telangana 500050', latitude: 17.4825, longitude: 78.3507 },
    { id: 20, name: 'Anandashram', description: 'Offers shelter and aid for the elderly and abandoned.', capacity: 65, address: 'Kukatpally, Hyderabad, Telangana 500072', latitude: 17.4921, longitude: 78.3702 },

    // Bengaluru Shelters
    { id: 21, name: 'Ashraya Old Age Home', description: 'Provides care and accommodation for the elderly.', capacity: 70, address: 'Whitefield, Bengaluru, Karnataka 560066', latitude: 12.9716, longitude: 77.7499 },
    { id: 22, name: 'Hope Foundation', description: 'Shelter and support for underprivileged families.', capacity: 85, address: 'Koramangala, Bengaluru, Karnataka 560034', latitude: 12.9330, longitude: 77.6101 },
    { id: 23, name: 'Sree Venkateshwara Trust', description: 'Offers temporary accommodation for the needy.', capacity: 90, address: 'Jayanagar, Bengaluru, Karnataka 560041', latitude: 12.9304, longitude: 77.5934 },
    { id: 24, name: 'Children’s Home Bengaluru', description: 'Shelters orphaned and abandoned children.', capacity: 50, address: 'Shivajinagar, Bengaluru, Karnataka 560051', latitude: 12.9757, longitude: 77.6101 },
    { id: 25, name: 'Sadhana Home for Women', description: 'Provides temporary shelter for women.', capacity: 60, address: 'Ulsoor, Bengaluru, Karnataka 560008', latitude: 12.9725, longitude: 77.6372 },
    { id: 26, name: 'Sri Sai Seva Trust', description: 'Supports homeless and impoverished individuals.', capacity: 75, address: 'Hosur Road, Bengaluru, Karnataka 560068', latitude: 12.9294, longitude: 77.6101 },
    { id: 27, name: 'Bharathi Old Age Home', description: 'Shelters elderly people and provides care.', capacity: 45, address: 'Basavanagudi, Bengaluru, Karnataka 560004', latitude: 12.9354, longitude: 77.5733 },
    { id: 28, name: 'Anand Ashram', description: 'Provides accommodation and support for seniors.', capacity: 80, address: 'Banashankari, Bengaluru, Karnataka 560070', latitude: 12.9266, longitude: 77.5700 },
    { id: 29, name: 'Sahara Old Age Home', description: 'Shelters and cares for the elderly.', capacity: 65, address: 'Kalyan Nagar, Bengaluru, Karnataka 560043', latitude: 13.0262, longitude: 77.5918 },
    { id: 30, name: 'Hope Care Home', description: 'Offers support and shelter for the needy.', capacity: 50, address: 'Hebbal, Bengaluru, Karnataka 560024', latitude: 13.0336, longitude: 77.5910 },
    { id: 31, name: 'Aashraya Trust', description: 'Provides shelter and support for abandoned individuals.', capacity: 70, address: 'Banaswadi, Bengaluru, Karnataka 560043', latitude: 13.0161, longitude: 77.6104 },
    { id: 32, name: 'New Horizon Home', description: 'A home for abandoned and destitute people.', capacity: 55, address: 'Rajajinagar, Bengaluru, Karnataka 560010', latitude: 12.9807, longitude: 77.5697 },
    { id: 33, name: 'Sarvoday Home for Women', description: 'Shelters women in need of temporary accommodation.', capacity: 40, address: 'Malleshwaram, Bengaluru, Karnataka 560003', latitude: 13.0059, longitude: 77.5660 },
    { id: 34, name: 'Aaradhya Old Age Home', description: 'Provides care and shelter for senior citizens.', capacity: 50, address: 'Yeshwanthpur, Bengaluru, Karnataka 560022', latitude: 13.0112, longitude: 77.5640 },
    { id: 35, name: 'Children’s Aid Society', description: 'Shelters children in need of care and protection.', capacity: 65, address: 'Wilson Garden, Bengaluru, Karnataka 560027', latitude: 12.9453, longitude: 77.6104 },
    { id: 36, name: 'Manav Seva Trust', description: 'Provides temporary shelter and support services.', capacity: 60, address: 'Bellandur, Bengaluru, Karnataka 560103', latitude: 12.9266, longitude: 77.6370 },
    { id: 37, name: 'Harsha Home for Elderly', description: 'Shelters elderly individuals and provides care.', capacity: 45, address: 'J.P. Nagar, Bengaluru, Karnataka 560078', latitude: 12.9200, longitude: 77.6101 },
    { id: 38, name: 'Shraddha Home for Abandoned', description: 'Offers accommodation for abandoned individuals.', capacity: 55, address: 'Domlur, Bengaluru, Karnataka 560071', latitude: 12.9654, longitude: 77.6372 },
    { id: 39, name: 'Roshini Old Age Home', description: 'Provides care and accommodation for seniors.', capacity: 70, address: 'Gottigere, Bengaluru, Karnataka 560083', latitude: 12.9112, longitude: 77.6094 },
    { id: 40, name: 'Santhwana Home', description: 'A shelter providing support and aid for needy individuals.', capacity: 60, address: 'Yelahanka, Bengaluru, Karnataka 560064', latitude: 13.1031, longitude: 77.5920 }
  ];

  const defaultCenter = [17.3850, 78.4867]; // Default to Hyderabad latitude and longitude

  return (
    <div className="Map-container">
    <MapContainer center={defaultCenter} zoom={10} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {shelters.map((shelter) => (
        <Marker
          key={shelter.id}
          position={[shelter.latitude, shelter.longitude]}
          eventHandlers={{
            click: () => {
              setSelectedShelter(shelter);
            },
          }}
          icon={new L.Icon({
            iconUrl: markerIcon,
            iconRetinaUrl: markerIcon2x,
            shadowUrl: markerShadow,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })}
        >
          {selectedShelter && selectedShelter.id === shelter.id && (
            <Popup>
              <div>
                <h2>{selectedShelter.name}</h2>
                <p>{selectedShelter.description}</p>
                <p>Capacity: {selectedShelter.capacity}</p>
                <p>Address: {selectedShelter.address}</p>
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
};

export default MapWithShelters;
