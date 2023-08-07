export const Api = {
    baseUrl: "/wp-json/api/",
    async GET(url: string, queryParams?: { [key: string]: string }): Promise<Response> {
        const urlParams = queryParams ? `?${new URLSearchParams(queryParams)}` : "";
        return await fetch(`${this.baseUrl}${url}${urlParams}`);
    }
};
