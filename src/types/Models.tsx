export type Launch = {
    auto_update: boolean
    capsules: string[]
    cores: Core[]
    crew: string[]
    date_local: string
    date_precision: string
    date_unix: number
    date_utc: string
    details?: string
    failures: Failure[]
    fairings?: Fairing
    flight_number: number
    id: string
    launchpad: string
    links?: Links
    name: string
    net: boolean
    payloads: string[]
    rocket: string
    ships: string[]
    static_fire_date_unix?: string
    static_fire_date_utc?: string
    success?: string
    tbd: boolean
    upcoming: boolean
    window?: number
}

export type Core = {
    core: string
    flight: number
    gridfins: boolean
    landing_attempt: boolean
    landing_success?: boolean
    landing_type: string
    landpad: string
    legs: boolean
    reused: boolean
}

export type Failure = {
    altitude: number
    reason: string
    time: number
}

export type Fairing = {
    recovered?: boolean
    recovery_attempt?: boolean
    reused?: boolean
    ships: string[]
}

export type Links = {
    article?: string
    flickr?: {
        original?: string[]
        small?: string[]
    }
    patch?: {
        large?: null
        small?: null
    }
    presskit?: string
    reddit?: {
        campaign?: string
        launch?: string
        media?: string
        recovery?: string
    }
    webcast?: string
    wikipedia?: string
    youtube_id?: string
}
