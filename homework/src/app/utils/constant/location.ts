export interface Location {
    place_id: number,
    licence: string,
    osm_type: string,
    osm_id: number,
    boundingbox: Array<string>,
    lat: string,
    lon: string,
    display_name: string,
    class: string,
    type: string,
    importance: number,
    icon: string,
    address: NominatimAddress,
    geojson: GEOJSONType
}

interface NominatimAddress {
    city: string,
    state: string,
    postcode: string,
    country: string,
    country_code: string
}

interface GEOJSONType {
    type: string,
    coordinates: Array<number>
}