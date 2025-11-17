export default class HttpClient {
  constructor(private baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetch(url: string, options: RequestInit) {
    const res = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error(error);
    }

    if (res.status > 299 || res.status < 200) {
      const message =
        data && data.message
          ? data.message
          : `HTTP error! status: ${res.status}`;
      throw new Error(message);
    }
    return data;
  }
}
