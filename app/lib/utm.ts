/**
 * Agrega parámetros UTM a una URL
 * @param url - La URL base
 * @param params - Parámetros UTM personalizados (opcional)
 * @returns URL con parámetros UTM agregados
 */
export function addUTMParams(
    url: string,
    params?: {
        source?: string;
        medium?: string;
        campaign?: string;
        id?: string;
    }
): string {
    try {
        const urlObj = new URL(url);

        // Parámetros UTM por defecto
        const defaultParams = {
            source: 'website',
            medium: 'card',
            campaign: 'peruanos.dev',
            id: 'peruanos.dev'
        };

        // Combinar parámetros por defecto con los personalizados
        const utmParams = { ...defaultParams, ...params };

        // Agregar parámetros UTM
        urlObj.searchParams.set('utm_source', utmParams.source);
        urlObj.searchParams.set('utm_medium', utmParams.medium);
        urlObj.searchParams.set('utm_campaign', utmParams.campaign);
        urlObj.searchParams.set('utm_id', utmParams.id);

        return urlObj.toString();
    } catch (error) {
        // Si la URL no es válida, retornar la URL original
        console.error('Error al agregar UTM params:', error);
        return url;
    }
}
