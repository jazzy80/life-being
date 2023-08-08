const baseUrl = "/wp-json/api/";
export const Api = {
    async GET(url: string, queryParams?: { [key: string]: string }): Promise<Response> {
        const urlParams = queryParams ? `?${new URLSearchParams(queryParams)}` : "";
        return await fetch(`${baseUrl}${url}${urlParams}`);
    }
};
