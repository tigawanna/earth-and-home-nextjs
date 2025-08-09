import {WARDS_GEOJSON} from "./wards_geojson";


// id	"0"
// wardcode	"1001"
// ward	"Sinoko"
// countycode	37
// county	"Kakamega"
// const	"Likuyani"
// constcode	200
// Rownum	"1"
// wardcounty	"Sinoko_Kakamega"

const wards = WARDS_GEOJSON.features.map((feature) => {
    return {
        id: feature.properties.id,
        ward: feature.properties.ward,
        wardCode: feature.properties.wardcode,
        county: feature.properties.county,
        countyCode: feature.properties.countycode,
        constituency: feature.properties.const,
        constituencyCode: feature.properties.constcode,
        coodinates: feature.geometry.coordinates,
    }
})

