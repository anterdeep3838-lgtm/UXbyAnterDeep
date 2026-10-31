// app/indian-locations.ts
__maps[157]={};
__defs[157]=function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.popularLocalities = exports.indianLocations = void 0;
exports.searchIndianLocations = searchIndianLocations;
exports.indianLocations = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat"],
    Assam: ["Guwahati", "Dibrugarh", "Silchar"],
    Bihar: ["Patna", "Gaya", "Muzaffarpur"],
    Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur"],
    Goa: ["Panaji", "Margao", "Vasco da Gama"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    Haryana: ["Gurugram", "Faridabad", "Panipat"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan"],
    Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad"],
    Karnataka: ["Bengaluru", "Mysuru", "Mangaluru"],
    Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Manipur: ["Imphal", "Thoubal", "Bishnupur"],
    Meghalaya: ["Shillong", "Tura", "Jowai"],
    Mizoram: ["Aizawl", "Lunglei", "Champhai"],
    Nagaland: ["Kohima", "Dimapur", "Mokokchung"],
    Odisha: ["Bhubaneswar", "Cuttack", "Rourkela"],
    Punjab: ["Ludhiana", "Amritsar", "Jalandhar"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
    Sikkim: ["Gangtok", "Namchi", "Gyalshing"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    Telangana: ["Hyderabad", "Warangal", "Karimnagar"],
    Tripura: ["Agartala", "Udaipur", "Dharmanagar"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
    Uttarakhand: ["Dehradun", "Haridwar", "Haldwani"],
    "West Bengal": ["Kolkata", "Howrah", "Siliguri"],
    "Andaman and Nicobar Islands": ["Sri Vijaya Puram", "Diglipur", "Mayabunder"],
    Chandigarh: ["Chandigarh", "Mani Majra", "Daria"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Silvassa", "Daman", "Diu"],
    Delhi: ["New Delhi", "Dwarka", "Rohini"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag"],
    Ladakh: ["Leh", "Kargil", "Diskit"],
    Lakshadweep: ["Kavaratti", "Agatti", "Minicoy"],
    Puducherry: ["Puducherry", "Karaikal", "Yanam"],
};
/** Popular neighbourhoods so area-level searches (e.g. "Koramangala") work. */
exports.popularLocalities = {
    Bengaluru: ["Indiranagar", "Koramangala", "HSR Layout", "Whitefield", "Jayanagar", "Electronic City", "Malleshwaram", "Hebbal"],
    Mumbai: ["Andheri", "Bandra", "Powai", "Dadar", "Borivali", "Chembur"],
    "New Delhi": ["Saket", "Lajpat Nagar", "Karol Bagh", "Vasant Kunj", "Connaught Place"],
    Gurugram: ["DLF Phase 1", "Sohna Road", "Golf Course Road"],
    Pune: ["Kothrud", "Baner", "Hinjewadi", "Viman Nagar", "Hadapsar"],
    Hyderabad: ["Gachibowli", "Madhapur", "Banjara Hills", "Kondapur", "Kukatpally"],
    Chennai: ["T. Nagar", "Adyar", "Velachery", "Anna Nagar", "OMR"],
    Kolkata: ["Salt Lake", "Park Street", "New Town", "Ballygunge"],
    Ahmedabad: ["Satellite", "Navrangpura", "Bodakdev"],
};
function searchIndianLocations(query) {
    const term = query.trim().toLocaleLowerCase("en-IN");
    if (!term)
        return [];
    return Object.entries(exports.indianLocations)
        .flatMap(([state, cities]) => [state, ...cities.map((city) => `${city}, ${state}`)])
        .concat(Object.entries(exports.popularLocalities).flatMap(([city, areas]) => areas.map((area) => `${area}, ${city}`)))
        .filter((place) => place.toLocaleLowerCase("en-IN").includes(term))
        .sort((a, b) => {
        const rank = (place) => {
            const value = place.toLocaleLowerCase("en-IN");
            return value.split(",")[0] === term ? 0 : value.startsWith(term) ? 1 : 2;
        };
        return rank(a) - rank(b);
    })
        .slice(0, 8);
}

};
