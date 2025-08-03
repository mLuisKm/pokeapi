export async function get(url) {
    const rawResponse = await fetch(url);
    return rawResponse.json();
}