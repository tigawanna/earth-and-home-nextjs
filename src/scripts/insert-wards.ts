import "dotenv/config";
import { db } from "@/lib/drizzle/client";
import { kenyaWards } from "@/lib/drizzle/schema";
import {
  findWardByPoint,
} from "@/lib/drizzle/ward-queries";



// run().catch((error) => {
//   console.error("Error running script:", error);
//   process.exit(1);
// });

async function query() {
    const nairobiLatLong = {
    latitude: -1.2921,
    longitude: 36.8219,
};

const kiambuLatLong = {
    latitude: -1.1667,
    longitude: 36.8167,
}
  // Find exact ward containing coordinates
//   const ward = await findWardByPoint(-1.2921, 36.8219); // Nairobi
    // const ward = await findWardByPoint(nairobiLatLong.latitude, nairobiLatLong.longitude);
    const ward = await findWardByPoint(kiambuLatLong.latitude, kiambuLatLong.longitude);

  // Smart search (recommended)
//   const smartSearchedWard = await findWardSmart(-1.2921, 36.8219);

//   // Find all wards within 5km
//   const nearbyWards = await findWardsWithinDistance(-1.2921, 36.8219, 5000);
  console.log("Exact Ward:", ward);
//   console.log("Smart Searched Ward:", smartSearchedWard);
//   console.log("Nearby Wards:", nearbyWards);
}

query().catch((error) => {
  console.error("Error querying wards:", error);
  process.exit(1);
});
