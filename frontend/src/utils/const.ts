export const types_identifications = {
    CEDULA: "CC",
    TARJETA_IDENTIDAD: "TI",
    CEDULA_EXTRANJERA: "CE",
    REGISTRO_CIVIL: "RC"
} as const;

export const TYPE_IDENTIFICATION_OPTIONS = [
    { value: types_identifications.CEDULA, label: 'Cédula Ciudadania'},
    { value: types_identifications.TARJETA_IDENTIDAD, label: 'Tarjeta Identidad'},
    { value: types_identifications.CEDULA_EXTRANJERA, label: 'Cédula Extranjera'},
    { value: types_identifications.REGISTRO_CIVIL, label: 'Registro Civil'}
] as const;

export const types_services = {
    INTERNET_200_MB: "Internet 200 MB",
    INTERNET_400_MB: "Internet 400 MB",
    INTERNET_600_MB: "Internet 600 MB",
    DIRECTV_GO: "Directv Go",
    PARAMOUNT: "Paramount+",
    WIN: "Win+"
} as const;

export const TYPES_SERVICES_OPTIONS = [
    { value: types_services.INTERNET_200_MB, label: types_services.INTERNET_200_MB },
    { value: types_services.INTERNET_400_MB, label: types_services.INTERNET_400_MB },
    { value: types_services.INTERNET_600_MB, label: types_services.INTERNET_600_MB },
    { value: types_services.DIRECTV_GO, label: types_services.DIRECTV_GO },
    { value: types_services.PARAMOUNT, label: types_services.PARAMOUNT },
    { value: types_services.WIN, label: types_services.WIN }
] as const;