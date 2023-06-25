export const Api = {
  baseUrl: "/wp-json/api/",
  async GET(url: string): Promise<Response> {
    return await fetch(`${this.baseUrl}${url}`);
  }
};
