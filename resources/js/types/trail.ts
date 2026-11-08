export type Region = 'capital' | 'interior' | 'litoral';
export type Difficulty = 'easy' | 'moderate' | 'hard' | 'extreme';
export type ActivityType = 'hiking' | 'trekking' | 'trail-running' | 'mtb';

export interface ElevationPoint {
    distanceKm: number;
    elevationM: number;
    label?: string;
}

export interface Trail {
    id: string;
    slug: string;
    name: string;
    parkName: string;
    region: Region;
    city: string;
    distanceKm: number;
    elevationGainM: number;
    maxAltitudeM: number;
    difficulty: Difficulty;
    activityType?: ActivityType;
    durationHours: number;
    rating: number;
    reviewCount: number;
    coverImage: string;
    galleryImages?: string[];
    shortDescription: string;
    fullDescription: string;
    highlights: string[];
    trailType: 'circular' | 'ida-e-volta' | 'travessia';
    isProtectedArea: boolean;
    requiresGuide: boolean;
    hasWaterPoint: boolean;
    hasWaterfall?: boolean;
    hasSummit?: boolean;
    isPetFriendly?: boolean;
    hasCellphoneSignal: 'none' | 'weak' | 'good';
    entryFee: string;
    openingHours: string;
    trailheadCoordinates: {
        lat: number;
        lng: number;
        address: string;
    };
    elevationProfile: ElevationPoint[];
    essentialGear: string[];
    safetyAlerts: string[];
    wikilocUrl?: string;
}
